import { Container } from './config/container.config';
import { ExpressServerConfig } from "./config/express-server.config";

const container = Container.getInstance()
container.register()

const expressServer = new ExpressServerConfig()
expressServer
.basicConfig()
.routesRegistry()
.startServer()

