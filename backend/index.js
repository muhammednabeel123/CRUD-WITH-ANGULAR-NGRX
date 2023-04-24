const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const multer = require('multer');
const routes = require('./routes/routes')
const path = require('path')

app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}))
app.use(cookieParser())

app.use(express.json())
app.use("/api",routes)
app.use(express.static(path.join(__dirname,"uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original filename
  }
});

const upload = multer({ storage });

mongoose.connect("mongodb://127.0.0.1:27017/AngulerNFT", {
    useNewUrlParser:true,
}).then(() => {
  console.log("connected to database");
  app.listen(5000, () => {
    console.log("app is listening to the port 5000");
  });
}).catch(err => {
  console.error("error connecting to database", err);
});

