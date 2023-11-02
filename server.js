const express = require('express');
const path = require('path');
const fs = require('fs')

// Import the feedback router
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// api route to retrieve notes
app.get("/api/notes", (req, res) => {
  res.json(notes)
})

app.post("/api/notes",(req, res) => {
  
  notes.push(req.body)

  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) =>
    err ? console.log(err) : console.log('Successfully created!')
  );
  
  res.json('updated')

})

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET * should return the index.html file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
