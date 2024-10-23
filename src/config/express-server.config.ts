import bodyParser from "body-parser"
import {Express} from "express-serve-static-core"
import  express from "express"
import { RoutesRegistryConfig } from "./routes-registry.config"
import environment from "./environments/environments"
import path from "path"

export class ExpressServerConfig{
    private app : Express
    private routesRegistryConfig: RoutesRegistryConfig
    constructor(){
        this.app = express()
        this.routesRegistryConfig = new RoutesRegistryConfig(this.app)
    }

    basicConfig(): ExpressServerConfig {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: false}))
    return this
    }

    routesRegistry(): ExpressServerConfig{   
        this.app.use(function(req,res, next){
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "*")
            next()
        })
    
        this.routesRegistryConfig.register()

    return this
    }

    startServer(): void {
        this.app.listen(environment.SERVER_PORT, () => {
            console.log(`server is connected on port: ${environment.SERVER_PORT}`)
            console.log(`application environment: ${process.env.APP_ENV}`)
            console.log(`database host: ${environment.DB_HOST}`)                      
        })
    }

}

