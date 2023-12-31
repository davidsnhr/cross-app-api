import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  console.log('llamando user');
  const users = await User.findAll();

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: `The user with ${id} id doesnt exist`,
    });
  }

  res.json(user);
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {

    const existEmail = await User.findOne({
      where: {
        email: body.email
      }
    })

    if(existEmail) {
      return res.status(400).json({
        msg: 'The user already exist '  + body.email
      })
    }


    const user = await User.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      status: body.status,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Somenthing goes wrong',
    });
  }
};

export const putUser = async(req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if(!user) {
      return res.status(404).json({
        msg:'The user doesnt exist with id ' + id
      })
    }

    await user.update(body)

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Somenthing goes wrong',
    });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'putUser',
    id,
  });
};
