import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routerUser from "./routers/user.route.js";
import routerTask from "./routers/task.route.js";
import routerAuth from "./routers/auth.route.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config(
    {
        path: ['.env.local', '.env']
    }
);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

//router user n task
app.use("/api/auth", routerAuth);
app.use("/api/user", routerUser);
app.use("/api/task", routerTask);

const swaggerOpt = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "Task Management API",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["./src/routers/*.route.ts"],
}

const swaggerDocs = swaggerJsDoc(swaggerOpt);
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});

