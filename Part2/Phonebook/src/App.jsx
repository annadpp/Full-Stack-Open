import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [personsShowed, setPersonsShowed] = useState(persons); // Initialize with persons

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const currentName = persons.filter((person) => person.name === newName);

    currentName.length === 0
      ? (() => {
          setPersons([
            ...persons,
            { name: newName, phone: newPhone, id: persons.length + 1 },
          ]);
          setPersonsShowed([
            ...personsShowed, // Add the new person to personsShowed
            { name: newName, phone: newPhone, id: persons.length + 1 },
          ]);
        })()
      : alert(`${newName} is already added to phonebook`);
    setNewName("");
    setNewPhone("");
  };

  const filterNames = (e) => {
    const nameFilter = e.target.value.toLowerCase();
    setFilter(nameFilter);
    setPersonsShowed(
      persons.filter((person) => person.name.toLowerCase().includes(nameFilter))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with <input value={filter} onChange={filterNames} />
      </p>
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsShowed.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
