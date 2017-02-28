/**
 * A testing sample of the talk JSON to be served to the GUI 
 *  and how is should look when converted for display.
 */
import { List, Map } from 'immutable'

const talks = [
    {
      "dateTime": "2017-04-03 14:00 +0100",
      "id": 101, 
      "speaker": "Benny Pinkas", 
      "title": "Recent advances in private set intersection"
    },
    {
      "dateTime": "2017-04-03 15:00 +0100",
      "id": 102, 
      "speaker": "Roberto Trifiletti", 
      "title": "Implementing LEGO"
    },      
    {
      "dateTime": "2017-04-03 16:00 +0100",
      "id": 103, 
      "speaker": "Coffee", 
      "title": "",
      "infoOnly": "true"
    },
    {
      "dateTime": "2017-04-04 09:00 +0100",
      "id": 201, 
      "speaker": "Yuval Ishai", 
      "title": "Secure Computation via Homomorphic Secret Sharing - I"
    }  
]

const talksForDisplay = List([
  Map({
    "displayDate": "Monday 3rd Apr",
    "talks": List([
      Map({ "displayTime": "14:00", "id": 101, "infoOnly": false, "speaker": "Benny Pinkas", "title": "Recent advances in private set intersection" }),
      Map({ "displayTime": "15:00", "id": 102, "infoOnly": false, "speaker": "Roberto Trifiletti", "title": "Implementing LEGO" }),
      Map({ "displayTime": "16:00", "id": 103, "infoOnly": "true", "speaker": "Coffee", "title": "" })
    ])
  }),
  Map({
    "displayDate": "Tuesday 4th Apr",
    "talks": List([
      Map({ "displayTime": "09:00", "id": 201, "infoOnly": false, "speaker": "Yuval Ishai", "title": "Secure Computation via Homomorphic Secret Sharing - I" })
    ])
  })
])

export { talks, talksForDisplay }
