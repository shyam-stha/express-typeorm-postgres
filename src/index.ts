import * as express from "express"
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { AppDataSource } from "./data-source"
import userRouter from "./route/User.route";

AppDataSource.initialize().then(async () => {
}).catch(error => console.log(error))

const app = express();

app.use(express.json())
app.use("/api/v1/user", userRouter)
app.use("/", (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
})

app.listen(3008, () => {
    console.log("server running on port: 3008")
})