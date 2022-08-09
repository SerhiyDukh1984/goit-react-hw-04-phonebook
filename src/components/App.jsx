import { useState, useEffect } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify([...contacts]));
  }, [contacts]);

  const handleChange = e => {
    const { value } = e.target;

    setFilter(value);
  };

  const addContact = data => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    )
      return alert(`${data.name} is already in contacts.`);

    setContacts([...contacts, data]);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase().trim())
    );
  };

  const getFilteredContacts = filteredContacts();

  const deleteContact = id =>
    setContacts(contacts.filter(contact => contact.id !== id));

  return (
    <Section title="Phonebook">
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactsList
        getFilteredContacts={getFilteredContacts}
        deleteContact={deleteContact}
      />
    </Section>
  );
};

export default App;
