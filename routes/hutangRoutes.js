import { Router } from 'express'
import oracledb from 'oracledb'
const router = Router()

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

// Show HUTANG
router.get('/show-hutang/:idUser/:jenis', async (req, res) => {
    const { idUser, jenis } = req.params;

    if (!idUser || !jenis) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to show HUTANG
        const result = await connection.execute(
            `BEGIN show_hutang(:v_idUser, :v_jenis); END;`,
            {
                v_idUser,
                v_jenis,
            }
        );

        // Assuming you want to send the result in the response
        res.json(result);
    } catch (error) {
        console.error('Error showing HUTANG:', error);
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

// Create Hutang
router.post('/create-hutang', async (req, res) => {
    const {
        IDHUTANG,
        IDUSER,
        DESKRIPSI,
        TANGGAL,
        NOMINAL,
        JENIS,
        NAMAREKAN,
        METODEPEMBAYARAN,
        TANGGALJATUHTEMPO,
        STATUS,
    } = req.body;

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the createHutang procedure
        await connection.execute(
            `BEGIN createHutang(
         :p_IDHUTANG,
         :p_IDUSER,
         :p_DESKRIPSI,
         :p_TANGGAL,
         :p_NOMINAL,
         :p_JENIS,
         :p_NAMAREKAN,
         :p_METODEPEMBAYARAN,
         :p_TANGGALJATUHTEMPO,
         :p_STATUS
       ); END;`,
            {
                p_IDHUTANG: IDHUTANG,
                p_IDUSER: IDUSER,
                p_DESKRIPSI: DESKRIPSI,
                p_TANGGAL: TANGGAL,
                p_NOMINAL: NOMINAL,
                p_JENIS: JENIS,
                p_NAMAREKAN: NAMAREKAN,
                p_METODEPEMBAYARAN: METODEPEMBAYARAN,
                p_TANGGALJATUHTEMPO: TANGGALJATUHTEMPO,
                p_STATUS: STATUS,
            }
        );

        res.json({ message: 'Hutang data created successfully.' });
    } catch (error) {
        console.error('Error creating Hutang:', error);
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

// Read Hutang
router.get('/read-hutang/:idHutang', async (req, res) => {
    const { idHutang } = req.params;

    if (!idHutang) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the readHutang procedure
        const result = await connection.execute(
            `BEGIN readHutang(:p_IDHUTANG); END;`,
            {
                p_IDHUTANG: idHutang,
            }
        );

        // Assuming you want to send the result in the response
        res.json(result);
    } catch (error) {
        console.error('Error reading Hutang:', error);
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

// Read Hutang By Jenis
router.get('/read-hutang-by-jenis/:idUser/:jenis', async (req, res) => {
    const { idUser, jenis } = req.params;

    if (!idUser || !jenis) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the readHutangByJenis procedure
        const result = await connection.execute(
            `BEGIN readHutangByJenis(:p_IDUSER, :p_JENIS); END;`,
            {
                p_IDUSER: idUser,
                p_JENIS: jenis,
            }
        );

        // Assuming you want to send the result in the response
        res.json(result);
    } catch (error) {
        console.error('Error reading Hutang by Jenis:', error);
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

// Update Hutang
router.put('/update-hutang/:idHutang', async (req, res) => {
    const { idHutang } = req.params;
    const { DESKRIPSI, TANGGALJATUHTEMPO, STATUS } = req.body;

    if (!idHutang || !DESKRIPSI || !TANGGALJATUHTEMPO || !STATUS) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the updateHutang procedure
        await connection.execute(
            `BEGIN updateHutang(:p_IDHUTANG, :p_DESKRIPSI, :p_TANGGALJATUHTEMPO, :p_STATUS); END;`,
            {
                p_IDHUTANG: idHutang,
                p_DESKRIPSI: DESKRIPSI,
                p_TANGGALJATUHTEMPO: TANGGALJATUHTEMPO,
                p_STATUS: STATUS,
            }
        );

        res.json({ message: 'Hutang data updated successfully.' });
    } catch (error) {
        console.error('Error updating Hutang:', error);
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

// Delete Hutang
router.delete('/delete-hutang/:idHutang', async (req, res) => {
    const { idHutang } = req.params;

    if (!idHutang) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the deleteHutang procedure
        await connection.execute(
            `BEGIN deleteHutang(:p_IDHUTANG); END;`,
            {
                p_IDHUTANG: idHutang,
            }
        );

        res.json({ message: 'Hutang data deleted successfully.' });
    } catch (error) {
        console.error('Error deleting Hutang:', error);
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
