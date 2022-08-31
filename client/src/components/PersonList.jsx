import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
    
const PersonList = (props) => {
    const [people, setPeople] = useState([]);
        useEffect(() => {
        axios.get('http://localhost:8000/api/people/')
            .then(res => setPeople(res.data));
    }, [])
    //for delete
    // const { removeFromDom } = props;

    // const deletePerson = (personId) => {
    // axios.delete('http://localhost:8000/api/people/' + personId)
    //     .then(res => {
    //         removeFromDom(personId)
    //     })
    //     .catch(err => console.error(err));
    // }

    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id != personId))
    }
    
    
    return (
        <div className='container'>
            {people.map((person, idx) => (
                 <div key={idx} className="d-flex flex-wrap justify-content-sm-center border" >
                    <div className="w-25 m-2">
                       
                        <Link to={"" + person._id} >
                           <h4 className="m-1">
                                {person.firstName}, {person.lastName}
                                </h4>
                    </Link>
                      
                    </div>
                    
                    <div className="d-flex justify-content-evenly m-2 w-25">
                        <Link to={"" + person._id + "/edit"} >
                            <h4 className="btn btn-info m-1">
                                  Edit
                            </h4>
                          
                        </Link> 
                 
                         <DeleteButton personId={person._id} successCallback={()=>removeFromDom(person._id)}/>
                      </div>
                    {/* <button onClick={(e)=>{deletePerson(person._id)}}>
                        Delete
                    </button> */}
                </div>
            ))}
            {/* {props.people.map( (person, i) =>
                <p key={i}> {person._id} - {person.firstName}, {person.lastName}</p>
            )} */}
        </div>
    )
}
    
export default PersonList;