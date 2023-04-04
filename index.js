const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qs1yz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.qs1yz.mongodb.net:27017,cluster0-shard-00-01.qs1yz.mongodb.net:27017,cluster0-shard-00-02.qs1yz.mongodb.net:27017/?ssl=true&replicaSet=atlas-6yqhwu-shard-0&authSource=admin&retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("services"));
app.use(fileUpload());

const port = 5000;

app.get("/", (req, res) => {
  res.send("hello from db it's working working");
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client
  .connect()
  .then((res) => {
    {
      const servicesCollection = client.db("creativeAgency").collection("services");
      const usersCollection = client.db("creativeAgency").collection("users");
      const adminsCollection = client.db("creativeAgency").collection("admins");
      const reviewsCollection = client.db("creativeAgency").collection("reviews");

      app.post("/addService", (req, res) => {
        const file = req.files.file;
        const serviceTitle = req.body.serviceTitle;
        const serviceDescription = req.body.serviceDescription;
        console.log(file, serviceTitle, serviceDescription);

        const newImg = file.data;
        const encImg = newImg.toString("base64");

        var image = {
          contentType: file.mimetype,
          size: file.size,
          img: Buffer.from(encImg, "base64"),
        };

        servicesCollection.insertOne({ serviceTitle, serviceDescription, image }).then((result) => {
          res.send(result.insertedCount > 0);
        });
      });

      app.get("/services", (req, res) => {
        servicesCollection.find({}).toArray((err, documents) => {
          res.send(documents);
        });
      });

      app.post("/addOrder", (req, res) => {
        const file = req.files.file;
        const name = req.body.name;
        const email = req.body.email;
        const serviceName = req.body.serviceName;
        const projectDetails = req.body.projectDetails;
        const price = req.body.price;
        const status = req.body.status;

        console.log(file, name, email, serviceName, projectDetails, price, status);

        const newImg = file.data;
        const encImg = newImg.toString("base64");

        var image = {
          contentType: file.mimetype,
          size: file.size,
          img: Buffer.from(encImg, "base64"),
        };

        usersCollection.insertOne({ name, email, serviceName, projectDetails, price, status, image }).then((result) => {
          res.send(result.insertedCount > 0);
        });
      });

      app.get("/oneService", (req, res) => {
        console.log(req.query.serviceTitle);
        servicesCollection.find({ serviceTitle: req.query.serviceTitle }).toArray((err, documents) => {
          res.send(documents);
        });
      });

      app.get("/serviceInfo", (req, res) => {
        servicesCollection.find({ serviceTitle: req.query.serviceTitle }).toArray((err, documents) => {
          res.send(documents);
        });
      });

      app.get("/personalService", (req, res) => {
        usersCollection.find({ email: req.query.email }).toArray((err, documents) => {
          res.send(documents);
        });
      });

      app.post("/addReview", (req, res) => {
        const newReview = req.body;
        reviewsCollection.insertOne(newReview).then((result) => {
          res.send(result.insertedCount > 0);
        });
      });

      app.get("/reviews", (req, res) => {
        reviewsCollection
          .find({})
          .limit(5)
          .toArray((err, documents) => {
            res.send(documents);
          });
      });

      app.post("/addAdmin", (req, res) => {
        const newAdmin = req.body;
        adminsCollection.insertOne(newAdmin).then((result) => {
          res.send(result.insertedCount > 0);
        });
      });

      app.get("/allUsers", (req, res) => {
        usersCollection.find({}).toArray((err, documents) => {
          res.send(documents);
        });
      });

      app.post("/isAdmin", (req, res) => {
        const email = req.body.email;
        adminsCollection.find({ email: email }).toArray((err, admins) => {
          res.send(admins.length > 0);
        });
      });

      app.patch("/updateStatus/:id", (req, res) => {
        usersCollection
          .updateOne(
            { _id: ObjectId(req.params.id) },
            {
              $set: { status: req.body.status },
            }
          )
          .then((result) => {
            res.send(result.modifiedCount > 0);
          });
      });
    }
  })
  .catch((err) => console.log("There is Errooor", err));

app.listen(process.env.PORT || port);
