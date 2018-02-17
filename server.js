const next = require("next");
const express = require("express");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.NODE_ENV == "production" ? 80 : 3000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.get("*", (req, res) => {
    handle(req, res);
  });

  if (require.main === module) {
    app.listen(PORT)
  }
});
