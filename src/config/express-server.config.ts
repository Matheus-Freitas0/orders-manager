import bodyParser from "body-parser"
import {Express} from "express-serve-static-core"
import  express from "express"

export class ExpressServerConfig{
    private app : Express
    private readonly PORT = 3000
    constructor(){
        this.app = express()
    }
basicConfig(): ExpressServerConfig {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: false}))
    return this
}
routesRegistry(): ExpressServerConfig {
    this.app.get('/api/product', (request ,response) =>{
        console.log("rota esta ativa");
        return response.status(200).json({message: "api está funcionando corretamente"})
    })
    return this
}
startServer(): void {
    this.app.listen(this.PORT, () =>{
        console.log(`Server is running on port ${this.PORT}`)
        })
}
}

