import express from "express";
import dotenv from "dotenv";
import database from "./src/config/config.js";
import customerRoute from "./src/routes/customer.routes.js";
import errorHandler from "./src/middleware/error.handler.js";
import serviceRoute from "./src/routes/service.routes.js";
dotenv.config()
const port = process.env.PORT ?? 3000
const app = express()
app.use(express.json())
app.use("/api", customerRoute);
app.use("/api/services", serviceRoute);
app.use(errorHandler);



database()

app.listen(port, () => {
    console.log(`This port is running on port ${port}`)
})