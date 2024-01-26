import express from 'express'
import { Store } from '../models/storeModel.js'

const router = express.Router()

router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.category ||
      !request.body.price ||
      !request.body.description
    ) {
      return response.status(400).send({
        message:
          'send all required fields: name, category , price, description',
      })
    }
    const newItem = {
      name: request.body.name,
      category: request.body.category,
      price: request.body.price,
      description: request.body.description,
    }

    const store = await Store.create(newItem)
    return response.status(201).send(store)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

//route for Get All items from database
router.get('/', async (request, response) => {
  try {
    const items = await Store.find({})
    return response.status(200).json({
      count: items.length,
      data: items,
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const store = await Store.findById(id)
    return response.status(200).json(store)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.category ||
      !request.body.price ||
      !request.body.description
    ) {
      return response.status(404).send({
        message: 'send all required fields: name, category, price, description',
      })
    }
    const { id } = request.params
    const result = await Store.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(404).json({ message: 'item not found' })
    }

    return response.status(200).send({ message: 'item updated successfully' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const result = await Store.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: 'item not found' })
    }
    return response.status(200).send({ message: 'item deleted successfully' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router
