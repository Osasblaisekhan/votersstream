// src/App.jsx
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
    const [options] = useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        title: {
            text: 'Yearly Data',
            align: 'center'
        }
    });

    const [series] = useState([{
        name: 'series-1',
        data: [70, 40, 35, 50, 49, 60, 70, 91, 125]
    }]);

    return (
        <div>
            <h1>ApexCharts Example</h1>
            <Chart 
                options={options} 
                series={series} 
                type="bar" 
               
                height={320} 
            />
        </div>
    );
};

export default BarChart;