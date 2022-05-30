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
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
