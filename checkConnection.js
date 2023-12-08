import { getConnection } from 'oracledb';
// hr schema password
const password = 'jacky';

let connection;
// checkConnection asycn function
async function checkConnection() {
    try {
        connection = await getConnection({
            user: "jackyjacky",
            password: password,
            connectString: "localhost:1521/xepdb1"
        });
        console.log('connected to database');
    } catch (err) {
        console.error(err.message);
    } finally {
        if (connection) {
            try {
                // Always close connections
                await connection.close();
                console.log('close connection success');
            } catch (err) {
                console.error(err.message);
            }
        }
    }
}

checkConnection()