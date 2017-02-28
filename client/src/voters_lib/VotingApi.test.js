import { getTalks } from './VotingApi'

const mockResponse = (status, response=null, headers=(new Headers()) ) => {
  return new window.Response(response, {
    status: status,
    headers: headers
  })
}

describe('Get list of talks from GUI Rest endpoint using mock responses from fetch', () => {
  afterEach(() => {
    window.fetch.mockClear()
  })

  it('Reads the schedule successfully from /talks', (done) => {
    window.fetch = jest.fn().mockImplementation(() => {
      const headers = new Headers({'Content-type':'application/json'})
      return Promise.resolve(mockResponse(200, '{ "foo": "bar" }', headers))
    })
  
    getTalks()
      .then((json) => {
        expect(json).toEqual({"foo": "bar"})
        done()
      })
      .catch((err) => {
        done.fail(err)
      })  
  })
  
  it('Reads the schedule and throws an error from /talks', (done) => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(500))
    )
  
    getTalks()
      .then((json) => {
        expect(json).toBeFalsy()
        done()
      })
      .catch((err) => {
        expect(err.message).toEqual('Unable to read workshop talks. Status: 500.')
        done()
      })  
  })
})