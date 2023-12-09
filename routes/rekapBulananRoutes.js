import { Router } from 'express'
import oracledb from 'oracledb'
const router = Router()

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

// Execute addRekapBulananForAllUsers procedure
router.post('/execute-rekap-bulanan', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to execute addRekapBulananForAllUsers
        await connection.execute(`BEGIN addRekapBulananForAllUsers; END;`);

        res.json({ message: 'addRekapBulananForAllUsers executed successfully' });
    } catch (error) {
        console.error('Error executing addRekapBulananForAllUsers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Error closing connection:', error);
            }
        }
    }
});

export default router;