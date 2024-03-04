import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="136" r="128" />
    <rect x="0" y="272" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="333" rx="10" ry="10" width="280" height="88" />
    <rect x="1" y="454" rx="10" ry="10" width="95" height="30" />
    <rect x="124" y="442" rx="21" ry="21" width="152" height="45" />
  </ContentLoader>
);

export default Sceleton;
