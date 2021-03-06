import { List, Map } from 'immutable'
import { talkScheduleConverter, extractVotedTalks, resultsEnriched } from './TalkSchedule'
import fecha from 'fecha'

const myjson = 
[
    {
      "dateTime": "2017-04-01 09:00 +0100",
      "id": "1", 
      "speaker": "Alice", 
      "title": "Not a talk"
    },
    {
      "dateTime": "2017-04-02 09:00 +0100",
      "id": "3", 
      "speaker": "Start time", 
      "title": "",
      "infoOnly": "true"
    },
    {
      "dateTime": "2017-04-01 10:00 +0100",
      "id": "2", 
      "speaker": "Bob", 
      "title": "Not another talk"
    }
]

const reformatted = List([
  Map({
    "displayDate": "Saturday 1st Apr",
    "talks": List([
      Map({
        "displayTime": "09:00",
        "id": "1",
        "speaker": "Alice",
        "title": "Not a talk",        
        "infoOnly": false
      }),
      Map({
        "displayTime": "10:00",
        "id": "2",
        "speaker": "Bob",
        "title": "Not another talk",
        "infoOnly": false
      })
    ])
  }),
  Map({
    "displayDate": "Sunday 2nd Apr",
    "talks": List([
      Map({
        "displayTime": "09:00",
        "id": "3",
        "speaker": "Start time",
        "title": "",        
        "infoOnly": "true"
      })
    ])
  })
])


describe('Parse the schedule of talks into a usable data structure for the GUI', () => {
  test('I can successfully parse a representative schedule', () => {
    let converted
    try {
      converted = talkScheduleConverter(myjson)
    }
    catch(error) {
      expect(error.message).toBeNull()
    }
    expect(converted.size).toEqual(2)
    expect(converted).toEqual(reformatted)
  })

  test('Given an empty json structure, I get an error', () => {
    try {
      const converted = talkScheduleConverter({})
      expect(converted).toBeNull()
    }
    catch(error) {
      expect(error.message).toEqual('Expecting an array of talks, got {}.')
    }
  })

  test('Given a json structure missing the id, I get an error', () => {
    try {
      const testData = [{
        "dateTime": "2017-04-01 09:00 +0000",
        "speaker": "Alice", 
        "title": "Not a talk"
      }]

      const converted = talkScheduleConverter(testData)
      expect(converted).toBeNull()
    }
    catch(error) {
      expect(error.message).toEqual(
        'Expecting an entry for key id when checking talk {"dateTime":"2017-04-01 09:00 +0000","speaker":"Alice","title":"Not a talk"}.')
    }
  })

  test('Given a json structure with incorrect date format, I get an error', () => {
    try {
      const testData = [{
        "dateTime": "2017-04-01 +0000",
        "speaker": "Alice", 
        "id": "12345",
        "title": "Not a talk"
      }]

      const converted = talkScheduleConverter(testData)
      expect(converted).toBeNull()
    }
    catch(error) {
      expect(error.message).toEqual(
        'Given a date 2017-04-01 +0000 which is not in the expected format of YYYY-MM-DD HH:mm ZZ.')
    }
  })
})

describe('Given a list of voter ids I can extract the matching talks', () => {
  test('I can successfully read for 3 talks', () => {
    const result = extractVotedTalks( List(['1','2','3']), reformatted )
    expect(result.size).toEqual(3)
    expect(result.get(0)).toEqual(Map({"id": "1", "speaker": "Alice", "title": "Not a talk"}))
  })

  test('I can successfully read for 1 talk', () => {
    const result = extractVotedTalks( List(['3']), reformatted )
    expect(result.size).toEqual(1)
    expect(result.get(0)).toEqual(Map({"id": "3", "speaker": "Start time", "title": ""}))
  })  

  test('It will gracefully fail if an invalid talk id is passed in', () => {
    const result = extractVotedTalks( List(['45', '2']), reformatted )
    expect(result.size).toEqual(1)
    expect(result.get(0)).toEqual(Map({"id": "2", "speaker": "Bob", "title": "Not another talk"})) 
  })    
})

describe('Given a list of results I can enrich with the matching talks', () => {
  test('I can successfully enrich the talks', () => {
    const voteResults = [{talkId: '2', count: '57'}, {talkId: '1', count: '34'}]
    const expectedEnrichedResults = List([
      Map({"id": "2", "speaker": "Bob", "title": "Not another talk", "count": "57"}),
      Map({"id": "1", "speaker": "Alice", "title": "Not a talk", "count": "34"})      
    ])

    const result = resultsEnriched( voteResults, reformatted )
    expect(result.size).toEqual(2)
    expect(result).toEqual(expectedEnrichedResults)
  })
})
 