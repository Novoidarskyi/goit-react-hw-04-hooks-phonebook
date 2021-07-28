import React, { useState } from 'react';
import styles from '../utils/common.module.css';
import css from './Phonebook.module.css';



const Phonebook = ({onSubmit}) => {

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

   // Метод для записи в state значений, введенных в input

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) { 
      case "name":
        setName(value);
        break;
      
        case "number":
        setNumber(value);
        break;
      
      default: return
    }
  
  };

  // Метод для отправки state формы в state App и очистки input

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    setName("");
    setNumber("");
  };



  return (
    <div>
      <h1 className={ styles.titel}>Phonebook</h1>
        <form onSubmit={handleSubmit} className={styles.container}>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={handleChange}
            className={ css.input}
          />
           <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={number}
            onChange={handleChange}
             className={ css.input}
          />
          <button type="submit" className={ styles.button}>Add contact</button>
        </form>
    </div>
  )
}

export default Phonebook







