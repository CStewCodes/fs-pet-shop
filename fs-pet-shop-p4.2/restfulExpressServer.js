// ==== Declare Dependencies ===
const express = require('express');
//what is this dotenv??????
const dotenv = require('dotenv');

// ====== Initialize dotenv =====
dotenv.config();

// ==== Initialize Express ======
const app = express();
app.use(express.json());

// ===== Initialize PG ==========
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });
const port  = process.env.PORT;
pool.connect();
pool.query(`SELECT *`);

// ====== API ROUTES ==========
app.get('/api/pets', (req, res) => {
    pool.query(`SELECT * FROM pets`).then((result) => {
        res.send(result.rows);
    }
    )
});

app.get('/api/pets/:petID', (req, res) => {
    pool.query(`SELECT * FROM pets where id = $1`, [req.params.petID]).then((result) => {
        if (result.rows.length == 0) {
            res.status(404).send('pet id not found');
        } else{
        res.send(result.rows);
        }
    )
});

app.post('api/pets', (req, res) => {
   pool
    .query(`INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3) RETURNING *`, [
        req.body.age,
        req.body.kind,
        req.body.name
    ])
    .then((result) => {
        res.send(result.rows);
    });
  });
  
app.patch('api/pets/:petID', (req, res) => {
    let key = Object.keys(req.body)[0]
    let value = Object.values(req.body)[0]
    pool.query(`UPDATE pets SET $1 = '$2' WHERE id = $3`, [key, value, req.params.petID]).then((result) => {
        if (result.rows.length == 0) {
            res.status(404).send('pet id not found')
        } else {
            res.send(result.rows);
        }
    })
});

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});