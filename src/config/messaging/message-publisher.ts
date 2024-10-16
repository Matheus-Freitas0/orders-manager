export interface MessagePublisher {

    publish (message: any, exchange: string, routingKey: string): Promise<boolean>

}