import PersonDetail from "./PersonDetail";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
