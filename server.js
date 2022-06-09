const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const uuid = require("./helpers/uuid");
const notes = require("./Develop/db/db.json");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

//CRUD OPERATIONS
//Create - POST
//Read - GET
//Update
//Delete

// GET request
app.get("/", (req, res) => {
  res.json(path.join(__dirname, "./Develop/public/index.html"));
  console.info(`${req.method} request received`);
});

app.get("./Develop/public/notes", (req, res) => {
  res.json(path.join(__dirname, "./Develop/public/notes"));
  console.info(`${req.method} request received`);
});

// GET a single review
app.get("/notes/:notes_id", (req, res) => {
  if (req.params.notes_id) {
    console.info(`${req.method} request received to get a single a note`);
    const reviewId = req.params.review_id;
    for (let i = 0; i < reviews.length; i++) {
      const currentNote = notes[i];
      if (currentNote.note_id === noteId) {
        res.json(currentNote);
        return;
      }
    }
    res.status(404).send("Note not found");
  } else {
    res.status(400).send("Note ID not provided");
  }
});

// POST request
app.post("/", (req, res) => {
  res.json(path.join(__dirname, "/develop/public/index.html"));
});

app.post("/notes", (req, res) => {
  res.json(`${req.method} request received`);
  console.info(`${req.method} request received`);
});

// POST request to add a note
app.post("/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, bodytext } = req.body;

  // If all the required properties are present
  if (title && bodytext) {
    // Variable for the object we will save
    const newNote = {
      title,
      bodytext,
      note_id: uuid(),
    };

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

//ref 13/01/06unsolved - bookroutes.js
notes.get("/", (req, res) => {
  Notes.findAll().then((notesData) => {
    res.json(notesData);
  });
});

notes.post("/", (req, res) => {
  Notes.create(req.body)
    .then((newNote) => {
      res.json(newNote);
    })
    .catch((err) => {
      res.json(err);
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
