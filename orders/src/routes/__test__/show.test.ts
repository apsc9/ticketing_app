import mongoose from 'mongoose';
import request from 'supertest';
import { Ticket } from '../../models/ticket';
import { app } from '../../app';

it('fetches a user\'s order', async () => {
    // make a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 30
    })
    await ticket.save();

    const user = global.signin();
    // make a request to build an order with this ticket
    const {body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);


    // make a request to fetch the order
    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
});


it('returns an error if one user tries to access another user\'s orders', async () => {
    // make a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 30
    })
    await ticket.save();

    const user = global.signin();
    // make a request to build an order with this ticket
    const {body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);


    // make a request to fetch the order
    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);

});