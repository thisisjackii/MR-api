import { Router } from 'express'
import oracledb from 'oracledb'
const router = Router()

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

router.post('/create-pemasukan', async (req, res) => {
    const { p_IDUSER, p_IDKATPEMASUKAN, p_NOMINAL, p_METODEPEMBAYARAN, p_TANGGAL, p_DESKRIPSI } = req.body;

    if (!p_IDUSER || !p_IDKATPEMASUKAN || !p_NOMINAL || !p_METODEPEMBAYARAN || !p_TANGGAL || !p_DESKRIPSI) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to create pemasukan
        await connection.execute(
            `BEGIN CREATE_PEMASUKAN_FROM_INPUT(:p_IDUSER, :p_IDKATPEMASUKAN, :p_NOMINAL, :p_METODEPEMBAYARAN, :p_TANGGAL, :p_DESKRIPSI); END;`,
            { p_IDUSER, p_IDKATPEMASUKAN, p_NOMINAL, p_METODEPEMBAYARAN, p_TANGGAL, p_DESKRIPSI }
        );

        res.json({ message: 'Pemasukan created successfully' });
    } catch (error) {
        console.error('Error creating pemasukan:', error);
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

router.get('/read-pemasukan', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to read pemasukan
        const result = await connection.execute(`BEGIN READPEMASUKAN; END;`);

        // Assuming you want to send the result.rows back in the response
        res.json(result.rows);
    } catch (error) {
        console.error('Error reading pemasukan:', error);
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

router.patch('/update-pemasukan', async (req, res) => {
    const { u_IDUSER, u_IDKATPEMASUKAN, u_IDPEMASUKAN, u_NOMINAL, u_METODEPEMBAYARAN, u_TANGGAL, u_DESKRIPSI } = req.body;

    if (!u_IDUSER || !u_IDKATPEMASUKAN || !u_IDPEMASUKAN || !u_NOMINAL || !u_METODEPEMBAYARAN || !u_TANGGAL || !u_DESKRIPSI) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to update pemasukan
        await connection.execute(
            `BEGIN UPDATEPEMASUKAN_FROM_INPUT(:u_IDUSER, :u_IDKATPEMASUKAN, :u_IDPEMASUKAN, :u_NOMINAL, :u_METODEPEMBAYARAN, :u_TANGGAL, :u_DESKRIPSI); END;`,
            { u_IDUSER, u_IDKATPEMASUKAN, u_IDPEMASUKAN, u_NOMINAL, u_METODEPEMBAYARAN, u_TANGGAL, u_DESKRIPSI }
        );

        res.json({ message: 'Pemasukan updated successfully' });
    } catch (error) {
        console.error('Error updating pemasukan:', error);
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

router.delete('/delete-pemasukan', async (req, res) => {
    const { p_IDUSER, p_IDKATPEMASUKAN, p_IDPEMASUKAN } = req.body;

    if (!p_IDUSER || !p_IDKATPEMASUKAN || !p_IDPEMASUKAN) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to delete pemasukan
        await connection.execute(
            `BEGIN DELETEPEMASUKAN_FROM_INPUT(:p_IDUSER, :p_IDKATPEMASUKAN, :p_IDPEMASUKAN); END;`,
            { p_IDUSER, p_IDKATPEMASUKAN, p_IDPEMASUKAN }
        );

        res.json({ message: 'Pemasukan deleted successfully' });
    } catch (error) {
        console.error('Error deleting pemasukan:', error);
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