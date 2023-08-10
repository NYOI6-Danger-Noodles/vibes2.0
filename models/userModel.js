const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
require('dotenv').config();
console.log(`Hello ${process.env}`);

const MONGO_URI = `mongodb+srv://${process.env.MDBLOGIN}:${process.env.MDBPWD}${process.env.LINK}`;

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

const ratedlocationSchema = new Schema({
  neighborhood: { type: String, required: true },
  address: { type: String, requried: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  photo: { type: String, required: true },
  tags: [{ type: String }],
});

const savedlocationSchema = new Schema({
  neighborhood: { type: String, required: true },
  address: { type: String, requried: true },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  category: { type: String, required: true },
});

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  beenList: [ratedlocationSchema],
  savedList: [savedlocationSchema],
  friendList: [{ type: String }],
  hashed: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.hashed) {
    this.hashed = true;
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 60 * 60 * 24 * 7, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = { User, Session };
