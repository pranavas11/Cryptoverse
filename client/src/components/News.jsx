import React, { useState } from 'react';
import { Typography, Row, Col, Card, Select } from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const defaultImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
    const newsCount = simplified ? 10 : 100;
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({count: newsCount});
    //console.log("the crypto news is: ", cryptoNews);

    if (!cryptoNews) return <Loader />;

    // slice the news array if simplified to show only 10 articles
    const displayedNews = simplified ? cryptoNews.slice(0, 9) : cryptoNews;

    return (
        <div>
            <Row gutter={[24, 24]}>
                {/* NEEDS TESTING */}
                {!simplified && (
                    <Col span={24}>
                        <Select showSearch
                            className='select-news'
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurency">Cryptocurrency</Option>
                            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                        </Select>
                    </Col>
                )}

                {/* cryptoNews.map(...) */}
                {displayedNews.map((news, i) => (
                    <Col xs = {24} sm={12} lg={8} key={i}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target='_blank' rel='noreferrer'>
                                <div className='news-image-container'>
                                    <Title className='news-title' level={4}>{news.title}</Title>
                                    <img src={news?.urlToImage || defaultImage} alt='news icon' />
                                </div>
                                <p>{news.description && (news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description)}</p>
                                <div className='provider-container'>
                                    <div>
                                        <Text className='provider-name'>{news.source.name}</Text>
                                    </div>
                                    <Text>{moment(news.publishedAt).fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default News;