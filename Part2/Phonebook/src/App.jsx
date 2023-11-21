import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <p>
      filter shown with <input value={props.filter} onChange={props.onChange} />
    </p>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newPhone} onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      {props.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
        })()
      : alert(`${newName} is already added to the phonebook`);
    setNewName("");
    setNewPhone("");
  };

  const filterNames = (e) => {
    const nameFilter = e.target.value.toLowerCase();
    setFilter(nameFilter);
  };

  const personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={filterNames} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
