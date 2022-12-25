import { Express } from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";

const options = {
  target: "https://open-api.myhelsinki.fi",
  changeOrigin: true,
};

const apiProxy: RequestHandler = createProxyMiddleware(options);

module.exports = function (app: Express) {
  app.use("/v2/places/", apiProxy);
};

