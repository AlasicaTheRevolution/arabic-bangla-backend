// alasicatherevolution
// xlntZNuGv2PqMNIX

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vbwbv4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();
    //collections
    const categoriesCollection = client
      .db("arabic-bangla")
      .collection("categories");

    //apis
    //get all categories
    app.get("/categories", async (req, res) => {
      const categories = await categoriesCollection.find({}).toArray();
      res.send(categories);
    });
    //get nahu
    app.get("/category/:id", async (req, res) => {
      const category = await categoriesCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(category);
    });

    console.log("Connected to Database");
  } finally {
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Arabic-Bangla");
});
app.listen(port, () => console.log(`Listening on port ${port}`));
