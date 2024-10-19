import { Publisher, OrderCancelledEvent, Subjects } from "@apsc_/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject =  Subjects.OrderCancelled;
}