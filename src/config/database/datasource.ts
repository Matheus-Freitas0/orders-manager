export interface Datasource {

    query (statement:string, ...params:any): Promise <any> 
    
}