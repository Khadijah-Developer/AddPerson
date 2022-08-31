// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// export default () => {
//     const [ message, setMessage ] = useState("Loading...")
//     useEffect(()=>{
//         axios.get("http://localhost:8000/api")
//             .then(res=>setMessage(res.data.message))       
//     }, []);
//     return (
//         <div>
//             <h2>Message from the backend: {message}</h2>
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
import axios from 'axios';
const Main = (props) => {
    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);
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
    //for delete
    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id != personId));
    }
    return (
        <div>
           <PersonForm/>
            <hr />
            {/* send a people useState as props */}
           {loaded && <PersonList people={people} removeFromDom={removeFromDom}/>}
        </div>
    )
}
    
export default Main;

