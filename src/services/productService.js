// src/services/productService.js
import axios from 'axios';

const API = 'https://product-inventory-backend-jrnq.onrender.com/api/products';


export const addProduct = (product) => axios.post(`${API}/add`, product);
export const deleteProduct = (id) => axios.delete(`${API}/delete/${id}`);
export const getCostliest = () => axios.get(`${API}/costliest`);
export const getAveragePrices = () => axios.get(`${API}/average`);
export const searchProductsByName = (name) => axios.get(`${API}/search?name=${name}`);
export const getByCategory = (category) => axios.get(`${API}/by-category?category=${category}`);

export const getProductById = async (id) => {
    const response = await fetch(`${API}/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return await response.json();
};

export const updateProduct = async (id, product) => {
    const response = await fetch(`${API}/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
};

export async function getAllProducts() {
    const response = await axios.get(API + '/');
    console.log("Fetched products:", response.data); // ✅ Add this line for debugging
    return response.data;
}

export const uploadCSV = async (formData) => {
    const response = await fetch(`${API}/upload-csv`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) throw new Error('Bulk upload failed');
};


