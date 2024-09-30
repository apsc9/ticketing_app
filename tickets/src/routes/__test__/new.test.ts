import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requests', async() => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can be accessed only when the user is signed in', async() => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
});

it('if a user is signed in, return a status other than 401', async() => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})
        
        expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided ', async() => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);

});

it('returns an error if an invalid price is provided', async() => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'abcde',
            price: -10
        })
        .expect(400);
        
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asdf'
        })
        .expect(400);
});

it('creates the ticket with a valid input', async() => {

});