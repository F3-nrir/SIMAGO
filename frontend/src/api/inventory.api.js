import axios from 'axios'

export const getAllProducts = () => {
    return axios.get('http://localhost:8000/products/')
}

export const getProduct = (product_id) => {
    return axios.get(`http://localhost:8000/products/${product_id}/`)
}

export const createProduct = (product) => {
    return axios.post('http://localhost:8000/products/', product)
}

export const updateProduct = (product) => {
    return axios.patch(`http://localhost:8000/products/${product.product_id}/`, product);
}

export const deleteProduct = (product_id) => {
    return axios.delete(`http://localhost:8000/products/${product_id}/`);
}

export const getAllAreas = () => {
    return axios.get('http://localhost:8000/areas/')
}

export const getArea = (area_id) => {
    return axios.get(`http://localhost:8000/areas/${area_id}/`)
}

export const createArea = (area) => {
    return axios.post('http://localhost:8000/areas/', area)
}

export const deleteArea = (area_id) => {
    return axios.delete(`http://localhost:8000/areas/${area_id}/`);
}