const Person = require('../models/person.model');

module.exports.index = (request, response) => {
    response.json({
       message: "Hello World"
    });
}

 // The method below is new
module.exports.createPerson = (req, res) => {
    // const { firstName, lastName } = request.body;
    // Person.create({
    //     firstName,
    //     lastName
    // })
    //     .then(person => response.json(person))
    //     .catch(err => response.json(err));

     Person.create(req.body)
    .then(newlyCreatedPerson => res.json({ person: newlyCreatedPerson }))
    .catch(err => res.status(400).json(err));
}

// module.exports.findAllPerson = (req, res)=>{
//     Person.find({})
//         .then(allPerson => res.json({ person: allPerson }))
//         .catch(err => res.json({ message: "Something went wrong", error: err }));
// };

module.exports.getAllPeople = (request, response) => {
    Person.find({})
        .then(persons => response.json(persons))
        .catch(err => response.json(err))
}

// get one person from db 
module.exports.getPerson = (request, response) => {
    Person.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.json(err))
}

// update one person from db
module.exports.updatePerson = (request, response) => {
    Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}

//delete one person from db
module.exports.deletePerson = (request, response) => {
    Person.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

