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

// fs.readFile(file, "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const parsedData = JSON.parse(data);
//     parsedData.push(content);
//     writeToFile(file, parsedData);
//   }
// });

// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );

// //GET REQUEST (READ)
// app.get("/notes", (req, res) =>
//     readFileAsync("/develop/db/db.json", "utf8").then(fuction(data) {
//         notes = [].concat(JSON.parse(data))
//         // res.json(notes)
//     })
// );

// //POST REQUEST (CREATE)
// app.post("/notes", (req, res) => {
//     const note = req.body;
//     fs.writeFile("/develop/db.json", "utf8").then(fuction(data) {
//         const notes = [].concat(JSON.parse(data));
//         note.id = notes.length + 1
//         notes.push(note);
//             return notes
//             }).then(fuction(notes) {
//     // res.json(note);
// })
//         });

//DELETE REQUEST (DELETE)
// app.delete("/notes", (req, res) => {
//     const idToDelete = parseInt(req.params.id);
//     fs.appendFile("./develop/db/db.json", "utf8").then(fuction(data) {
//         const notes = [].concat(JSON.parse(data));
//         const NewNotesData = []
//         for(let i = 0; i<notes.length; i++) {
//         if (idToDelete !== notes[i].id) {
//             newNotesData.push(notes[i])
//         }}
// return newNotesData
// }).then(function (notes) {
//     res.send("Saved")
// })
// })
