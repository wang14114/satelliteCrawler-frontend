import { Button, Card, DatePicker } from 'antd';
import React from 'react';

const controlPanel = ({
  onClickClearAll,
  onClickFetch,
  onSelectYear,
}: {
  onClickClearAll: any;
  onClickFetch: any;
  onSelectYear: any;
}) => (
  <>
    <Card
      bordered={false}
      style={{
        height: '100%',
      }}
    >
      <Button type="primary" size="middle" onClick={() => onClickClearAll()}>
        Clear All
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" size="middle" onClick={() => onClickFetch()}>
        Fetch Launch Data
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <DatePicker picker="year" onChange={value => onSelectYear(value)} /> (If you don't select
      year, will fetch all the data)
    </Card>
  </>
);

export default controlPanel;
