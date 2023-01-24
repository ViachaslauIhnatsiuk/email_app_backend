import { Router } from 'express';
import { getUsers, getUser, updateUser } from '../controllers/userController';

const usersRoutes = Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/:id', getUser);

usersRoutes.patch('/:id', updateUser);

export { usersRoutes };
