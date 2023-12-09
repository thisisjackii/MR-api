// routes/dataController.js
import express from 'express';
import oracledb from 'oracledb';

const router = express.Router();

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

router.post('/create-wishlist', async (req, res) => {
    const { u_id_user, u_id_wishlist, u_desc, u_nominal, u_status } = req.body;

    if (!u_id_user || !u_id_wishlist || !u_desc || !u_nominal || !u_status) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to create wishlist
        await connection.execute(
            `BEGIN createWishlist(:u_id_user, :u_id_wishlist, :u_desc, :u_nominal, :u_status); END;`,
            { u_id_user, u_id_wishlist, u_desc, u_nominal, u_status }
        );

        res.json({ message: 'Wishlist created successfully' });
    } catch (error) {
        console.error('Error creating wishlist:', error);
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

router.get('/read-wishlist', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to read wishlist
        const result = await connection.execute(`BEGIN readWishlist; END;`);

        // Assuming you want to send the result.rows back in the response
        res.json(result.rows);
    } catch (error) {
        console.error('Error reading wishlist:', error);
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

router.patch('/update-wishlist-desc/:u_id_user', async (req, res) => {
    const { u_desc } = req.body;
    const { u_id_user } = req.params;

    if (!u_desc || !u_id_user) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to update wishlist description
        await connection.execute(
            `BEGIN updateWishlistDesc(:u_id_user, :u_desc); END;`,
            { u_id_user, u_desc }
        );

        res.json({ message: 'Wishlist description updated successfully' });
    } catch (error) {
        console.error('Error updating wishlist description:', error);
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

router.patch('/update-wishlist-nominal-target/:u_id_user', async (req, res) => {
    const { u_nominal } = req.body;
    const { u_id_user } = req.params;

    if (!u_nominal || !u_id_user) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to update wishlist nominal target
        await connection.execute(
            `BEGIN updateWishlistNominalTarget(:u_id_user, :u_nominal); END;`,
            { u_id_user, u_nominal }
        );

        res.json({ message: 'Wishlist nominal target updated successfully' });
    } catch (error) {
        console.error('Error updating wishlist nominal target:', error);
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

router.delete('/hapus-wishlist/:u_id_user/:u_id_wishlist', async (req, res) => {
    const { u_id_user, u_id_wishlist } = req.params;

    if (!u_id_user || !u_id_wishlist) {
        return res.status(400).json({ error: 'Incomplete data provided' });
    }

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // Call the controller procedure to delete wishlist
        await connection.execute(
            `BEGIN hapusWishlist(:u_id_user, :u_id_wishlist); END;`,
            { u_id_user, u_id_wishlist }
        );

        res.json({ message: 'Wishlist deleted successfully' });
    } catch (error) {
        console.error('Error deleting wishlist:', error);
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
