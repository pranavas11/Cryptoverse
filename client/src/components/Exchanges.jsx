import React from 'react';
import millify from 'millify';
import { Row, Col } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoExchangesAPI';
import Loader from './Loader';

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    console.log(data);
    console.log(data?.['5'].country);

    if (isFetching) return <Loader />;

    // convert the object to an array of values
    const exchangesArray = Object.values(data);

    return (
        <div className="exchanges-container">
            <h1>Exchanges</h1> <br />
            <Row className="table-header">
                <Col span={2}>#</Col>
                <Col span={5}>Name</Col>
                <Col span={5}>Volume (USD)</Col>
                <Col span={6}>URL</Col>
                <Col span={5}>Country</Col>
            </Row>

            {exchangesArray?.map((exchange, index) => (
                <Row key={exchange.id} className="table-row" style={{ marginTop: '10px' }}>
                    <Col span={2}>{index + 1}</Col>
                    <Col span={5}>{exchange.name}</Col>
                    <Col span={5}>{millify(exchange.volume_usd)}</Col>
                    <Col span={6}>
                        <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                            {exchange.url}
                        </a>
                    </Col>
                    <Col span={5}>{exchange.country ? exchange.country : '-'}</Col>
                </Row>
            ))}
        </div>
    );
}

export default Exchanges;