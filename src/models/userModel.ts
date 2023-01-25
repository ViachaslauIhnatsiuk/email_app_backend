import { Schema, model } from 'mongoose';

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
          id: {
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
  const foundUser = await this.findOne({ name });

  if (!foundUser) {
    const user = await this.create({
      name,
      messages: [],
    });
    return user;
  } else {
    return foundUser;
  }
};

module.exports = model('User', userSchema);
