const app = require('..')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to /users', async () => {
        const res = await request.get('/users');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /teams', async () => {
        const res = await request.get('/teams');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })


})


