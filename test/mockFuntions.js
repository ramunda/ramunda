import mockInfo from './mockInfo.json'

export function mockCreateRequestSucess(nock, times = 1) {
    nock('http://localhost:1080/camunda')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/process')
        .times(times)
        .reply(200, mockInfo.responseCreateProcInstanceSucess)
}

export function mockCreateRequestWithError(nock, times = 1) {
    nock('http://localhost:1080/camunda')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/process')
        .times(times)
        .reply(500, mockInfo.responseCreateProcInstanceSucess)
}


export function mockNextRequest(nock, times = 1) {
    nock('http://localhost:1080/camunda')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/process/126dfb88-cbfe-11e9-a2a8-48ba4e8ddf7b/next?advance=true')
        .times(times)
        .reply(200, mockInfo.responseNextWithSucess)
}


export function mocBackRequest(nock, times = 1) {
    nock('http://localhost:1080/camunda')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/process/126dfb88-cbfe-11e9-a2a8-48ba4e8ddf7b/next?advance=false')
        .times(times)
        .reply(200, mockInfo.responseBackWithSucess)
}

export function mockCancelRequest(nock, times = 1) {
    nock('http://localhost:1080/camunda')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/process/126dfb88-cbfe-11e9-a2a8-48ba4e8ddf7b/cancel')
        .times(times)
        .reply(200, mockInfo.responseCancelWithSucess)
}
