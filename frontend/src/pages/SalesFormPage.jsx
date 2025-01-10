import React, { useState, useEffect } from 'react';
import './sales.css'
import axios from 'axios';

export const SalesFormPage = () => {
    const [products, setProducts] = useState([]);
    const [registers, setRegisters] = useState([]);
    const [selectedRegister, setSelectedRegister] = useState(null);
    const [facture, setFacture] = useState({ total: 0, cant: 0, register: null, products: [] });

    useEffect(() => {
        const fetchProductsAndRegisters = async () => {
            const productsResponse = await axios.get('http://localhost:8000/products/');
            const registersResponse = await axios.get("http://localhost:8000/registers/");
            setProducts(productsResponse.data);
            setRegisters(registersResponse.data);
        };
        fetchProductsAndRegisters();
    }, []);

    const handleAddProduct = async (product) => {
        if (product.stock > 0) {
            setFacture(prevFacture => {
                const existingProduct = prevFacture.products.find(p => p.product_id === product.product_id);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    product.quantity = 1;
                    prevFacture.products.push(product);
                }
                return {
                    ...prevFacture,
                    total: prevFacture.total + product.price,
                    cant: prevFacture.cant + 1
                };
            });
            product.stock -= 1;
            await axios.put(`http://localhost:8000/products/${product.product_id}/`, product);
        } else {
            alert('Stock insuficiente');
        }
    };

    const handleRemoveProduct = async (product) => {
        setFacture(prevFacture => {
            const existingProduct = prevFacture.products.find(p => p.product_id === product.product_id);
            if (existingProduct && existingProduct.quantity > 0) {
                existingProduct.quantity -= 1;
                if (existingProduct.quantity <= 0) {
                    const updatedProducts = prevFacture.products.filter(p => p.product_id !== product.product_id);
                    prevFacture.products = updatedProducts;
                }
                return {
                    ...prevFacture,
                    total: prevFacture.total - product.price,
                    cant: prevFacture.cant - 1
                };
            } else {
                alert('El producto no está en la factura');
                return prevFacture;
            }
        });
        if (product.stock > 0) {
            product.stock += 1;
            await axios.put(`http://localhost:8000/products/${product.product_id}/`, product);
        }
    };    

    const handleRegisterChange = (event) => {
        setSelectedRegister(event.target.value);
    };

    const handleCreateFacture = async () => {
        if (selectedRegister) {
            const newFacture = { ...facture, register: selectedRegister };
            const response = await axios.post("http://localhost:8000/sales/", newFacture);
            const factureId = response.data.facture_id;

            // Crear la relación entre Facturas y Productos
            for (let product of facture.products) {
                if (product.quantity > 0) {
                    let a = await axios.post("http://localhost:8000/facture-products/", {
                        facture: factureId,
                        product: product.product_id,
                        quantity: product.quantity/2
                    });
                }
            }
            async function getRecArea(area_id, recArea_date) {
                const response = await axios.get('http://localhost:8000/record-areas/');
                const data = response.data;
                const recArea = data.filter(item => item.area_id === area_id && new Date(item.recArea_date).toDateString() === new Date(recArea_date).toDateString());
                if (recArea.length !== 0) {
                    return recArea[0];
                } else {
                    return "empty";
                }
            }
            
            async function getRecProd(product_id, recProduct_date) {
                const response = await axios.get('http://localhost:8000/record-products/');
                const data = response.data;
                const recProduct = data.filter(item => item.product_id === product_id && new Date(item.recProduct_date).toDateString() === new Date(recProduct_date).toDateString());
                if (recProduct.length !== 0) {
                    return recProduct[0];
                } else {
                    return "empty";
                }
            }
            
            async function getRecReg(register_id, recRegister_date) {
                const response = await axios.get('http://localhost:8000/record-registers/');
                const data = response.data;
                const recRegister = data.filter(item => item.register_id == register_id && item.recRegister_date == recRegister_date);
                if (recRegister.length > 0) {
                    return recRegister[0];
                } else {
                    return "empty"
                }
            }
                let fechaActual = new Date().toISOString().substring(0, 10);

                let processProduct = async (product) => {
                    let date = fechaActual;
                    let quantity = product.quantity / 2;
                    let price = product.price;
                    let area = product.area;
                    let product_name = product.product_name;
                    let product_id = product.product_id;
                    let money = price * quantity;
                    if (product.quantity > 0){
                        let recProd = await getRecProd(product_id, date);
                        let recArea = await getRecArea(area, date)
                        let recReg = await getRecReg(selectedRegister, date)
                        if (recProd !== "empty"){
                            await axios.patch(`http://localhost:8000/record-products/${recProd.recProduct_id}/`,{
                                recProduct_id: recProd.recProduct_id,
                                Cant_product: quantity + recProd.Cant_product,
                                productTotal_price: money + recProd.productTotal_price,});}else{
                            await axios.post("http://localhost:8000/record-products/", {
                                Cant_product: quantity,
                                productTotal_price: money,
                                product_id: product_id,
                                product_name: product_name});}
                        if (recArea !== "empty"){
                            await axios.patch(`http://localhost:8000/record-areas/${recArea.recArea_id}/`,{
                                recArea_id: recArea.recArea_id,
                                cant_area: quantity + recArea.cant_area,
                                areaTotal_price: money + recArea.areaTotal_price,});}else{
                            await axios.post("http://localhost:8000/record-areas/",{
                                cant_area: quantity,
                                areaTotal_price: money,
                                area_id: area,});}
                        if (recReg !== "empty"){
                            await axios.patch(`http://localhost:8000/record-registers/${recReg.recRegister_id}/`,{
                                recRegister_id: recReg.recRegister_id,
                                cant_register: quantity + recReg.cant_register,
                                registerTotal_price: money + recReg.registerTotal_price,});}else{
                            await axios.post("http://localhost:8000/record-registers/",{
                                cant_register: quantity,
                                registerTotal_price: money,
                                register_id: selectedRegister});}}};
                
                for (let product of facture.products) {
                    try {
                        await processProduct(product);
                        console.log('El producto ha sido procesado');
                    } catch (error) {
                        console.error('Hubo un error al procesar el producto:', error);
                    }
                }                

            setFacture({ total: 0, cant: 0, register: null, products: [] });
            alert('Factura creada con éxito');
        } else {
            alert('Por favor, selecciona un registro');
        }
    };

    return (
        <div>
        <br/><br/>
            <table className="products-table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Area</th>
                    <th>Acciones</th>
                    </tr>
                    </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.area}</td>
                            <td>
                                <button onClick={() => handleAddProduct(product)}>Añadir a factura</button>
                                <button onClick={() => handleRemoveProduct(product)}>Quitar de factura</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='facture'>
                <h2 className='facture-p'>Factura</h2>
                <select value={selectedRegister} onChange={handleRegisterChange} className='facture-p'>
                <option value="">Selecciona una caja</option>
                    {registers.map(register => (
                        <option key={register.register_id} value={register.register_id}>Caja {register.register_id}</option>
                    ))}
                </select>
                <p className='facture-p'>Total: {facture.total}</p>
                <p className='facture-p'>Cantidad: {facture.cant}</p>
                <button onClick={handleCreateFacture} className='facture-p'>Crear factura</button>
            </div>
        </div>
    );
};
