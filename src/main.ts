import { Container } from './config/container.config'
import { ExpressServerConfig } from "./config/express-server.config"
import { QueueMessagesRegistry } from './config/queue-messages.registry'

const container = Container.getInstance()
container.register()

new QueueMessagesRegistry()
    .register()

const expressServer = new ExpressServerConfig()
expressServer
    .basicConfig()
    .configEjsEngine()
    .routesRegistry()
    .startServer()

