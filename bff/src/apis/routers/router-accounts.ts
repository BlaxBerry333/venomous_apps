import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  getAccountList,
  getSpecifAccount,
  updateAccount,
} from "../handlers/accounts";

const accountsRouter = Router();

// Redirect
accountsRouter.get("/", (_, res) => res.status(302).redirect("/accounts/list"));

// GET /accounts/list
accountsRouter.get("/list", getAccountList);
// GET /accounts/[id]
accountsRouter.get("/:id", getSpecifAccount);
// POST /accounts/create
accountsRouter.get("/list", createAccount);
// PUT /accounts/[id]
accountsRouter.get("/:id", updateAccount);
// DELETE /accounts/[id]
accountsRouter.get("/:id", deleteAccount);

export default accountsRouter;
