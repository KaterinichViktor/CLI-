const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

const argv = yargs(hideBin(process.argv))
  .option('action', {
    alias: 'a',
    describe: 'choose action',
    choices: ['list', 'get', 'add', 'remove'],
    demandOption: true,
  })
  .option('id', {
    describe: 'user id',
    string: true,
  })
  .option('name', {
    describe: 'user name',
    string: true,
  })
  .option('email', {
    describe: 'user email',
    string: true,
  })
  .option('phone', {
    describe: 'user phone',
    string: true,
  })
  .argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case 'get':
      const foundContact = await getContactById(id);
      console.log(foundContact);
      break;
    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'remove':
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
