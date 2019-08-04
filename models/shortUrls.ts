import { model, Schema } from 'mongoose';

const shortUrlSchema = new Schema(
  {
    longUrl: {
      type: String,
      required: true
    },
    shortUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('shortUrl', shortUrlSchema);
