import { DatasourceConfig } from "../config/datasource.config";

export abstract class Repository {
   
    constructor(protected readonly datasource: DatasourceConfig){}

}
