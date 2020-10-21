import { Button, Card, DatePicker } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';

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
        <FormattedMessage id="launch-data.control.clearAll" defaultMessage="Clear ALL" />
      </Button>
      <br />
      <br />
      <Button type="primary" size="middle" onClick={() => onClickFetch()}>
        <FormattedMessage id="launch-data.control.fetch" defaultMessage="Fetch Launch Data" />
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <DatePicker picker="year" onChange={value => onSelectYear(value)} />
      <br />
      <br />
      <FormattedMessage id="launch-data.control.fetchInfo" defaultMessage="" />
    </Card>
  </>
);

export default controlPanel;
