const express = require("express");
const app = express();
const path = require("path");
const port = 3005;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // هذا مهم لقبول JSON من body

app.set("view engine", "ejs");
app.use(express.static("public"));


var methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use("/addProf", require("./routes/addUser"));


const allRoutes = require("./routes/allRoutes");
const addUserRoute = require("./routes/addUser");
const addUserRoutee = require("./routes/addUserRoutee");

const Prof = require('./models/customerSchema'); // تأكد من مسار الموديل الصحيح

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const fileRoutes = require("./routes/fileRoutes");
app.use("/", fileRoutes);



// ----------------------------------------
const uploadRoute = require("./routes/uploadRoute");
app.use(express.urlencoded({ extended: true }));


app.use("/upload", express.static("upload"));


app.use("/", uploadRoute);



const pdfRoute = require("./routes/pdfRoute"); // اسم الملف
app.use("/", pdfRoute);


const checkProfRoute = require("./routes/checkProfRoute");
app.use("/", checkProfRoute);


 

// ---------------------------------------------------



const viewPdfRoute = require("./routes/viewPdfRoute");
app.use("/", viewPdfRoute);

app.get("/pdf/:id", async (req, res) => {
  // ...
});





// Auto refresh


mongoose
  .connect(
    // "mongodb://principia480:principia480123@ac-vboffrf-shard-00-00.9rnjzv2.mongodb.net:27017,ac-vboffrf-shard-00-01.9rnjzv2.mongodb.net:27017,ac-vboffrf-shard-00-02.9rnjzv2.mongodb.net:27017/?replicaSet=atlas-149led-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=walid-moh"
  'mongodb://hakker58293:school123@ac-2ym0qvm-shard-00-00.28rnauf.mongodb.net:27017,ac-2ym0qvm-shard-00-01.28rnauf.mongodb.net:27017,ac-2ym0qvm-shard-00-02.28rnauf.mongodb.net:27017/?replicaSet=atlas-jjsoqj-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=school'  
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(allRoutes);
app.use( "/user/add.html",addUserRoute);

app.use("/user/addEtud", addUserRoutee);


