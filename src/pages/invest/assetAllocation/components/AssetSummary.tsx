import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const AssetSummary = ({
  dropdownGroup,
  channel,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  channel: 'all'|'china' | 'usa' | 'hongkong' | 'other';
  salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="invest-assetallocation.summary.title"
        defaultMessage="Summary"
      />
    }
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={channel} onChange={handleChangeSalesType}>
          <Radio.Button value="all">
              <FormattedMessage id="invest-assetallocation.summary.channel.all" defaultMessage="All" />
            </Radio.Button>
            <Radio.Button value="china">
              <FormattedMessage id="invest-assetallocation.summary.channel.china" defaultMessage="China" />
            </Radio.Button>
            <Radio.Button value="usa">
              <FormattedMessage id="invest-assetallocation.summary.channel.usa" defaultMessage="USA" />
            </Radio.Button>
            <Radio.Button value="hongkong">
              <FormattedMessage id="invest-assetallocation.summary.channel.hongkong" defaultMessage="Hong Kong" />
            </Radio.Button>
            <Radio.Button value="other">
              <FormattedMessage id="invest-assetallocation.summary.channel.other" defaultMessage="Other" />
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        <FormattedMessage id="invest-assetallocation.summary.unit" defaultMessage="unit: 10000/USD" />
      </h4>
      <Pie
        hasLegend
        subTitle={<FormattedMessage id="invest-assetallocation.summary.channel.subtitle" defaultMessage="total" />}
        total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
        data={salesPieData}
        valueFormat={value => <Yuan>{value}</Yuan>}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
);

export default AssetSummary;
