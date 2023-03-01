
import {Server} from "./Core/Server";
import {AuthMiddleWare} from "./Middleware/AuthMiddleware";
import {Auth} from "./Routes/API/Auth";
import {JsonMiddleware} from "./Middleware/JsonMiddleware";

const app = new Server();
app.start(3000)

app.route(new Auth());
app.middleware(new JsonMiddleware());

// const app = express();
// accountsRoutes(app);
// mainRoutes(app);
// app.listen("3000");
