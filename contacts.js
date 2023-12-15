// contacts.js
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readContactsFile() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeContactsFile(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
}

async function listContacts() {
  return await readContactsFile();
}

async function getContactById(contactId) {
  const contacts = await readContactsFile();
  return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await readContactsFile();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await writeContactsFile(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const newContact = { id: Date.now().toString(), name, email, phone };
  const contacts = await readContactsFile();
  contacts.push(newContact);
  await writeContactsFile(contacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
