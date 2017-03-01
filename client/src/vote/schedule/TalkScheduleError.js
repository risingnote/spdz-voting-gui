// Error to represent incorrectly supplied TalkSchedule data.
function TalkScheduleError(message) {
  this.name = 'TalkScheduleError'
  this.message = message || 'No specific message supplied.'
  this.stack = (new Error()).stack
}
TalkScheduleError.prototype = Object.create(Error.prototype)
TalkScheduleError.prototype.constructor = TalkScheduleError

export default TalkScheduleError