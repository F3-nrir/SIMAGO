import { AreasID, AreaID } from "../components/AreasList";
import  { React, useState, useEffect } from 'react';
import { ProductPage, ProductsID} from "../components/ProductsList";
import {getProduct, createProduct, updateProduct, getAllProducts} from "../api/inventory.api";
import './estilos.css'


export function ProductCreateFormPage() {
  const [product, setProduct] = useState({});

  const handleInputChange = (event) => {
      setProduct({
          ...product,
          [event.target.name]: event.target.value
      });
  }

  const handleAreaChange = (area) => {
    setProduct({
      ...product,
      area
    });
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      await createProduct(product);
      window.location.reload();
  }

  return (
    <>
    <br /><br />
      <div className="create-form">
          <form onSubmit={handleSubmit}>
              <input type="text" name="product_name" placeholder="Name" onChange={handleInputChange}/>
              <textarea rows="4" name="product_description" placeholder="Description" onChange={handleInputChange}/>
              <input required type="number" name="price" placeholder="Price" onChange={handleInputChange}/>
              <input required type="text" name="weight" placeholder="Weight" onChange={handleInputChange}/>
              <input required type="number" name="stock" placeholder="Stock" onChange={handleInputChange}/>
              <AreaID onAreaChange={handleAreaChange} />
              <button type="submit">Save</button>
          </form>
      </div>
    </>
  )
}

export function ProductUpdateFormPage() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
      async function loadProducts() {
          const res = await getAllProducts();
          setProducts(res.data);
      }
      loadProducts();
  }, []);

  const handleProductChange = (product_id) => {
    const selectedProduct = products.find(product => product.product_id === product_id);
    setProduct(selectedProduct);
    window.location.reload();
  }

  const handleInputChange = (event) => {
      setProduct({
          ...product,
          [event.target.name]: event.target.value
      });
  }

  const handleAreaChange = (area) => {
    setProduct({
      ...product,
      area
    });
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      await updateProduct(product);
  }

  return (
    <>
    <br /><br />
      <div className="create-form">
          <form onSubmit={handleSubmit}>
              <ProductsID onProductChange={handleProductChange} />
              <textarea rows="4" name="product_description" placeholder="Description" onChange={handleInputChange} value={product?.product_description}/>
              <input type="number" name="price" placeholder="Price" onChange={handleInputChange} value={product?.price}/>
              <input type="text" name="weight" placeholder="Weight" onChange={handleInputChange} value={product?.weight}/>
              <input type="number" name="stock" placeholder="Stock" onChange={handleInputChange} value={product?.stock}/>
              <AreaID onAreaChange={handleAreaChange} />
              <button type="submit">Actualizar</button>
          </form>
      </div>
      </>
  )
}