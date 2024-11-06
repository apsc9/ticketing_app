import { Subjects, Publisher, PaymentCreatedEvent } from "@apsc_/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}
