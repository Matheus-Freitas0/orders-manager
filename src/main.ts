import { Container } from './config/container.config';
import { ExpressServerConfig } from "./config/express-server.config";
import dotenv from 'dotenv'

dotenv.config()

const container = Container.getInstance()
container.register()

const expressServer = new ExpressServerConfig()
expressServer
.basicConfig()
.routesRegistry()
.startServer()

