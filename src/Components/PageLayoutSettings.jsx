import React, { useState } from 'react';

function PageLayoutSettings({ onSettingsChange }) {
  const [pageSize, setPageSize] = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [margin, setMargin] = useState(20);

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    onSettingsChange({ pageSize: e.target.value, orientation, margin });
  };

  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
    onSettingsChange({ pageSize, orientation: e.target.value, margin });
  };

  const handleMarginChange = (e) => {
    setMargin(e.target.value);
    onSettingsChange({ pageSize, orientation, margin: e.target.value });
  };

  return (
    <div className='mt-10'>
     <div className='page-labels my-5'>
     <label>
        Page Size:
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value="A4">A4</option>
          <option value="Letter">Letter</option>
          <option value="Legal">Legal</option>
        </select>
      </label>
      <label>
        Orientation:
        <select value={orientation} onChange={handleOrientationChange}>
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </label>
      <label>
        Margin (px):
        <input type="number" value={margin} onChange={handleMarginChange} />
      </label>
     </div>
    </div>
  );
}

export default PageLayoutSettings;
