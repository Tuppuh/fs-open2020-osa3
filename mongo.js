const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  number: { type: String, minlength: 8 },
})

const Person = mongoose.model('Person', personSchema)

const getAllPersons = url => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  Person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

const createPerson = (url, name, number) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(response => {
    console.log('saved')
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
}

const main = argv => {
  if (argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
  }
  const password = argv[2]
  const url =
  `mongodb+srv://tuomo:${password}@cluster0.exyge.mongodb.net/test?retryWrites=true&w=majority`

  if (process.argv.length < 4) {
    getAllPersons(url)
  }
  else{
    const name = process.argv[3]
    const number = process.argv[4]
    createPerson(url, name, number)
  }
}

main(process.argv)

