import React, { useState, useEffect } from "react";
import personsService from "./services/persons.js";

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
  const handleDelete = (id, name) => {
    const confirmDeletion = window.confirm(`Delete ${name}?`);

    if (confirmDeletion) {
      personsService.remove(id).then(() => {
        props.setPersons((previousPersons) =>
          previousPersons.filter((person) => person.id !== id)
        );
      });
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      {props.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
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
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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

    if (currentName.length > 0) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = { name: newName, phone: newPhone };

      personsService.create(newPerson).then((returnedPerson) => {
        setPersons((previousPersons) => previousPersons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
      });
    }
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

      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;
