import express, { Request, Response, urlencoded } from 'express';
import './database/index'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(8080, () => {
  console.log("Server is running on port 8080")
})
