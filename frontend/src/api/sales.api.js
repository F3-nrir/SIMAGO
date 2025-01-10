import axios from "axios";

export const getAllRecAreas = () => {
    return axios.get("http://localhost:8000/record-areas/");
};

export const getRecArea = (area_id) => {
    return axios.get(`http://localhost:8000/record-areas/${recArea_id}/`);
};

export const createRecArea = (recArea) => {
    return axios.post("http://localhost:8000/record-areas/", recArea);
};

export const getAllRecProducts = () => {
    return axios.get("http://localhost:8000/record-products/");
};

export const getRecProduct = (recProduct_id) => {
    return axios.get(`http://localhost:8000/record-products/${recProduct_id}/`);
};

export const createRecProduct = (recProduct) => {
    return axios.post("http://localhost:8000/record-products/", recProduct);
}

export const getAllRecRegister = () => {
    return axios.get("http://localhost:8000/record-registers/");
}

export const getRecRegister = (recRegister_id) => {
    return axios.get(`http://localhost:8000/record-registers/${recRegister_id}/`);
}

export const createRecRegister = (recRegister) => {
    return axios.post("http://localhost:8000/record-registers/", recRegister);
}

export const getAllRegisters = () => {
    return axios.get("http://localhost:8000/registers/");
}

export const getRegister = (register_id) => {
    return axios.get(`http://localhost:8000/registers/${register_id}/`);
}

export const createRegister = (register) => {
    return axios.post("http://localhost:8000/registers/", register);
}

export const updateRegister = (register) => {
    return axios.patch(`http://localhost:8000/registers/${register.register_id}/`, register);
}

export const getAllFactures = () => {
    return axios.get("http://localhost:8000/sales/");
}

export const getFacture = (facture_id) => {
    return axios.get(`http://localhost:8000/sales/${facture_id}/`);
}

export const createFacture = (facture) => {
    return axios.post("http://localhost:8000/sales/", facture);
}