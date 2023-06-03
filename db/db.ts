import mysql from 'mysql2/promise';

// create the connection
const db = mysql.createPool({
  host: '134.17.27.116',
  port: 6033,
  user: 'i-ven',
  password: 'KAFok488s_uuo99',
  database: 'rozn',
});

export default db;
