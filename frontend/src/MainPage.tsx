import React from 'react';
import BucketList from './BucketList';
import PublicList from './PublicList';
import './mainPage.css';

const MainPage: React.FC = () => {
  return (
    <div className="app">
      <div className="left-section-bucket">
        <div className="left-section-bucket-content">
          <BucketList />
        </div>
      </div>
      <div>
      <button className="questionButton">?</button>
      </div>
      <div className="right-section-bucket">
      <div className="right-section-bucket-content">
        <PublicList />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

