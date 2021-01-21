require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person')

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
app.use(cors());
app.use(express.static('build'));

const MAX_ID = 99999;
const MIN_ID = 10000;

app.get('/info', (req, res) => {
    const pvm = new Date();
    return res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${pvm}</p>`);
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people);
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if(person) {
        return response.json(person);
    } else {
        return response.status(404).end();
    }
})

app.delete('/api/persons/:id', ( request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    return response.status(204).end();
})

const generateId = async() => {
    let returnedId = 0;
    let possiblePerson = null;
    do {
        const randomId = Math.floor(Math.random() * (MAX_ID - MIN_ID + 1) + MIN_ID);
        possiblePerson = await Person.findOne({ id: randomId}).exec();
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
    }

    Person.findOne({name: body.name}, (err, person) => {
        console.log(err);
        console.log(person);
        if(person) {
            return response.status(409).json({
                error: 'Name already exists'
            })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number,
                id: generateId(),
            })

            person.save().then(savedPerson => {
                return response.json(savedPerson);
            })
        }
    })    
})

const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
