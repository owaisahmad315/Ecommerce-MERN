
const cookieParser = require("cookie-parser");
const cors = require("cors");


const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth/auth-routes')

//create a database connection -> u can also
//create a separate file for this and then import/use that file here



mongoose.connect('mongodb+srv://owaisahmad014:Mymern%40321@cluster0.qybw4.mongodb.net/')
.then(() => console.log('Mongo Database Connected'))
.catch((error) => console.log('Connection error:', error));

const app = express()

const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );    

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter)

  app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
