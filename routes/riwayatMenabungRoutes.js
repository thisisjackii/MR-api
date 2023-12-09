import { Router } from 'express'
import oracledb from 'oracledb'
const router = Router()

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

// Create Riwayat Menabung
router.post('/create-riwayat-menabung', async (req, res) => {
  const { idRiwayat, idWishlist, nominal, tanggal } = req.body;

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the create_riwayat_menabung procedure
    await connection.execute(
      `BEGIN create_riwayat_menabung(:p_idRiwayat, :p_idWishlist, :p_nominal, :p_tanggal); END;`,
      {
        p_idRiwayat: idRiwayat,
        p_idWishlist: idWishlist,
        p_nominal: nominal,
        p_tanggal: tanggal,
      }
    );

    res.json({ message: 'Riwayat Menabung created successfully.' });
  } catch (error) {
    console.error('Error creating Riwayat Menabung:', error);
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
