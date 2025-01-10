import { AreaPage } from "./AreasList"
import './products.css'

export function ProductCard({product}){
    const area =AreaPage(product.area);
    return (
        <div key={product.product_id} className="product-card">
            <h2>id: {product.product_id}</h2>
            <h3>name: {product.product_name}</h3>
            <h3>description: {product.product_description}</h3>
            <h3>price: {product.price}</h3>
            <h3>stock: {product.stock}</h3>
            <h3>area_id: {product.area}</h3>
            <h3>area_name: {area[0]}</h3>
            <hr/>
        </div>
    )
}