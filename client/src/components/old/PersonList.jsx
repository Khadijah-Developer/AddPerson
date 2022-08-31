import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
    
const PersonList = (props) => {
    //for delete
    const { removeFromDom } = props;
    const deletePerson = (personId) => {
    axios.delete('http://localhost:8000/api/people/' + personId)
        .then(res => {
            removeFromDom(personId)
        })
        .catch(err => console.error(err));
    }
    
    return (
        <div>
            {props.people.map((person, idx) => {
                return <p key={idx}>
                    <Link to={"" + person._id}>
                        {person.lastName}, {person.firstName}
                    </Link>
                    |
                    <button onClick={(e)=>{deletePerson(person._id)}}>
                        Delete
                    </button>
                </p>
            })}
            {/* {props.people.map( (person, i) =>
                <p key={i}> {person._id} - {person.firstName}, {person.lastName}</p>
            )} */}
        </div>
    )
}
    
export default PersonList;