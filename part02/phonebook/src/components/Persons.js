const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons
