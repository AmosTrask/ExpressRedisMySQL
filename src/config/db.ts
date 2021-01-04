const config:any = {
    "type": "mysql",
    "host": process.env.MYSQL_URL,
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "dashrd2",
    "synchronize": true,
    "logging": false,
    "entities": [
       "dist/entities/**/*.js"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }

export { config };