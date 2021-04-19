import express, { Request, Response } from 'express';

const app = express()

app.get('/', (req: Request, res: Response) => { res.json({ "message": " ola" }) })

app.post('/', (req: Request, res: Response) => {
  res.json({"message": "Deu tudo certo"})
})

app.listen(8080, () => {
  console.log("Server is running on port 8080")
})
