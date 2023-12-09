import { Router } from 'express'
import oracledb from 'oracledb'
const router = Router()

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

router.get('/query1', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const plsqlQuery = `
        DECLARE
          -- Your PL/SQL declarations go here for query 1
        BEGIN
          -- Your PL/SQL logic goes here for query 1
        END;
      `;

        const result = await connection.execute(plsqlQuery);

        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query 1:', error);
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