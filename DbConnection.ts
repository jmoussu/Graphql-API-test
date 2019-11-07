import { Pool } from 'pg';

const pool = new Pool({
	user: 'postgres',
	host: '127.0.0.1',
	database: 'postgres',
	password: 'admin123',
	port: 5432,
  })


pool.query('SELECT NOW()', (err, res) => {
if (err) {
	console.log('error can\'t connect to Posgres DB Please verify your infomation on file DbConnection.ts');
	return;
}
console.log("New Connection !");
console.log(res.rows[0]);
});

export default pool;
