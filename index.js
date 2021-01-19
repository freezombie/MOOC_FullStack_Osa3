const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json())
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan('tiny', {
    skip: (req, res) => {return req.method === 'POST'}
}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req, res) => { return req.method !== 'POST' }
}));

const MAX_ID = 99999;
const MIN_ID = 10000;

let persons = [
    {
        "name": "Ada Lovelace",
        "number": "777",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "888",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/info', (req, res) => {
    const pvm = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${pvm}</p>`);
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if(person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', ( request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

const generateId = () => {
    let returnedId = 0;
    let possiblePerson = null;
    do {
        const randomId = Math.floor(Math.random() * (MAX_ID - MIN_ID + 1) + MIN_ID);
        possiblePerson = persons.find( ({ id }) => id === randomId );
        if (!possiblePerson) {
            returnedId = randomId;
        }
    } while (possiblePerson);
    return returnedId;
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (persons.find( ({name}) => name === body.name)) {
        return response.status(409).json({
            error: 'Name already exists'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person);
    response.json(person);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);