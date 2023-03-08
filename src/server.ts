import {Server} from "./Core/Server";
import {JsonMiddleware, TextMiddleware, UrlEncodedMiddleware,ValidateCategory} from "./Middleware";
import {Auth, File,Category,Product} from "./Routes/API";

const app = new Server();

app.start(3000)
app.middleware(new JsonMiddleware());
app.middleware(new TextMiddleware());
app.middleware(new UrlEncodedMiddleware());
app.route(new Auth());
app.route(new File());
app.route(new Category());
app.route(new Product());
