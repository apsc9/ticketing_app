import request from 'supertest';
import { app } from '../../app';

it('fails when a email that doesnt exist is given', async() => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when an incorrect password is supplie', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'djfbkfedlknbk'
        })
        .expect(400);
});

it('returns a cookie when valid credentials are provided', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});