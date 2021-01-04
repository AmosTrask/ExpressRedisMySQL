import cors from 'cors';
import express from 'express';
import helmet from "helmet";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { init as initCache, redisClient } from './config/cache';
import { config as dbConfig } from './config/db';
import logger from "./config/logger";
import { AuthGuard } from './middlewares/auth-guards';
import { TokenIssuer } from "./middlewares/token-issuer";
import { SignupRouter } from './routes/signup-route';
import { UserRouter } from "./routes/user-route";


const app = express();

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
    logger.info("App listing on port " + app.get("port") + "in " + app.get("env") + " mode");
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/login", TokenIssuer);
app.use("/signup", SignupRouter);

app.use(AuthGuard);

app.use("/user", UserRouter);

initCache().then(async connection => {
    logger.info("Cache initialized")
})

createConnection(dbConfig).then(async connection => {
    logger.info("Connected to DB");
}).catch(error => console.log(error));

redisClient.SET('bla', 'test');

export default app;