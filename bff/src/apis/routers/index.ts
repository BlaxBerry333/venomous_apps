import { Router } from "express";

import { ERROR_MESSAGES_TYPE } from "../../utils/constants";
import accountsRouter from "./router-accounts";
import otherRouter from "./router-others";

const mainRouter = Router();

// Redirect
mainRouter.get("/", (_, res) => res.status(302).redirect("/others/"));

// SubRouter Others
mainRouter.use(`/others`, otherRouter);

// SubRouter Accounts
mainRouter.use(`/accounts`, accountsRouter);

// 404 notfound
mainRouter.all("*", (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: `${ERROR_MESSAGES_TYPE.NOT_FOUND} ${req.method} ${req.path}`,
    },
  });
});

export default mainRouter;
