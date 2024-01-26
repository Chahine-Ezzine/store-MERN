import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import { Store } from './models/storeModel.js'
import storeRoute from './routes/storeRoute.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send('store backend')
})

app.use('/items', storeRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
