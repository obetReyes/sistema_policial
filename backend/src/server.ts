import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {Server, createServer, routes, seed} from "./server.utils";
import { locationGateway } from "./sockets";
import * as Sentry from "@sentry/node";

export const app = express();
export const server = createServer(app);
app.set("trust proxy", 1);
export const io = new Server(server, {
  cors:{
    origin: process.env.HOST,
    credentials:true
  }
});



Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here


// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler

const port = process.env.PORT || 3000;
app.use(helmet());
app.disable("x-powered-by");
app.use(
  cors({
    credentials: true,
    origin:  process.env.HOST,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));


function main(){
  server.listen(port);
  routes(app);
  locationGateway({io});
  
    seed();
   

}
main();

process.on("uncaughtException", function (err: Error) {
  console.log(err);
});
process.on("unhandledRejection", (err: Error) => {
  console.log(err);
});

