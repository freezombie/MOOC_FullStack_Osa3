const express = require('express');
const app = express();

app.use(express.json())

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
    const maxId =  persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person);
    response.json(person);
})

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);