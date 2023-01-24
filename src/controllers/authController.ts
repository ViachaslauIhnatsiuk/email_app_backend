const User = require('../models/userModel');
import { Response, Request } from 'express';

const signIn = async (request: Request, response: Response) => {
  const { name } = request.body;

  try {
    const user = await User.signin(name);

    response.status(200).json({ name, id: user._id });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export { signIn };
