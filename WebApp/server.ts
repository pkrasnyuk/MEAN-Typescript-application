import * as http from "http"
    
import BaseConfig from "./core/config/baseConfig"
import ServerCore from "./core/serverCore"

const port = BaseConfig.port;
const server = http.createServer(ServerCore);

server.listen(port, () => {
    console.log(`Web App server listening on port ${port}`);
    console.log("  Press CTRL-C to stop\n");
});