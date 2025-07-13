import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(id)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                setProduct(null);  // fallback
            });
    }, [id]);

    if (!product) {
        return <div style={{ padding: '30px', textAlign: 'center' }}>Product not found.</div>;
    }

    return (
        <div style={{ padding: '30px' }}>
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            {product.image && (
                <img src={product.image} alt={product.name} style={{ width: '300px' }} />
            )}
        </div>
    );
};

export default ProductDetails;
