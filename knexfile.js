// Update with your config settings.
const mysql = require('mysql');


var localSQLConnection = {
  host: 'aws-hackathon-db.cjdmtmc8kuwg.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'rUDJfSkFAU9N9WXRHMDd',
  database: 'root',
};

// Production database connection
const SQLConnection = localSQLConnection;

module.exports = {
  development: {
    client: 'mysql',
    connection: SQLConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knlex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'root',
      user:     'admin',
      password: 'rUDJfSkFAU9N9WXRHMDd'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'root',
      user:     'admin',
      password: 'rUDJfSkFAU9N9WXRHMDd`'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  localSQLConnection
};
