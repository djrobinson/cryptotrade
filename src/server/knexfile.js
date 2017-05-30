module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/cryptotrade'
  },
  production: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : 'exchanges_dev'
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
  }
};
