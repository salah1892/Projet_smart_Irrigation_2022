const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors=require("cors");
//const mongoose = require("mongoose")
const Schema = require('./models/schema');
//app.use("/api")

//******************************************* */
// require database connection 
const dbConnect = require("./db/dbConnect");
// execute database connection 
dbConnect();
// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
//----------------------------get Method----------------------------------------//
app.get("/", cors(),async(request, response, next) => {
  //response.json({ message: "Hey! This is your server response!" });
  response.send("this is working");
  next();
});
//----------------------------getAll Method----------------------------------------//
// app.get('/getAll', async function (req, res) {
//   const allSensors = await Schema.find({});
//   try {

//     res.status(200).json(allSensors);
//     res.send("Data returned via GetAll Request");
//   }

//   catch (error) {
//     throw res.status(500).json({ message: error.message });
//   }

// });
//------------------------------Post Method---------------------------------------//
app.post('/post', async (req, res, next) => {
  //res.send('Post API')
  const data = new Schema({
    sensors: {
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      moisture: req.body.moisture,
      light: req.body.light,
      Heure: req.body.Heure,
      date: new Date()
    }

  })

  try {
    //console.log("try"+data);
    const dataToSave = await data.save();
    //console.log(dataToSave);
    res.status(200).json(dataToSave)
  }
  catch (error) {
    //console.log("catch"+data);
    res.status(400).json({ Error_message: error.message })
  }
  next();
})
//---------------------------------Get all Method---------------------------------//
//
app.get('/getAll',cors(), async (req, res,next) => {
  //res.send('Get All API')
  try {
    const data = await Schema.find({});
    //res.status(200).json(data)
    res.send(data);
    //res.send("Data returned via GetAll Request");
    //console.log(data);
  }
  catch (error) {
    throw res.status(500).json({ message: error.message });
  }
  next();
})
//-----------------------------Get by ID Method-------------------------------------//
app.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Schema.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
  next();
})
//--------------------------------Update by ID Method----------------------------------//

app.patch('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Schema.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
  next();
})
//-----------------------------Delete by ID Method-------------------------------------//
app.delete('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Schema.findByIdAndDelete(id)
    res.send(`Document with ${data.id} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
  next();
})
//------------------------------For POST ONLY !! ------------------------------------//
app.post("/new", async (req, res) => {
  const { temperature, humidity, moisture,
    light, Heure, date } = req.body;
  console.log(temperature + " " + humidity)
  //adds doc to db
  try {
    const savePost = await Schema.create({ temperature, humidity, moisture, light, Heure, date });
    res.status(200).json(savePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//----------------------------------------------------------------------//
app.post("/newOne", async (req, res) => {
  const schema = new Schema();
  //adds doc to db   
  try {
    const savePost = await schema.save();
    res.status(200).send(savePost);
  } catch (error) {
    res.status(400).send(error);
  }
});
//----------------------------------------------------------------------//
app.post('/p', (req, res) => {

  const schema = new Schema(req.body);
  schema.save().then((schema) => {
    res.status(201).send(schema);
  }).catch((error) => {
    res.status(400).send(error);
  })

})
//------------------------------------------------------------------//
app.post("/insert", (req, res) => {
  //const schema = new Schema();
  Schema.collection.insertOne({
    sensors: {
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      moisture: req.body.moisture,
      light: req.body.light,
      Heure: new Date().toLocaleTimeString(),
      date: new Date()
    }
  },
    (err, result) => {
      if (err) {

        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      //console.log(req.body.Heure +" "+req.body.date);
      res.status(200).json({ ok: true })
    }
  )
})
module.exports = app;