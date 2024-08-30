import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';
import { current } from '@reduxjs/toolkit';

const Cryptocurrencies = ({ simplified }) => {
    const cryptoCount = simplified ? 10 : 100;
    const {data : cryptosList, isFetching} = useGetCryptosQuery(cryptoCount);
    const [cryptos, setCryptos] = useState(); //useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <div>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptos...' onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
                </div>
            )}
            
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" alt="cryptocoin-logo" src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Bitcoin Price: {currency.btcPrice} BTC</p>
                                <p>USD Price: ${millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Cryptocurrencies;