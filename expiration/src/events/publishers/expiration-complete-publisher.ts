import { Subjects, Publisher, ExpirationCompleteEvent } from "@apsc_/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;

}