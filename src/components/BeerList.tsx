import React from 'react';

const BeerList: React.FC = () => {
  return (
    <div>
      <h2>Your Beer List</h2>
      <ul>
        {/* Later we'll dynamically render beers here */}
        <li>Sample Beer 1</li>
        <li>Sample Beer 2</li>
      </ul>
    </div>
  );
};

export default BeerList;
