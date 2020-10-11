import { Card, Table, Radio, Modal } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { SecurityDataType, } from '../data.d';
import { RadioChangeEvent } from 'antd/es/radio';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: <FormattedMessage id="invest-assetallocation.detail.category.rank" defaultMessage="Rank" />,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: (
      <FormattedMessage id="invest-assetallocation.detail.category.id" defaultMessage="ID" />
    ),
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: (
      <FormattedMessage id="invest-assetallocation.detail.category.name" defaultMessage="Name" />
    ),
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: <FormattedMessage id="invest-assetallocation.detail.category.holdingunit" defaultMessage="HoldingUnit" />,
    dataIndex: 'holdingunit',
    key: 'holdingunit',
    sorter: (a: { holdingunit: number }, b: { holdingunit: number }) => a.holdingunit - b.holdingunit,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="invest-assetallocation.detail.category.currentprice" defaultMessage="CurrentPrice" />,
    dataIndex: 'currentprice',
    key: 'currentprice',
    sorter: (a: { currentprice: number }, b: { currentprice: number }) => a.currentprice - b.currentprice,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="invest-assetallocation.detail.category.currentprice" defaultMessage="HoldPrice" />,
    dataIndex: 'holdingprice',
    key: 'holdingprice',
    sorter: (a: { holdingprice: number }, b: { holdingprice: number }) => a.coholdingpriceunt - b.holdingprice,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="invest-assetallocation.detail.category.revenueperecentage" defaultMessage="Precentage%" />,
    dataIndex: 'revenueperecentage',
    key: 'revenueperecentage',
    sorter: (a: { revenueperecentage: number }, b: { revenueperecentage: number }) => a.revenueperecentage - b.revenueperecentage,
    render: (text: React.ReactNode, record: { revenueperecentage: number }) => (
      <Trend flag={record.revenueperecentage < 0 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{record.revenuepercentage}%</span>
      </Trend>
    ),
  },
];


const AssetDetailByChannel = ({
  loading,
  stockA,
}: {
  loading: boolean;
  stockA: SecurityDataType[];
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="invest-assetallocation.detail.channel.title"
        defaultMessage="Detail(Channel)"
      />
    }
    style={{
      height: '100%',
    }}
    extra={<div className={styles.salesCardExtra}>
      <div className={styles.salesTypeRadio}>
          <Radio.Group>
            <Radio.Button value="all">
              <FormattedMessage id="invest-assetallocation.detail.channel.china" defaultMessage="China" />
            </Radio.Button>
            <Radio.Button value="online">
              <FormattedMessage id="invest-assetallocation.detail.channel.usa" defaultMessage="USA" />
            </Radio.Button>
            <Radio.Button value="stores">
              <FormattedMessage id="invest-assetallocation.detail.channel.hongkong" defaultMessage="Hongkong" />
            </Radio.Button>
          </Radio.Group>
        </div>
    
    </div>}
    
  >
    <Table<any>
      rowKey={record => record.index}
      size="small"
      columns={columns}
      expandedRowRender={record => {return <div><p style={{ margin: 0 }}>当前（价格，PCS，汇率，本金，应计，市值），成本（价格，汇率，本金，应计，成本价值，成本日期），简介（ISIN，SEDOL，简介，货币），变动（价格%，市值%，市值变动，本金%，本金变动，汇率%），头寸类型...</p></div>
    }}
    
      dataSource={stockA}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 10,
      }}
    />
  </Card>
);

export default AssetDetailByChannel;
