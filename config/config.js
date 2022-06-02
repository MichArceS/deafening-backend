module.exports = {
  "development": {
    "username": "postgres",
    "password": 'admin',
    "database": 'deafening_db',
    "host": "localhost",
    "dialect": "postgres",
    "port":"5432",
    "timezone": '-05:00'
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
