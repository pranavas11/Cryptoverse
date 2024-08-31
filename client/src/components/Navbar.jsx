import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Typography, Avatar } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize < 800) setActiveMenu(false);
        else setActiveMenu(true);
    }, [screenSize])

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size="large" />
                <Typography.Title level={1} className='logo'>
                    <Link to="/" className='app-name'>Cryptoverse</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>

            {activeMenu && (
                <Menu theme='dark'>
                    <Menu.Item icon={<HomeOutlined className="menu-icon" />}>
                        <Link to="/" className="menu-link">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined className="menu-icon" />}>
                        <Link to="/cryptocurrencies" className="menu-link">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined className="menu-icon" />}>
                        <Link to="/exchanges" className="menu-link">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined className="menu-icon" />}>
                        <Link to="/news" className="menu-link">News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    );
}

export default Navbar;