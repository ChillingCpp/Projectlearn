import http from "node:http"
import {routes} from "./routes/routes.js"

const server = http.createServer(async (req, res) =>
{
    await routes(req, res);
});
server.listen(3000, '127.0.0.1', () => {
    console.log("server has created");
});
/// http://localhost:3000
