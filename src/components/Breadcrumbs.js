// src/components/Breadcrumbs.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

const routeLabelMap = {
    add: 'Add Product',
    edit: 'Edit Product',
    stats: 'Statistics',
    details: 'Product Details'
};

const Breadcrumbs = () => {
    const location = useLocation();

    // ⛔ Don't show breadcrumbs on homepage
    if (location.pathname === '/' || location.pathname === '') {
        return null;
    }

    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="container mt-3">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
                {pathnames.map((value, index) => {
                    const to = '/' + pathnames.slice(0, index + 1).join('/');
                    const isLast = index === pathnames.length - 1;

                    let label = routeLabelMap[value] || value;
                    if (!isNaN(value)) label = 'Details';

                    return isLast ? (
                        <Breadcrumb.Item active key={to}>{label}</Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>{label}</Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        </div>
    );
};

export default Breadcrumbs;
