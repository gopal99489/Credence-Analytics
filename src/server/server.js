const express = require('express');
require('dotenv').config();

const app = express();

const db = require('../database/database');

app.use(express.json());

const port = process.env.PORT || 5000;

//create data in the data base
app.post('/create', (req, res) => {
  const query = `insert into books (name, img, summary) values ("${req.body.name}", "${req.body.img}", "${req.body.summary}")`;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'contact me on github @noobwebdev777' });
    } else {
      res.status(200).json({ message: 'data inserted' });
    }
  });
});

//this api will give a array with all the books present in the db
app.get('/books', (req, res) => {
  const query = `select * from books`
  db.all(query, (err, rows) => {
    if(err){
      res.status(500).json({ message: 'contact me on github @noobwebdev777' });
    }else{
      res.status(200).json(rows)
    }
  })
})

//get data of the book with the name
app.get('/read', (req, res) => {
  const { name } = req.query;
  try {
    if (name === '') {
      res.status(500).json({ message: 'pls enter the name of the book' });
    } else {
      const query = `select * from books where name like '%${name}%'`;
      db.all(query, (err, rows) => {
        if (err) {
          res
            .status(500)
            .json({ message: 'contact me on github @noobwebdev777' });
        } else {
          res.status(200).json(rows);
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'pls enter the name of the book' });
  }
});

//this api will update a specific book info if the name of the book is passed as params
app.patch('/update/:name', (req, res) => {
  const { name } = req.params;
  const { upname, img, summary } = req.body;

  const new_name = upname !== undefined ? upname : null;
  const new_img = img !== undefined ? img : null;
  const new_summary = summary !== undefined ? summary : null;

  console.log(new_img, new_name, new_summary);

  const query = `
    UPDATE books
    SET 
        name = COALESCE(?, name),
        img = COALESCE(?, img),
        summary = COALESCE(?, summary)
    WHERE name = ?;
  `;

  db.run(query, [new_name, new_img, new_summary, name], function (err) {
    if (err) {
      console.error('Error updating book:', err);
      res.status(500).send('An error occurred while updating the book.');
    } else {
      res.status(200).send('Book updated successfully.');
    }
  });
  console.log(query);
});

//this api will delete a specific book with the given name
app.delete('/delete/:name', (req, res) => {
  const {name} = req.params
  const query = `DELETE FROM books
  WHERE name like '%${name}%';
  `
  console.log(query)
  db.run(query, (err, rows) => {
    if(err){
      res.status(500).json({ message: 'contact me on github @noobwebdev777' });
    }else{
      res.status(200).send('book deleted successfully')
    }
  })
})

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
