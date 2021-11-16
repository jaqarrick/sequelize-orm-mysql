import { Router } from 'express';
import models, { registerModels } from '../../models';
import asyncWrapper from '../../utils/async-wrapper';
import JWTUtils from '../../utils/jwt-utils';

const registerRouter = new Router();
const { User } = models;

registerRouter.post(
  '/register',
  asyncWrapper(async (req, res) => {
      console.log('test')
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(200).send({
        success: false,
        message: 'User already exists',
      });
    }

    const payload = { email };
    const accessToken = JWTUtils.generateAccessToken(payload);
    const refreshToken = JWTUtils.generateRefreshToken(payload);

    await User.createNewUser({
      ...req.body,
      refreshToken,
    });

    return res.status(200).send({
      success: true,
      message: 'User successfully registered!',
      data: {
        refreshToken,
        accessToken,
      },
    });
  })
);

export default registerRouter;
