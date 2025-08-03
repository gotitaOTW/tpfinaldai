import dotenv from 'dotenv';

const config={
    user:'postgres',
    host:'localhost',
    database:'tp',
    password:process.env.contrasenaBD,
    port:'localhost'
};
export default config;