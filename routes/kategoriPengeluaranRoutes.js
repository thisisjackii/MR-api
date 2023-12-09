// routes/dataController.js
import express from 'express';
import oracledb from 'oracledb';

const router = express.Router();

const dbConfig = {
    user: 'jackyjacky',
    password: 'jacky',
    connectString: 'localhost:1521/xepdb1',
};

// Display all Kategori Pengeluaran
router.get('/read-pengeluaran-categories', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to display all Kategori Pengeluaran
    const result = await connection.execute(`BEGIN displayPengeluaranCategories; END;`);

    // Assuming you want to send the result.rows back in the response
    res.json(result.rows);
  } catch (error) {
    console.error('Error reading pengeluaran categories:', error);
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

// Display one Kategori Pengeluaran by ID
router.get('/read-pengeluaran-category/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to display one Kategori Pengeluaran
    const result = await connection.execute(`BEGIN displayPengeluaranCategory(:p_category_id); END;`, [id]);

    // Assuming you want to send the result.rows back in the response
    res.json(result.rows);
  } catch (error) {
    console.error('Error reading pengeluaran category:', error);
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

// Create Kategori Pengeluaran
router.post('/create-pengeluaran-category', async (req, res) => {
  const { u_IDKATPENGELUARAN, u_NAMAKATPENGELUARAN } = req.body;

  if (!u_IDKATPENGELUARAN || !u_NAMAKATPENGELUARAN) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to create Kategori Pengeluaran
    await connection.execute(
      `BEGIN createPengeluaranCategory(:u_IDKATPENGELUARAN, :u_NAMAKATPENGELUARAN); END;`,
      { u_IDKATPENGELUARAN, u_NAMAKATPENGELUARAN }
    );

    res.json({ message: 'Kategori Pengeluaran created successfully' });
  } catch (error) {
    console.error('Error creating pengeluaran category:', error);
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

// Update Kategori Pengeluaran Name
router.patch('/update-pengeluaran-category/:id', async (req, res) => {
  const { id } = req.params;
  const { u_NAMAKATPENGELUARAN } = req.body;

  if (!id || !u_NAMAKATPENGELUARAN) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to update Kategori Pengeluaran Name
    await connection.execute(
      `BEGIN updatePengeluaranCategoryName(:u_IDKATPENGELUARAN, :u_NAMAKATPENGELUARAN); END;`,
      { u_IDKATPENGELUARAN: id, u_NAMAKATPENGELUARAN }
    );

    res.json({ message: 'Kategori Pengeluaran name updated successfully' });
  } catch (error) {
    console.error('Error updating pengeluaran category name:', error);
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

// Delete Kategori Pengeluaran
router.delete('/delete-pengeluaran-category/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Call the controller procedure to delete Kategori Pengeluaran
    await connection.execute(`BEGIN deletePengeluaranCategory(:u_IDKATPENGELUARAN); END;`, [id]);

    res.json({ message: 'Kategori Pengeluaran deleted successfully' });
  } catch (error) {
    console.error('Error deleting pengeluaran category:', error);
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
