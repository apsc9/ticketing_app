import request from 'supertest';
import { app } from '../../app';
import { Password } from '../../services/password';

it('returns a 201 if signup is successful', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tcom',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tcom',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'tcom',
        })
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'p'
        })
        .expect(400);
});

it('disallows duplicate mails', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(400);
});

it('sets a cookie after successful signup', async() => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);
        
    expect(response.get('Set-Cookie')).toBeDefined();
});
