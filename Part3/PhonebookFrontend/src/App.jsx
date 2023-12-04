import React, { useState, useEffect } from "react";
import personsService from "./services/persons.js";
import "./index.css";

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
  const { setPersons } = props;

  const handleDelete = (id, name, handleSetErrorMessage) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);

    if (confirmDelete) {
      personsService
        .remove(id)
        .then(() => {
          setPersons((previousPersons) =>
            previousPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          handleSetErrorMessage(
            `${name} has already been deleted from the server.`
          );
          setTimeout(() => {
            handleSetErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      {props.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
          <button
            onClick={() =>
              handleDelete(person.id, person.name, props.handleSetErrorMessage)
            }
          >
            Delete
          </button>
        </p>
      ))}
    </div>
  );
};

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage) {
    return <div className="success">{successMessage}</div>;
  } else if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  } else {
    return null;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const existingPerson = currentName[0];
        const updatedPerson = { ...existingPerson, phone: newPhone };
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(() => {
            setPersons((previousPersons) =>
              previousPersons.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
            setNewName("");
            setNewPhone("");
            setSuccessMessage(`Changed number for ${newName}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Failed to udpate number for ${newName}. Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newPhone };
      personsService.create(newPerson).then((returnedPerson) => {
        setPersons((previousPersons) => previousPersons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
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

  const handleSetErrorMessage = (message) => {
    setErrorMessage(message);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <Filter filter={filter} onChange={filterNames} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <Persons
        persons={personsToShow}
        setPersons={setPersons}
        handleSetErrorMessage={handleSetErrorMessage}
      />
    </div>
  );
};

export default App;
