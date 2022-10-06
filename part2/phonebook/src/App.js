import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase().trim())
  );

  useEffect(() => {
    phonebookService.getAll().then((allPersons) => setPersons(allPersons));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const savePerson = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName.trim());

    if (found !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(found);
      }
    } else {
      const personToSave = {
        name: newName,
        number: newNumber,
      };
      phonebookService.create(personToSave).then((savedPerson) => {
        setPersons(persons.concat(savedPerson));
        setNotification({
          message: `Added ${savedPerson.name}`,
          type: "success",
        });
        setNewName("");
        setNewNumber("");
        setTimeout(() => setNotification(null), 3000);
      });
    }
  };

  const updatePerson = (person) => {
    const updatedPerson = { ...person, number: newNumber };
    phonebookService
      .update(person.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id === person.id ? returnedPerson : p))
        );
        setNotification({
          message: `Updated number for ${person.name}`,
          type: "success",
        });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch((error) => {
        setNotification({
          message: `Information of ${person.name} has already been removed from server`,
          type: "error",
        });
        setPersons(persons.filter((p) => p.id !== person.id));
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService.deletePerson(personToDelete.id).then((response) => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={savePerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDeletePerson={deletePerson} />
    </div>
  );
};

export default App;
