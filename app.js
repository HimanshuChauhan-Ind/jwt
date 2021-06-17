// Setting up environment variables
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// Setting up express and mongoose
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRoutes = require('./routes/user')
const userInfoRoute = require('./routes/userInfo')

// Settingup DB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB not Connected");
    console.log(err);
  });

// Setting up templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Calling the user routes
app.use(userRoutes)
app.use(userInfoRoute)


app.listen(3000,()=>{
    console.log('Starting the server on port 3000')
})