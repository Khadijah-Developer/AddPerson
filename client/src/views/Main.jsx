import React, { useEffect, useState } from 'react';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
import axios from 'axios';
const Main = (props) => {
    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);

/*************************** Create Person Begin ***************************/
    const [person, setPerson] = useState({
        firstName: "",
        lastName: "",
    });
    const [personCreated, setPersonCreated] = useState(false);
    
    const [errors, setErrors] = useState([]);
    
    function handleChange(event) {
        setPerson({ ...person, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
            event.preventDefault();
            setPersonCreated(false);
            setErrors([]);
            axios.post('http://localhost:8000/api/people', person)
            .then((response) => {
                setPersonCreated(true);
            })
          .catch((err) => {
          console.log(err);
        const data = err.response.data;
        const errorMessages = [];
        if ("errors" in data) {
          for (let field in data.errors) {
            const validationError = data.errors[field];
            errorMessages.push(validationError.message);
          }
        }
        setErrors(errorMessages);
          });

        if (person.firstName.length > 0 && person.lastName.length > 0) {
        setPerson({
             firstName: "",
        lastName: "",
        })
        }
    }
    /*************************** Create Person End ***************************/


    // useEffect to fetch people data from the backend
    useEffect(()=>{
        axios.get('http://localhost:8000/api/people')
            .then(res => {
                //set the fetch people
                setPeople(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[]);
    //..............................delete................................... //
    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id !== personId));
    }

    return (
        <div>
             <h1>Create User</h1>
      {errors.map((errorMessage, index) => (
        <div key={index}>Error: {errorMessage}</div>
      ))}
      {personCreated && <div>User has been successfully created</div>}
        <PersonForm {...person}  handleChange={handleChange} handleSubmit={handleSubmit} />
          
            <hr />
            {/* send a people useState as props */}
           {loaded && <PersonList people={people} removeFromDom={removeFromDom}/>}
        </div>
    )
}
    
export default Main;

