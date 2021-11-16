// config environment variables
export default {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'production',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10, // for bcript algo (higher no. means slower hashing)
  jwtAccessTokenSecret:
    process.env.JWS_ACCESS_TOKEN_SECRET ||
    '52978994711833bded5f2895be809f117ed169f19d5244d0d9904c97d428e22b',
  jwtRefreshTokenSecret:
    process.env.JWS_ACCESS_TOKEN_SECRET ||
    '077e384e3dd6b6bff8399bf1d771037f66efc6d76c4b29acc57e2ec5ba97ffa9',
};
