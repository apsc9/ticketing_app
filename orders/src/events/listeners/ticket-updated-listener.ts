import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent, TicketCreatedEvent } from "@apsc_/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject =  Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findByEvent(data);

        if(!ticket) {
            throw new Error('Ticket Not Found');
        }

        const { title, price } = data ;
        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    }
}