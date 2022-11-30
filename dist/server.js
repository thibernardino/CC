"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dotenv = _interopRequireWildcard(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _orderRouter = _interopRequireDefault(require("./routers/orderRouter"));
var _productRouter = _interopRequireDefault(require("./routers/productRouter"));
var _uploadRouter = _interopRequireDefault(require("./routers/uploadRouter"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-unused-vars */

_dotenv.default.config();
_mongoose.default.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to db!");
}).catch(err => {
  console.log(err.message);
});
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use("/api/uploads", _uploadRouter.default);
app.use("/api/users", _userRouter.default);
app.use("/api/products", _productRouter.default);
app.use("/api/orders", _orderRouter.default);

// Original code
//  app.get("/api/paypal/clientId", (req, res) => {
//    res.send({ clientId: config.PAYPAL_CLIENT_ID });
//  });

// new code
// app.get("/api/paypal/clientId", (req, res) => {
//  console.log(process.env.PAYPAL_CLIENT_ID);
// });

app.get("/api/paypal/clientId", (req, res) => {
  console.log(process.env.PAYPAL_CLIENT_ID);
});
app.use("/uploads", _express.default.static(_path.default.join(__dirname, "/../uploads")));
app.use(_express.default.static(_path.default.join(__dirname, "/../frontend")));
app.get("*", (req, res) => {
  res.sendFile(_path.default.join(__dirname, "/../frontend/index.html"));
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({
    message: err.message
  });
});
app.listen(5070, () => {
  console.log("serve at http://localhost:5070");
});