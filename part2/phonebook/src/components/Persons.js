import PersonDetail from "./PersonDetail";

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonDetail
          key={person.id}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default Persons;
