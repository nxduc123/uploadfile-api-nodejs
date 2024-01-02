const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
var basicAuth = require("basic-auth");

var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    res.sendStatus(401);
  }
  if (user.name === "test" && user.pass === "123456") {
    next();
  } else {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    res.sendStatus(401);
  }
};

let routes = (app) => {
  router.post("/upload", auth, controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.delete("/files/:name", controller.remove);

  app.use(router);
};

module.exports = routes;
