import { Router } from 'express';
import models from '../../models';
import JWTUtils from '../../utils/jwt-utils';
import requiresAuth from '../../middlewares/requireAuth';
import asyncWrapper from '../../utils/async-wrapper';

const tokenRouter = Router();
const { User, RefreshToken } = models;

tokenRouter.post(
  '/token',
  requiresAuth('refreshToken'),
  asyncWrapper(async (req, res) => {
    const {
      jwt: { email },
    } = req.body;
    const user = await User.findOne({
      where: { email },
      include: RefreshToken,
    });
    const savedToken = user.RefreshToken;

    if (!savedToken || !savedToken.token) {
      return res
        .status(401)
        .send({ success: false, message: 'You must log in first' });
    }

    const payload = { email };
    const newAccessToken = JWTUtils.generateAccessToken(payload);

    return res
      .status(200)
      .send({ success: true, data: { accessToken: newAccessToken } });
  })
);

export default tokenRouter;
