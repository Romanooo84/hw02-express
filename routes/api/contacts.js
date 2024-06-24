  const express = require('express')
  const contacts = require('../../contacts.json')
  const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

  const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    res
    .status(200)
    .json(JSON.parse(data));
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
        .send(`id ${item.id} \n name: ${item.name} \n email: ${item.email} \n phone: ${item.phone}`)
    }
  } catch (err) {
    console.error(err);
    next(err);
  }})


router.post('/', async (req, res, next) => {
  const { namee, email, phone } =req.body
  const user= {
       "id": uuidv4(),
          "name": namee,
          "email": email,
          "phone": phone
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
  res.json({ message: 'template message' })
})

module.exports = router
