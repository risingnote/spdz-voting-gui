/**
 * Given list of talks as JSON, perform basic validation and transform into data structure
 *  optimised for the GUI display.
 */

import { List, Map } from 'immutable'
import fecha from 'fecha'

import TalkScheduleError from './TalkScheduleError'

/**
 * Recommended way to test to see if object is an array.
 */
const isArray = (objToTest) => {
  return Object.prototype.toString.call(objToTest) === '[object Array]'
}

/**
 * Given a UTC date string, return object with 3 keys:
 *  dateTime
 *  displayDate
 *  displayTime 
 */
const extractDateTime = (dateTimeStr) => {

  let dateObj = {}
  const dateTimeStrFormat = "YYYY-MM-DD HH:mm ZZ"

  const dateTime = fecha.parse(dateTimeStr, dateTimeStrFormat)

  if (!dateTime) {
    throw new TalkScheduleError(`Given a date ${dateTimeStr} which is not in the expected format of ${dateTimeStrFormat}.`)
  }

  dateObj['dateTime'] = dateTime
  dateObj['displayDate'] = fecha.format(dateTime, "dddd Do MMM")
  dateObj['displayTime'] = fecha.format(dateTime, 'HH:mm')

  return dateObj
}

/**
 * Check expected keys, extract display date and time from date. 
 * Add in infoOnly flag if not supplied.
 */
const validateAndConvert = (talk) => {

  ['dateTime', 'id', 'speaker', 'title'].map((expectKey) => {
    if (!talk.hasOwnProperty(expectKey)) {
      throw new TalkScheduleError(`Expecting an entry for key ${expectKey} when checking talk ${JSON.stringify(talk)}.`)
    }
    return expectKey
  })

  let validTalk = Object.assign({}, extractDateTime(talk.dateTime))
  validTalk['id'] = talk.id
  validTalk['speaker'] = talk.speaker
  validTalk['title'] = talk.title
  validTalk['infoOnly'] = talk.hasOwnProperty('infoOnly') ? talk.infoOnly : false

  return validTalk
}

const extractProperties = (talk) => {
  return {
    displayTime: talk.displayTime,
    id: talk.id,
    speaker: talk.speaker,
    title: talk.title,
    infoOnly: talk.infoOnly
  }
}

/**
 * Given list of objects return immutable List of Maps, sorted into date and time order.
 */
const reformatStructure = (talkScheduleData) => {
  talkScheduleData.sort( (a,b) => {
    if (a.dateTime < b.dateTime) {
      return -1
    }
    if (a.dateTime > b.dateTime) {
      return 1
    }
    return 0;
  })

  // Group talks by day
  const groupedData = talkScheduleData.reduce( (talkList, talk) => {
    const latestEntry = talkList.length > 0 ? talkList[talkList.length-1] : null
    if (latestEntry !== null && latestEntry.displayDate === talk.displayDate) {
      //Add talk to this date
      latestEntry.talks.push( extractProperties(talk))
    }
    else { // Add a new day entry
      talkList.push({
        displayDate: talk.displayDate,
        talks: [ extractProperties(talk) ]
      })
    }
    return talkList
  }, [])

  // Convert to immutable data types
  return List(
     groupedData.map( (dayOfTalks) => {
       return Map( {
         displayDate: dayOfTalks.displayDate,
         talks: List(dayOfTalks.talks.map( (talk) => Map(talk) ))
        })
    }))  
}

/**
 * Return an immutable data structure containing:
 *  [ {displayDate: 'Monday 5th',
 *     talks : [ {displayTime: 09:00,
 *                id: 123,
 *                speaker: 'Alice',
 *                title: 'How to be an honest party',
 *                infoOnly: false
 *               },
 *               {displayTime: 10:00,
 *                id: 456,
 *                speaker: 'Coffee',
 *                title: '',
 *                infoOnly: true
 *               }
 *             ]},
 *    {displayDate: 'Tuesday 6th',
 *     talks : [ .....]}
 * ]
 * Throw TalkScheduleError if incorrect format.
 */
const talkScheduleConverter = (jsonData) => {
  if (!isArray(jsonData)) {
    throw new TalkScheduleError(`Expecting an array of talks, got ${JSON.stringify(jsonData)}.`)
  }

  const talkScheduleData = jsonData.map( (talk) => {
    return validateAndConvert(talk)
  })

  return reformatStructure(talkScheduleData)
}

/**
 * Given a list of talk ids get the speaker and title from talkSchedule.
 * 
 * @param {List<String>} talkIds selected talk ids 
 * @param {List<Map>} talkSchedule the talk schedule to search. See talkScheduleConverter.
 * @returns {List<Map>} List of talks with id, speaker and title. 
 */
const extractVotedTalks = (talkIds, talkSchedule) => {
  const votedTalks = talkIds.map( (talkId, index) => {
    let matchedTalk = undefined
    for (let daySchedule of talkSchedule.values()) {
      for (let talk of daySchedule.get('talks').values()) {
        if (talk.get('id') === talkId) {
          matchedTalk = talk
          break
        }
      }
    }
    if (matchedTalk !== undefined) {
      return Map({id: matchedTalk.get('id'), speaker: matchedTalk.get('speaker'), 
                  title: matchedTalk.get('title')})
    }
    else {
      return undefined
    }
  })
  return votedTalks.filter(talk => talk !== undefined)
}

/**
 * Given a list of winning talk ids and votes, enrich the list with speaker and 
 * title from talkSchedule.
 * 
 * @param {Array<{talkId:Number, count:Number}>} vote results
 * @param {List<Map>} talkSchedule the talk schedule to search. See talkScheduleConverter.
 * @returns {List<Map>} array of talks with id, speaker, title, count. 
 */
const resultsEnriched = (results, talkSchedule) => {
  const resultIds = List(results.map( (talk => talk.talkId )))
  const enrichedIds = extractVotedTalks(resultIds, talkSchedule)

  return enrichedIds.map( (talk, index) => {
    return talk.set('count', results[index].count)
  })
}

export { talkScheduleConverter, extractVotedTalks, resultsEnriched }
