import { getAllAreas, getArea, deleteArea } from "../api/inventory.api";
import { useEffect, useState } from "react";
import './areasCard.css'

export function AreaCardio({ area }) {

    let removeArea = () => {
        DeleteArea(area.area_id);
    }

    return (
        <>
        <br /><br />
        <div key={area.area_id} className="area-card">
            <h2>id: {area.area_id}</h2>
            <hr />
            <h3>name: {area.area_name}</h3>
            <h3>description: {area.area_description}</h3>
            <hr />
            <button onClick={removeArea}>Eliminar</button>
        </div>
        </>
    );
}

export const DeleteArea = async (area_id) => {
    try {
        const confirmation = window.confirm("¿Estás seguro de que quieres eliminar esta area? Esta operación no se puede deshacer.");
        if (confirmation) {
            deleteArea(area_id);
            window.location.reload();
            console.log("Area eliminada:", area_id);
        } else {
            console.log("Operación de eliminación cancelada.");
        }
    } catch (error) {
        console.error("Error al eliminar el area:", error);
    }
}

export function AreasPage() {
    const [areas, setAreas] = useState([]);
    useEffect(() => {
        async function loadAreas() {
            const res = await getAllAreas();
            setAreas(res.data);
        }
        loadAreas();
    }, []);

    return <div>
        {areas.map(area => (
            <AreaCardio key={area.area_id} area={area} /> 
        ))}
    </div>
}

export function AreaPage(area_id) {
    const [area, setArea] = useState({});
    useEffect(() => {
        async function loadArea() {
            const res = await getArea(area_id);
            setArea(res.data);
        }
        loadArea();
    }, []);

    return [area.area_name, area.area_description]
}

export function AreasID() {
    const [areas, setAreas] = useState([]);
    useEffect(() => {
      async function loadAreas() {
        const res = await getAllAreas();
        setAreas(res.data);
      }
      loadAreas();  
    }, []);
    return (
        <select>
            <option value="">Selecciona un área</option>
            {areas.map(area => (
                <option key={area.area_id} value={area.area_id} label={area.area_name}/> 
            ))}
        </select>
    )
}

export function AreaName(area_name) {
    const [areas, setArea] = useState([]);
    useEffect(() => {
        async function loadArea() {
            const res = await getAllAreas()
            setArea(res.data.find(area => area.area_name.toLowerCase()===area_name.toLowerCase()));
        }
        loadArea();
    }, []);

    return areas.area_id;
}

export function AreaID({ onAreaChange }) {
    const [areas, setAreas] = useState([]);
    useEffect(() => {
      async function loadAreas() {
        const res = await getAllAreas();
        setAreas(res.data);
      }
      loadAreas();  
    }, []);

    const handleChange = (event) => {
      onAreaChange(event.target.value);
    }

    return (
      <select onChange={handleChange}>
        <option value="">Selecciona un área</option> {/* Agrega esta línea */}
        {areas.map(area => (
            <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
        ))}
      </select>
    )
}
