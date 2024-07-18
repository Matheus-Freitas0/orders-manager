import { ExpressServerConfig } from "./config/express-server.config";

const expressServer = new ExpressServerConfig()

expressServer
.basicConfig()
.routesRegistry()
.startServer()

