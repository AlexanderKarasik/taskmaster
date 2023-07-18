const app = require('..')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /users', async () => {
        const res = await request.post('/users').send(    {
            firstName: "Helga",
            lastName: "Schuntz",
            email: "helga@gmail.com",
            age: 28,
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    test('responds to post /teams', async () => {
        const res = await request.post('/teams').send(    {
            firstName: "Helga",
            lastName: "Schuntz",
            email: "emily@gmail.com",
            age: 28,
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    
})