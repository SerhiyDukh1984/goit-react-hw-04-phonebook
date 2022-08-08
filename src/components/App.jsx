import { useState, useEffect } from "react";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactsList from "./ContactsList/ContactsList";
import Filter from "./Filter/Filter";

const phoneNumbers = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

localStorage.setItem("contacts", JSON.stringify(phoneNumbers));

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem("contacts")) || []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify([...contacts]));
  }, [contacts]);

  const handleChange = (e) => {
    const { value } = e.target;

    setFilter(value);
  };

  const addContact = (data) => {
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    )
      return alert(`${data.name} is already in contacts.`);

    setContacts([...contacts, data]);
  };
  console.log(
    contacts.filter((contact) => console.log(contact.name.toLowerCase()))
  );

  const filteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase().trim())
    );
  };

  const getFilteredContacts = filteredContacts();

  const deleteContact = (id) =>
    setContacts(contacts.filter((contact) => contact.id !== id));

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
