import { Inject } from '../config/container.config'
import { Datasource } from '../config/database/datasource'

export abstract class Repository {

    @Inject('mysql')
    protected readonly datasource!: Datasource

}