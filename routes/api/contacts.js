const express = require('express')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    res
    .status(200)
    .send(JSON.parse(data));
  } catch (err) {
    console.error(err);
    next(err);
  }
  })

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    const items = JSON.parse(data)
    const item = items.find(user => user.id===contactId)
    if (!item) {
      res
        .status(404)
        .json('Not found')
    } else {
      res
        .status(200)
        .send(`id: ${item.id} \t name: ${item.name} \t email: ${item.email} \t phone: ${item.phone}`)
    }
  } catch (err) {
    console.error(err);
    next(err);
  }})


router.post('/', async (req, res, next) => {
  const { name, email, phone } =req.body
  const user= {
    "id": uuidv4(),
          "name": name,
          "email": email,
          "phone": phone
  }
  try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    const items = JSON.parse(data)
    items.push(user)
    await fs.writeFile('./contacts.json', JSON.stringify(items, null, 2), 'utf8');
    res.status(201)
    .json(`contact id = ${user.id} was created`)
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
   const contactId = req.params.contactId;
  try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    const contactsData = JSON.parse(data)
    const item = contactsData.find(find => find.id === contactId)
    if (!item) {
      res
        .status(404)
        .json("contact not found")
      return
    }
    const updatedContacts = contactsData.filter(found => found.id !== contactId)
    await fs.writeFile('./contacts.json', JSON.stringify(updatedContacts, null, 2), 'utf8');
    console.log(updatedContacts)
    res
      .status(200)
    .json(`contact id = ${contactId} was deleted`)
  } catch (err) {
    console.error(err);
    next(err);
  }

})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const { name, email, phone } = req.body

  try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    const items = JSON.parse(data)
    const item = items.find(contact => contact.id == contactId)
    const index = items.findIndex(contact=>contact.id == contactId)

    if (item) {
       contact = {
        "id": contactId,
         "name": name || item.name,
          "email": email || item.email,
          "phone": phone || item.phone
      }
      items[index]=contact
    }
    await fs.writeFile('./contacts.json', JSON.stringify(items, null, 2), 'utf8');
    res.status(201)
    .json(`contact id = ${contactId} was updated`)
  } catch (err) {
    console.error(err);
    next(err);
  }
  
})

module.exports = router
