import React from 'react';
import { Spin } from 'antd';

const Loader = () => (
  <div className="loader">
    {/* return a spinner  for "loading" state */}
    <Spin />
  </div>
);

export default Loader;