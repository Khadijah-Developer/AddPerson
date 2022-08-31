import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
    
const Detail = (props) => {
    const [person, setPerson] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/people/'+id)
            .then(res => setPerson(res.data))
            .catch(err => console.error(err));
    }, []);
    
    return (
        <div>
            <Link to={"/people/" + person._id + "/edit"}>
                                 Edit     </Link>

            <p>First Name: {person.firstName}</p>
            <p>Last Name: {person.lastName}</p>
        </div>
    )
}
    
export default Detail;

