require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Define a new token for Morgan
morgan.token("post-body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-body"
  )
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const numberOfPeople = persons.length;
  const currentTime = new Date().toString();

  response.send(
    `<p>Phonebook has info for ${numberOfPeople} people</p><p>${currentTime}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => response.json(person));
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Person.findById(id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Person.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch((error) => response.status(400).json({ error: "malformatted id" }));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;

  if (!name) return response.status(400).json({ error: "name missing" });
  if (!number) return response.status(400).json({ error: "number missing" });

  Person.exists({ name }).then((personExists) => {
    if (personExists) {
      return response.status(400).json({ error: "name must be unique" });
    }

    const newPerson = new Person({ name, number });
    newPerson
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => {
        response.status(500).json({ error: "Failed to save to the database" });
      });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
