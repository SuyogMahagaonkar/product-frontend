// src/components/ProductStats.js
import React, { useEffect, useState } from 'react';
import { getCostliest, getAveragePrices } from '../services/productService';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ProductStats = () => {
    const [costliest, setCostliest] = useState('');
    const [averages, setAverages] = useState({});

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res1 = await getCostliest();
            setCostliest(res1.data);

            const res2 = await getAveragePrices();
            setAverages(res2.data);
        } catch (err) {
            toast.error('Failed to fetch statistics');
        }
    };

    const categoryLabels = Object.keys(averages);
    const averagePrices = Object.values(averages);

    const pieData = {
        labels: categoryLabels,
        datasets: [
            {
                data: averagePrices,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9CCC65'],
            },
        ],
    };

    const barData = {
        labels: categoryLabels,
        datasets: [
            {
                label: 'Average Price',
                data: averagePrices,
                backgroundColor: '#42a5f5',
            },
        ],
    };

    return (
        <div className="container mt-4">
            <h2>Product Statistics</h2>
            <div className="mb-3">
                <strong>Costliest Product:</strong> {costliest}
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h5>Average Price by Category (Pie)</h5>
                    <Pie data={pieData} />
                </div>
                <div className="col-md-6">
                    <h5>Average Price by Category (Bar)</h5>
                    <Bar data={barData} />
                </div>
            </div>
        </div>
    );
};

export default ProductStats;
