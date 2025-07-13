import React from 'react';

function ProductTable({ products }) {
    if (products.length === 0) return <p>No products available.</p>;

    return (
        <table className="table table-striped table-bordered">
            <thead className="table-dark">
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
            </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProductTable;
