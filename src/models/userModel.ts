import { Schema, model } from 'mongoose';
const User = require('../models/userModel');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    messages: {
      type: [
        {
          user: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.statics.signin = async function (name: string) {
  const user = await this.findOne({ name });

  if (!user) {
    const user = await this.create({
      name,
    });
    return user;
  } else {
    return user;
  }
};

module.exports = model('User', userSchema);
