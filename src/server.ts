import {Server} from "./Core/Server";
import {JsonMiddleware, TextMiddleware, UrlEncodedMiddleware} from "./Middleware";
import {AuthRoute, FileRoute, CategoryRoute, ProductRoute, OrderRoute} from "./Routes/API";
import {UserRoute} from "./Routes/API";

const app = new Server();

app.start(3000)
app.middleware(new JsonMiddleware());
app.middleware(new TextMiddleware());
app.middleware(new UrlEncodedMiddleware());
// app.middleware(new CorsMiddleware());
app.route(new AuthRoute());
app.route(new FileRoute());
app.route(new CategoryRoute());
app.route(new ProductRoute());
app.route(new UserRoute());
app.route(new OrderRoute());