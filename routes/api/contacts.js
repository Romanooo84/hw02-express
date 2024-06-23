  const express = require('express')
  const contacts = require('../../contacts.json')
  const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

  const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
  })

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;

  data = contacts.find(user => user.id === contactId)
  console.log(data)
  if (!data) {
    res.status(404)
    res.json('Not found')
  }
    res.status(200)
    res.send(`id ${data.id} \n name: ${data.name} \n email: ${data.email} \n phone: ${data.phone}`)
})

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
  foundItem = contacts.find(found => found.id === contactId)
  data = contacts.filter(user => user.id !== contactId)
  data = [...data]
  if (foundItem) {
     res.status(200)
  res.json(`item dleted`)
}
  else {
    res.status(404)
    res.json("item not found")
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
