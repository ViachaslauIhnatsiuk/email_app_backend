const User = require('../models/userModel');
import { Types } from 'mongoose';
import { Response, Request } from 'express';

const getUsers = async (request: Request, response: Response) => {
  const users = await User.find({});

  response.status(200).json(users);
};

const getUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: 'No such user' });
  }

  const user = await User.findById(id);

  if (!user) {
    return response.status(404).json({ error: 'No such user' });
  }

  response.status(200).json(user);
};

const updateUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: 'No such user' });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );

  if (!user) {
    return response.status(404).json({ error: 'No such user' });
  }

  response.status(200).json(user);
};

export { getUsers, getUser, updateUser };
