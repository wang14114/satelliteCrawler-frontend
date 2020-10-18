import { Card, Table } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';

const rocketColumns = [
  {
    title: <FormattedMessage id="launch-data.table.rank" defaultMessage="Launch ID" />,
    dataIndex: 'id',
    width: '30%',
    sorter: (a: any, b: any) => a.id.localeCompare(b.id),
  },
  {
    title: <FormattedMessage id="launch-data.table.rocketName" defaultMessage="Rocket" />,
    dataIndex: 'rocketName',
    render: (text: React.ReactNode) => <a>{text}</a>,
    width: '40%',
  },
  {
    title: <FormattedMessage id="launch-data.table.launchDate" defaultMessage="Launch Date" />,
    dataIndex: 'launchDate',
    width: '30%',
  },
];

const satelliteColumns = [
  {
    title: <FormattedMessage id="launch-data.table.satelliteName" defaultMessage="Satellite" />,
    dataIndex: 'satelliteName',
    render: (text: React.ReactNode) => <a>{text}</a>,
    width: '10%',
  },
  {
    title: <FormattedMessage id="launch-data.table.satelliteNo" defaultMessage="No." />,
    dataIndex: 'satelliteNo',
    width: '10%',
  },
  {
    title: <FormattedMessage id="launch-data.table.satelliteStatus" defaultMessage="Status" />,
    dataIndex: 'satelliteStatus',
    width: '10%',
  },
  {
    title: <FormattedMessage id="launch-data.table.description" defaultMessage="Description" />,
    dataIndex: 'description',
    width: '40%',
  },
  {
    title: (
      <FormattedMessage
        id="launch-data.table.orbitDescription"
        defaultMessage="Orbit Description"
      />
    ),
    dataIndex: 'orbitDescription',
    width: '30%',
  },
];

const orbitColumns = [
  {
    title: <FormattedMessage id="launch-data.table.epoch" defaultMessage="epoch(UTC)" />,
    dataIndex: 'epoch',
    width: '15%',
  },
  {
    title: <FormattedMessage id="launch-data.table.smAxis" defaultMessage="s-m axis(km)" />,
    dataIndex: 'smAxis',
    width: '8%',
  },
  {
    title: <FormattedMessage id="launch-data.table.ecc" defaultMessage="ecc" />,
    dataIndex: 'ecc',
    width: '8%',
  },
  {
    title: <FormattedMessage id="launch-data.table.perigee" defaultMessage="perigee(km)" />,
    dataIndex: 'perigee',
    width: '9%',
  },
  {
    title: <FormattedMessage id="launch-data.table.apogee" defaultMessage="apogee(km)" />,
    dataIndex: 'apogee',
    width: '10%',
  },
  {
    title: <FormattedMessage id="launch-data.table.period" defaultMessage="period(min)" />,
    dataIndex: 'period',
    width: '10%',
  },
  {
    title: <FormattedMessage id="launch-data.table.incl" defaultMessage="incl(°)" />,
    dataIndex: 'incl',
    width: '8%',
  },
  {
    title: <FormattedMessage id="launch-data.table.w" defaultMessage="ω(°)" />,
    dataIndex: 'w',
    width: '8%',
  },
  {
    title: (
      <FormattedMessage id="launch-data.table.descNode" defaultMessage="desc node(local time)" />
    ),
    dataIndex: 'descNode',
    width: '15%',
  },
  {
    title: <FormattedMessage id="launch-data.table.GEOLongitude" defaultMessage="GEO Longitude" />,
    dataIndex: 'GEOLongitude',
    width: '10%',
  },
];

const launchDataTable = ({
  loading,
  rocketData,
  satelliteData,
  orbitData,
  onClickRocket,
  onClickSatellite,
}: {
  loading: boolean;
  rocketData: [];
  satelliteData: [];
  orbitData: [];
  onClickRocket: any;
  onClickSatellite: any;
}) => (
  <>
    <Card
      loading={loading}
      bordered={false}
      title={<FormattedMessage id="launch-data.table.rocket-title" defaultMessage="Rocket Data" />}
      style={{
        height: '100%',
      }}
    >
      <Table
        rowKey="id"
        size="small"
        columns={rocketColumns}
        dataSource={rocketData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        onRow={record => {
          return {
            onClick: event => {
              onClickRocket(record);
            },
          };
        }}
      ></Table>
    </Card>
    <Card
      loading={loading}
      bordered={false}
      title={
        <FormattedMessage id="launch-data.table.satellite-title" defaultMessage="Satellite Data" />
      }
      style={{
        height: '100%',
      }}
    >
      <Table
        rowKey="satelliteNo"
        size="small"
        columns={satelliteColumns}
        dataSource={satelliteData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        onRow={record => {
          return {
            onClick: event => {
              onClickSatellite(record);
            },
          };
        }}
      ></Table>
    </Card>
    <Card
      loading={loading}
      bordered={false}
      title={<FormattedMessage id="launch-data.table.orbit-title" defaultMessage="Orbit Data" />}
      style={{
        height: '100%',
      }}
    >
      <Table
        rowKey="epoch"
        size="small"
        columns={orbitColumns}
        dataSource={orbitData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      ></Table>
    </Card>
  </>
);

export default launchDataTable;
