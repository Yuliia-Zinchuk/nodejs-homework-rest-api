// const fs = require('fs/promises')

// const listContacts = async () => {};

// const getContactById = async (contactId) => {};

// const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//-------Get all contacts------------------------
const listContacts = async () => {
  // try {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
  // } catch (err) {
  //   console.error(err.message);
  // }
};

//-------Get contact by id------------------------
const getContactById = async (contactId) => {
  // try {
  const id = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
  // } catch (err) {
  //   console.error(err.message);
  // }
};

//-------Add contact-----------------------------
const addContact = async (name, email, phone) => {
  // try {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contactsList = [...contacts, newContact];
  await updateContacts(contactsList);
  return newContact;
  // } catch (err) {
  //   console.error(err.message);
  // }
};

//-------Delete contact by id------------------------
const removeContact = async (contactId) => {
  try {
    const id = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (err) {
    console.error(err.message);
  }
};

//-------Update contact-----------------------------
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
