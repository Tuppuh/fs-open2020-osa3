const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('./frontend/build'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    response = `<div>Phonebook has info for ${persons.length} people</div>`
    response += '<br/>'
    response += new Date()
    res.send(response)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person){
            response.json(person.toJSON())
        }
        else{
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        next(error)
    })
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }

    /*
    if (persons.some(person => person.name === body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
    */
  
    const person = new Person({
        name: body.name,
        number: body.number
    })
  
    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
