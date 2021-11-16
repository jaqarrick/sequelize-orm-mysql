module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'jack',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'hello_mysql',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USERNAME || 'jack',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'hello_mysql',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME || 'jack',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'hello_mysql',
    dialect: 'mysql',
  },
};
