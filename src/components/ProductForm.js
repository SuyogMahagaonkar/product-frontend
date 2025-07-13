import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, uploadCSV, getProductById } from '../services/productService';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        imageUrl: '',
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [csvFile, setCsvFile] = useState(null);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            getProductById(id)
                .then((data) => {
                    setFormData(data);
                    setPreviewUrl(data.imageUrl || '');
                })
                .catch(() => setError('Product not found'));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'imageUrl') {
            setPreviewUrl(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEdit) {
                await updateProduct(id, formData);
                setSuccess('Product updated successfully');
            } else {
                await addProduct(formData);
                setSuccess('Product added successfully');
                setFormData({ name: '', category: '', price: '', imageUrl: '' });
                setPreviewUrl('');
            }
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            setError('Failed to submit product');
        }
    };

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleBulkUpload = async () => {
        setError('');
        setSuccess('');
        if (!csvFile) {
            setError('Please select a CSV file');
            return;
        }

        const formData = new FormData();
        formData.append('file', csvFile);

        try {
            await uploadCSV(formData);
            setSuccess('CSV uploaded successfully');
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            setError('Bulk upload failed');
        }
    };

    return (
        <Container className="mt-4">
            <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="category" className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="price" className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="imageUrl" className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {previewUrl && (
                            <Card className="mb-3" style={{ maxWidth: '200px' }}>
                                <Card.Img variant="top" src={previewUrl} alt="Preview" onError={() => setPreviewUrl('')} />
                            </Card>
                        )}

                        <Button variant="primary" type="submit" className="me-2">
                            {isEdit ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="csvUpload" className="mb-3">
                            <Form.Label><strong>Bulk Upload via CSV</strong></Form.Label>
                            <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
                            <Button variant="secondary" className="mt-2" onClick={handleBulkUpload}>
                                Upload CSV
                            </Button>
                        </Form.Group>

                        <p className="text-muted">CSV Format: name,category,price,imageUrl</p>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default ProductForm;
