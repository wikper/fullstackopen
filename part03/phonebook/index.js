const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('build'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(cors())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}

app.get('/info', (request, response) => {
  const date = new Date()
  const personsLength = persons.length
  response.send(`
    <div>
        <p>Phonebook has info for ${personsLength} people</p>
        <p>${date}</p>
    </div>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    persons = persons.filter((p) => p !== person)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const { name, number } = body
  if (!name || !number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }
  if (persons.find((person) => person.name === name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
