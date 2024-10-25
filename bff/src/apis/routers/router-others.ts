import { Router } from "express";
import { getOtherHello } from "../handlers/others";

const otherRouter = Router();

// Redirect
otherRouter.get("/", (_, res) => res.status(302).redirect("/others/hello"));

// GET /others/hello
otherRouter.get("/hello", getOtherHello);

export default otherRouter;
