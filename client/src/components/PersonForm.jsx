import React, { useState } from 'react'

const PersonForm = (props) => {
   
    const { firstName, lastName,handleChange ,handleSubmit} = props;

    return (
        <div>

        <form onSubmit={handleSubmit}>
            <p>
                <label className='text-primary h5'>First Name</label><br />
                <input type="text" name='firstName' className='' value={firstName} onChange={handleChange} />

            </p>
            <p>
                <label className='text-primary h5'>Last Name</label><br />
                <input type="text" name='lastName' onChange={handleChange} value={lastName}/>
            </p>
            <input type="submit" className='btn btn-dark'/>
            </form>
            <br />

        </div>
    )
}

export default PersonForm;