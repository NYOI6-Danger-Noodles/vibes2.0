const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
console.log(`Hello ${process.env}`);

const MONGO_URI = `mongodb+srv://${process.env.MDBLOGIN}:${process.env.MDBPWD}@cluster0.jpkjx8d.mongodb.net/?retryWrites=true&w=majority`;

//contains a User collection

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'scratch',
  })
  .then(() => console.log('Connected to Scratch DB!'))
  .catch((err) => console.log(err));

const locationSchema = new Schema({
  locationID: { type: String },
  score: { type: Number },
  tags: [{ type: String }],
});

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  beenList: [locationSchema],
  savedList: [{ type: String }],
  friendList: [{ type: String }],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
