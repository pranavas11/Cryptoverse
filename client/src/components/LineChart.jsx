import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend } from "chart.js";
import { Typography, Row, Col } from "antd";

// register the required components for Chart.js
ChartJS.register(
    CategoryScale,   // x-axis for catogories
    LinearScale,     // y-axis for linear data
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend,
);

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    console.log("the coin history is: ", coinHistory);
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory?.data?.history[i].price);
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                time: {
                    unit: 'day', // Adjust the unit as needed based on time periods
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },

            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Price (in USD)',
                },
            },
        },
    };

    return (
        <div>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart</Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}%</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;