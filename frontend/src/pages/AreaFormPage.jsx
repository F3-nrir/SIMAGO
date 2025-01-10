import  { React, useState, useEffect } from 'react';
import { createArea } from '../api/inventory.api';
import './estilos.css'

export function AreaFormPage() {
  const [area, setArea] = useState({});
  const handleInputChange = (event) => {
      setArea({
          ...area,
          [event.target.name]: event.target.value
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createArea(area);
    window.location.reload();
}

  return (
    <>
    <br /><br />
    <div className="create-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="area_name" placeholder="Name" onChange={handleInputChange}/>
        <textarea rows="4" name="area_description" placeholder="Description" onChange={handleInputChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
    </>
  )
}