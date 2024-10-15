import { Publisher, Subjects, TicketUpdatedEvent } from '@apsc_/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}