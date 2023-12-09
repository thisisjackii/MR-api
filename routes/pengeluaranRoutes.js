import { Router } from 'express'
import oracledb from 'oracledb'
const router = Router()

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

// Create PENGELUARAN
router.post('/create-pengeluaran', async (req, res) => {
  const { u_IDKATPENGELUARAN, u_IDUSER, u_IDPENGELUARAN, u_DESCRIPSI, u_METODEPEMBAYARAN, u_NOMINAL, u_TANGGAL } = req.body;

  if (!u_IDKATPENGELUARAN || !u_IDUSER || !u_IDPENGELUARAN || !u_DESCRIPSI || !u_METODEPEMBAYARAN || !u_NOMINAL || !u_TANGGAL) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to create PENGELUARAN
    await connection.execute(
      `BEGIN CREATEPENGELUARAN(:u_IDKATPENGELUARAN, :u_IDUSER, :u_IDPENGELUARAN, :u_DESCRIPSI, :u_METODEPEMBAYARAN, :u_NOMINAL, TO_DATE(:u_TANGGAL, 'YYYY-MM-DD')); END;`,
      {
        u_IDKATPENGELUARAN,
        u_IDUSER,
        u_IDPENGELUARAN,
        u_DESCRIPSI,
        u_METODEPEMBAYARAN,
        u_NOMINAL,
        u_TANGGAL,
      }
    );

    res.json({ message: 'PENGELUARAN created successfully' });
  } catch (error) {
    console.error('Error creating PENGELUARAN:', error);
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

// Read data from PENGELUARAN
router.get('/read-pengeluaran', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to read data from PENGELUARAN
    const result = await connection.execute(`BEGIN READPENGELUARAN; END;`);

    // Assuming you want to send the result.rows back in the response
    res.json(result.rows);
  } catch (error) {
    console.error('Error reading PENGELUARAN:', error);
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

// Update PENGELUARAN description
router.put('/update-pengeluaran-desc', async (req, res) => {
  const { u_IDKATPENGELUARAN, u_IDUSER, u_IDPENGELUARAN, u_DESCRIPSI } = req.body;

  if (!u_IDKATPENGELUARAN || !u_IDUSER || !u_IDPENGELUARAN || !u_DESCRIPSI) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to update PENGELUARAN description
    await connection.execute(
      `BEGIN UPDATEPENGELUARANDESC(:u_IDKATPENGELUARAN, :u_IDUSER, :u_IDPENGELUARAN, :u_DESCRIPSI); END;`,
      {
        u_IDKATPENGELUARAN,
        u_IDUSER,
        u_IDPENGELUARAN,
        u_DESCRIPSI,
      }
    );

    res.json({ message: 'PENGELUARAN description updated successfully' });
  } catch (error) {
    console.error('Error updating PENGELUARAN description:', error);
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

// Update PENGELUARAN nominal
router.put('/update-pengeluaran-nominal', async (req, res) => {
  const { u_IDKATPENGELUARAN, u_IDUSER, u_IDPENGELUARAN, u_NOMINAL } = req.body;

  if (!u_IDKATPENGELUARAN || !u_IDUSER || !u_IDPENGELUARAN || !u_NOMINAL) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to update PENGELUARAN nominal
    await connection.execute(
      `BEGIN UPDATEPENGELUARANNOMINAL(:u_IDKATPENGELUARAN, :u_IDUSER, :u_IDPENGELUARAN, :u_NOMINAL); END;`,
      {
        u_IDKATPENGELUARAN,
        u_IDUSER,
        u_IDPENGELUARAN,
        u_NOMINAL,
      }
    );

    res.json({ message: 'PENGELUARAN nominal updated successfully' });
  } catch (error) {
    console.error('Error updating PENGELUARAN nominal:', error);
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

// Delete PENGELUARAN
router.delete('/delete-pengeluaran', async (req, res) => {
  const { u_IDKATPENGELUARAN, u_IDUSER, u_IDPENGELUARAN } = req.body;

  if (!u_IDKATPENGELUARAN || !u_IDUSER || !u_IDPENGELUARAN) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to delete PENGELUARAN
    await connection.execute(
      `BEGIN DELETEPENGELUARAN(:u_IDKATPENGELUARAN, :u_IDUSER, :u_IDPENGELUARAN); END;`,
      {
        u_IDKATPENGELUARAN,
        u_IDUSER,
        u_IDPENGELUARAN,
      }
    );

    res.json({ message: 'PENGELUARAN deleted successfully' });
  } catch (error) {
    console.error('Error deleting PENGELUARAN:', error);
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
