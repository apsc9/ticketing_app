import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 for the ticket id that doesnt exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'From zero, seoul',
            price: 100,
        })
        .expect(404);
});

it('returns a 401 in case a user isnt authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'From zero, seoul',
            price: 100,
        })
        .expect(401);
});

it('returns a 401 if the user doesnt own the ticket', async() => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'From zero, NY',
            price: 150
        })
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'From zero, Manhattan',
            price: 130
        })
        .expect(401);
});

it('returns 400 if invalid title or price is provided by the user', async() => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'From zero, NZ',
            price: 150
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 100,
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'From Zero, Brooklyn',
            price: -10,
        })
        .expect(400);
        
});

it('updates the ticket if all the inputs are valid', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'From zero, Seattle',
            price: 150
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'The music of spheres, Rio',
            price: 200,
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('The music of spheres, Rio');
    expect(ticketResponse.body.price).toEqual(200);

});