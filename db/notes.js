const noteTitle = document.getElementById("title");
const noteText = document.getElementById("text");

// Helper function that accepts a `review` object, sends a POST request and returns the result
const postNote = (note) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Successful POST request:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error in POST request:", error);
    });

// Listen for when the form is submitted
reviewForm.addEventListener("click", (e) => {
  e.preventDefault();

  // Create a new review object from the input values
  const newNote = {
    title: newTitle.value.trim(),
    text: newText.value.trim(),
  };

  // Call our `postReview` method to make a POST request with our `newReview` object.
  postNote(newNote)
    .then((data) => alert(`Note added! Note ID: ${data.body.note}`))
    .catch((err) => console.error(err));
});
