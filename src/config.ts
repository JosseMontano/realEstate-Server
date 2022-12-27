const {config } = require("dotenv")

config();
module.exports = {
    methodDb1:{
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
    },
    methodDbTwo:{
        databaseUrl:process.env.DATABASE_URL,
    },
    jwtEnv:{
        secret:process.env.JWT_SECRET
    },
    urlCors:{
        secret:process.env.CORS,
        img360:process.env.CORSIMG360,
    },
    server:{
        port:process.env.PORT
    },
    emailer:{
        user:process.env.USER,
        pass:process.env.PASS
    }
}