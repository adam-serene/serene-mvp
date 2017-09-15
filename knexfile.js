module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/serenegreendb'
  },

  production: {
		client: 'pg',
		connection: process.env.DATABASE_URL
  }
}
