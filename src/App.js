// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
import ProductStats from './components/ProductStats';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from './components/Breadcrumbs';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                    <Link className="navbar-brand" to="/">Product Inventory</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/add">Add Product</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/stats">Statistics</Link></li>
                        </ul>
                    </div>
                </nav>

                {/* ✅ Breadcrumbs */}
                <Breadcrumbs />

                <ToastContainer position="top-center" />

                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add" element={<ProductForm />} />
                    <Route path="/details/:id" element={<ProductDetails />} />
                    <Route path="/stats" element={<ProductStats />} />
                    <Route path="/edit/:id" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
