const fs = require('fs').promises;
const path = require('path')

const contactsPath = path.join('./db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    console.table(parseData);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const findContact = JSON.parse(data).find((item) => item.id === contactId);
    console.table(findContact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const deleteContact = JSON.parse(data).filter((item) => item.id !== contactId);
    console.table(deleteContact);
    return await fs.writeFile(contactsPath, JSON.stringify(deleteContact));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const newContact = {
      id: `${JSON.parse(data).length + 1}`,
      name,
      email,
      phone,
    };
    const contactsNew = [...JSON.parse(data), newContact];
    console.table(contactsNew);
    return await fs.writeFile(contactsPath, JSON.stringify(contactsNew));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
