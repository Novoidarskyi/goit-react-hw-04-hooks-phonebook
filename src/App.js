import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import toast, { Toaster } from 'react-hot-toast';
import Contacts from 'components/Contacts';
import Phonebook from 'components/Phonebook';
import Filter from 'components/Filter';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  // Метод для получения из localStorage контактов при первом рендере странице

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  // Метод для записи в localStorage контактов при изменении массива contacts в state App

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Метод для добавления нового контакта

  const addContact = (name, number) => {
    const repeatedContact = contacts.some(item => item.name.includes(name));
    const repeatedNumber = contacts.some(item => item.number.includes(number));
    if (repeatedContact && repeatedNumber) {
      toast.error(`${name} is already in contacts`);
      return;
    }
    {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      setContacts(prevState => [contact, ...contacts]);
      toast.success(`${name} add to contacts`);
    }
  };

  // Метод для удаления нового контакта

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  // Метод для записи в state значения input фильтрации

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  // Метод для отображения отфильтрованых контактов

  const getVisibleContact = () => {
    const normalaizedContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedContact),
    );
  };

  const visibleContact = getVisibleContact();

  return (
    <div className="App">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            border: '1px solid royalblue',
            height: '50px',
          },
        }}
      />
      <Phonebook onSubmit={addContact} />
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={visibleContact} ondeleteContact={deleteContact} />
    </div>
  );
};

export default App;
