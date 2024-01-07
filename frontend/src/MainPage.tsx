import React from 'react';
import BucketList from './BucketList';
import PublicList from './PublicList';
import Tooltip from '@mui/material/Tooltip';
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
      <Tooltip title="You can drag and drop the items to add them to your list!" arrow>
          <button className="questionButton">?</button>
        </Tooltip>
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

