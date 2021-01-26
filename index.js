require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person')

app.use(express.json())

// Logger
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan('tiny', {
    skip: (req, res) => {return req.method === 'POST'}
}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req, res) => { return req.method !== 'POST' }
}));
// End logger

app.use(cors());
app.use(express.static('build'));

const MAX_ID = 99999;
const MIN_ID = 10000;

app.get('/info', (req, res) => {
    const pvm = new Date();
    Person.find({}).then(people => {
        res.send(`<p>Phonebook has info for ${people.length} people</p>
                  <p>${pvm}</p>`);
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people);
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', ( request, response) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end();
    })
    .catch(error => next(error))
})

/* const generateId = async() => {
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
} */

app.put('/api/persons/:id', (request, response) => {
    const body = request.body;
    console.log(request.body);

    Person.findByIdAndUpdate(request.params.id, {number: body.number}, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name) {
        response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        response.status(400).json({
            error: 'number missing'
        })
    }

    Person.findOne({name: body.name}, (err, person) => {
        if(person) {
            return response.status(409).json({
                error: 'Name already exists'
            })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number,
            })

            person.save().then(savedPerson => {
                response.json(savedPerson);
            })
        }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

