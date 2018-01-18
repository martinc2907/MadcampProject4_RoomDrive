import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Files = new Schema ({
  filename: String,
  filetype: String,
  path: String,
  //mimetype: String,
  //size: { type: Date, default: Date.now },
  //btoafile: String,
  username: String,
  roomnumber: Number,
  leftpos: Number,
  toppos: Number
});

export default mongoose.model('file', Files);
