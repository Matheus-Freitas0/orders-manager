export interface MessagePublisher {

    publish (message: any, queue: string, options: any): Promise<boolean>

}