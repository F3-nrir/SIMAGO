import { getAllProducts, getProduct, updateProduct, deleteProduct } from "../api/inventory.api";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { AreaPage } from "./AreasList"
import './products.css'

export const DeleteProduct = async (product_id) => {
    try {
        const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este producto? Esta operación no se puede deshacer.");
        if (confirmation) {
            deleteProduct(product_id);
            window.location.reload();
            console.log("Producto eliminado:", product_id);
        } else {
            console.log("Operación de eliminación cancelada.");
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}

export const IncreaseStock = async (product) => {
    try {
        // Obtener el producto actualizado con el stock incrementado
        const updatedProduct = { ...product, stock: product.stock + 1 };
        await updateProduct(updatedProduct);
        window.location.reload();
        // Aquí puedes actualizar el estado local o realizar otras acciones necesarias
        console.log("Stock aumentado en 1:", updatedProduct);
    } catch (error) {
        console.error("Error al aumentar el stock:", error);
    }
};

// Función para reducir el stock en 1
export const DecreaseStock = async (product) => {
    try {
        // Verificar que el stock no sea negativo antes de reducirlo
        if (product.stock > 0) {
            // Obtener el producto actualizado con el stock reducido
            const updatedProduct = { ...product, stock: product.stock - 1 };
            await updateProduct(updatedProduct);
            window.location.reload();
            // Aquí puedes actualizar el estado local o realizar otras acciones necesarias
            console.log("Stock reducido en 1:", updatedProduct);
        } else {
            console.warn("El stock ya es 0. No se puede reducir más.");
        }
    } catch (error) {
        console.error("Error al reducir el stock:", error);
    }
}

export function ProductoCard({ product }) {
    const area = AreaPage(product.area);

    // Función para aumentar el stock en 1
    let increaseStock = () => {
        increaseStock=IncreaseStock(product)
    }

    // Función para reducir el stock en 1
    let decreaseStock = () => {
        decreaseStock=DecreaseStock(product)
    }

    let removeProduct = () => {
        DeleteProduct(product.product_id);
    }

    return (
        <>
        <br/><br/>
        <div key={product.product_id} className="product-card">
            <h2>id: {product.product_id}</h2>
            <hr />
            <h3>name: {product.product_name}</h3>
            <h3>description: {product.product_description}</h3>
            <h3>price: {product.price}</h3>
            <h3>stock: {product.stock}</h3>
            <h3>area_id: {product.area}</h3>
            <h3>area_name: {area[0]}</h3>
            <hr />
            <button onClick={removeProduct}>Eliminar</button>
            <button onClick={increaseStock}>+</button>
            <button onClick={decreaseStock}>-</button>
        </div>
        </>
    );
}


export function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const res = await getAllProducts();
            setProducts(res.data);
        }
        loadProducts();
    }, []);

    return (
        <div>
            {products.map(product => (
                <ProductoCard key={product.product_id} product={product} />
            ))}
        </div>
    );
}


export function ProductPage(product_name) {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        async function loadProduct() {
            const res = await getAllProducts()
            setProduct(res.data.find(product => product.product_name.toLowerCase()===product_name.toLowerCase()));
        }
        loadProduct();
    }, []);

    return (
        <div>
            <ProductCard key={products.product_id} product={products} />
        </div>
    )
}

export function ProductsID({ onProductChange }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      async function loadProducts() {
        const res = await getAllProducts(); // Asegúrate de tener una función que obtenga todos los productos
        setProducts(res.data);
      }
      loadProducts();  
    }, []);

    const handleChange = (event) => {
      onProductChange(event.target.value);
    }

    return (
      <select onChange={handleChange}>
        <option value="">Selecciona un producto</option>
        {products.map(product => (
            <option key={product.product_id} value={product.product_id}>{product.product_name}</option>
        ))}
      </select>
    )
}

