const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const { v4: uuidv4 } = require("uuid");
const { notEqual } = require("assert");
// const notes = require("./db/db.json");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//CRUD OPERATIONS
//Create - POST / Read - GET / Update / Delete

// GET requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
  console.info(`${req.method} request received`);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  console.info(`${req.method} request received`);
});

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    const parsedNotes = JSON.parse(data);
    parsedNotes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(parsedNotes), (err, data) => {
      res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    const parsedNotes = JSON.parse(data);
    const filteredNotes = parsedNotes.filter(
      (note) => note.id !== req.params.id
    );
    fs.writeFile("db/db.json", JSON.stringify(filteredNotes), (err, data) => {
      res.json(filteredNotes);
    });
  });
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
