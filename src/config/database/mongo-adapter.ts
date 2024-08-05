import { Datasource } from './datasource'

export class MongoAdapter implements Datasource {

    async query (statement: string, ...params: any): Promise<any> {
        
    }

}