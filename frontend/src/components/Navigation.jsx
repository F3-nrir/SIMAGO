import { Link } from "react-router-dom";
import './Navigation.css'; // Asegúrate de importar el archivo CSS

export function Navigation() {
   return (
      <>
         <br />
         <div className="navigation">
            <Link to="http://localhost:8000/admin">Login</Link>
            <Link to="/inventory/">Inventario General</Link>
            <Link to="/inventory/product/create/">Crear Producto</Link>
            <Link to="/inventory/product/update/">Actualizar Producto</Link>
            <Link to="/inventory/area/">Registro de Areas</Link>
            <Link to="/inventory/area/create/">Crear Area</Link>
            <Link to="/sales/">Ventas</Link>
            <Link to="/records/">Reportes</Link>
            <Link to="/dashboard/">Dashboard</Link>
         </div>
      </>
   )
}