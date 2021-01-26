
const mongoose = require('mongoose')
console.log(process.argv.length);
if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('give either just the password as argument, or password name and number')
    process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@moocfullstack.2ta9e.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

mongoose.connection.on('connected', () => {
    console.log('connected');
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)
    if (process.argv.length === 5)
    {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        })

        person.save().then(() => {
            console.log(`Added ${person.name} number ${person.number} to phonebook`);
            mongoose.connection.close()
        })
    } else {
        console.log("phonebook:")
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            })
            mongoose.connection.close()
        })
        // tulosta kaikki mitä on.
    }
    
})
mongoose.connection.on('error', () => {
    console.log('error');
})
mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
})


