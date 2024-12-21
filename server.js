const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const connectDB = require("./mongoDB/connectDB");
const blogRoutes = require("./routes/blogRoutes");
const mailController = require("./routes/mailRoutes");
const cookieParser = require("cookie-parser");
const paymentRoute = require("./routes/paymentRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6553;

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static(__dirname));
app.use(bodyParser.json());

// server

// Cert

const key = fs.readFileSync("cert.key");
const cert = fs.readFileSync("cert.crt");

// const expressServer = https.createServer({ key, cert }, app);

// const io = socket(expressServer, {
//   cors: {
//     origin: [
//       "https://localhost",
//       "https://Phone", // for mobile
//     ],
//     methods: ["GET", "POST"],
//   },
// });

// Routes
app.get("/", (req, res) => {
  res.send({ message: "Youngest CEO" });
});

// blog routes
app.use("/api/blog", blogRoutes);
app.use("/api/mail", mailController);
app.use("/api/payment", paymentRoute);

//  MongoDB Connecton
connectDB();

app.listen(PORT, () => {
  console.log(`Server is live at port: ${PORT}`);
});

/*
------------------ /api/blog/

/get-posts
/get-single-post/:contentId
/create-posts
/update
/delete/:contentId
/make-payments

----------------------------/
*/
