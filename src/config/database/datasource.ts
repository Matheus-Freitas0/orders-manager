export interface Datasource {

    close (): Promise<void>
    query (statement:string, ...params:any): Promise <any> 
    
}