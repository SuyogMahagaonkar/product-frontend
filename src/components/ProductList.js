import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../services/productService';
import { Table, Button, Image, Form, Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            fetchProducts();
        }
    };

    const handleSort = (key) => {
        setSortCriteria((prev) => {
            const existing = prev.find((c) => c.key === key);
            if (!existing) return [...prev, { key, order: 'asc' }];
            if (existing.order === 'asc') {
                return prev.map((c) => (c.key === key ? { ...c, order: 'desc' } : c));
            } else {
                return prev.filter((c) => c.key !== key); // remove sorting
            }
        });
    };

    const getSortArrow = (key) => {
        const criteria = sortCriteria.find((c) => c.key === key);
        if (!criteria) return '';
        return criteria.order === 'asc' ? '↑' : '↓';
    };

    const sortedProducts = [...products]
        .filter((p) => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            return (
                p.name.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term) ||
                p.price.toString().includes(term)
            );
        })
        .sort((a, b) => {
            for (const { key, order } of sortCriteria) {
                const aVal = a[key]?.toString().toLowerCase();
                const bVal = b[key]?.toString().toLowerCase();
                if (aVal < bVal) return order === 'asc' ? -1 : 1;
                if (aVal > bVal) return order === 'asc' ? 1 : -1;
            }
            return 0;
        });

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Products</h3>

            <Row className="mb-3">
                <Col md={8}></Col>
                <Col md={4}>
                    <Form.Control
                        placeholder="Search by name, category or price"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </Col>
            </Row>

            <Table striped bordered hover responsive className="align-middle">
                <thead className="table-dark">
                <tr>
                    <th>Image</th>
                    <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                        Name {getSortArrow('name')}
                    </th>
                    <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                        Category {getSortArrow('category')}
                    </th>
                    <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                        Price {getSortArrow('price')}
                    </th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedProducts.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center text-danger">No products found</td>
                    </tr>
                ) : (
                    paginatedProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="text-center">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    rounded
                                    style={{ objectFit: 'cover' }}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td className="text-center">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => navigate(`/edit/${product.id}`)}
                                >
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <Pagination>
                    {[...Array(totalPages)].map((_, i) => (
                        <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}
        </div>
    );
};

export default ProductList;
