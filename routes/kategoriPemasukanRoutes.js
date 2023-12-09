import { Router } from 'express'
import oracledb from 'oracledb'
const router = Router()

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

router.post('/create-pemasukan-category', async (req, res) => {
    const { u_IDKATPEMASUKAN, u_NAMAKATPEMASUKAN } = req.body;

    if (!u_IDKATPEMASUKAN || !u_NAMAKATPEMASUKAN) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to create pemasukan category
        await connection.execute(
            `BEGIN createPemasukanCategory(:u_IDKATPEMASUKAN, :u_NAMAKATPEMASUKAN); END;`,
            { u_IDKATPEMASUKAN, u_NAMAKATPEMASUKAN }
        );

        res.json({ message: 'Pemasukan category created successfully' });
    } catch (error) {
        console.error('Error creating pemasukan category:', error);
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

router.get('/read-pemasukan-categories', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to read pemasukan categories
        const result = await connection.execute(`BEGIN readPemasukanCategories; END;`);

        // Assuming you want to send the result.rows back in the response
        res.json(result.rows);
    } catch (error) {
        console.error('Error reading pemasukan categories:', error);
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