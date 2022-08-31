import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import PersonForm from '../components/PersonForm';
import DeleteButton from '../components/DeleteButton';
    
const Update = (props) => {
    const navigate = useNavigate();
  const [person, setPerson] = useState({
        firstName: "",
        lastName: "",
    });
    const [personUpdated, setPersonUpdated] = useState(false);
    
    const [errors, setErrors] = useState([]);
    
    function handleChange(event) {
        setPerson({ ...person, [event.target.name]: event.target.value });
    }

    const { id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id)
            .then(res => {
                setPerson(res.data);
               
            })
    }, []);
    
    function handleSubmit(event) {
        event.preventDefault();
        //avoid sending form twice
        setPersonUpdated(false);
        // reset error message array
       setErrors([]);
    axios
      .put("http://localhost:8000/api/people/"+ id, person)
      .then((response) => {
          setPersonUpdated(true);
          navigate('/people/');
      })
      .catch((err) => {
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
  }
    return (
        <div>
        <h1>Update User</h1>
      {errors.map((errorMessage, index) => (
        <div key={index}>Error: {errorMessage}</div>
      ))}
      {personUpdated && <div>User has been successfully updated</div>}

            <PersonForm handleChange={handleChange} handleSubmit={handleSubmit} {...person} />
            <DeleteButton personId={person._id} successCallback={() => navigate('/people/')} />
        </div>
    )
}
    
export default Update;

