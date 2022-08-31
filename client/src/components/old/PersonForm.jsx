import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
const PersonForm = () => {
    //keep track of what is being typed via useState hook
    // const [firstName, setFirstName] = useState(""); 
    // const [lastName, setLastName] = useState("");
    const [person, setPerson] = useState({
        firstName: "",
        lastName: "",
    });
    const [loaded, setLoaded] = useState(false);
    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/people', person)
            .then(res=>console.log(res))
            .catch(err => console.log(err))
        
       
    }
    //onChange to update firstName and lastName
      function handleChange(event) {
        setPerson({
            ...person, 
            [event.target.name]: event.target.value
        })
           
      }


    return (
        <div>

        <form onSubmit={onSubmitHandler}>
            <p>
                <label>First Name</label><br/>
                <input type="text" name='firstName' onChange={handleChange} value={person.firstName}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" name='lastName' onChange={handleChange} value={person.lastName}/>
            </p>
            <input type="submit"/>
            </form>
            <br />

        </div>
    )
}

export default PersonForm;