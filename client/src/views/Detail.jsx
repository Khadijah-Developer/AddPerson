import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { Paper } from '@material-ui/core';
    
const Detail = (props) => {
    const [person, setPerson] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/people/'+id)
            .then(res => setPerson(res.data))
            .catch(err => console.error(err));
    }, []);
    
    return (
        <div className="container mt-5 p-5">
            
            <Paper elevation={6} >
            <div className="p-5">
                    
            <p><span className='text-danger h6'>First Name:</span> {person.firstName}</p>
            <p><span className='text-danger h6'>Last Name:</span>  {person.lastName}</p>
                
            <Link to={"/people/" + person._id + "/edit"} className="btn btn-info">
                                 Edit     </Link>
            </div>
            </Paper>
        </div>
    )
}
    
export default Detail;

