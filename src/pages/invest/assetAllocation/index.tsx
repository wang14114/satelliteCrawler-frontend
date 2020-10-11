import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import React, { Component, Suspense } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import { AnalysisData } from './data.d';
import styles from './style.less';


const AssetDetailByCategory = React.lazy(() => import('./components/AssetDetailByCategory'));
const AssetDetailByChannel = React.lazy(() => import('./components/AssetDetailByChannel'));
const AssetSummary = React.lazy(() => import('./components/AssetSummary'));

interface AssetAllocationProps {
  investAssetAllocation: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface AssetAllocationState {
  channel: 'all'|'china' | 'usa' | 'hongkong' | 'other';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
  visible:false;
}

@connect(
  ({
    investAssetAllocation,
    loading,
  }: {
    investAssetAllocation: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    investAssetAllocation,
    loading: loading.effects['investAssetAllocation/fetchSummary'],
  }),
)
class AssetAllocation extends Component<
  AssetAllocationProps,
  AssetAllocationState
> {
  state: AssetAllocationState = {
    channel: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'investAssetAllocation/fetchSummary',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'investAssetAllocation/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      channel: e.target.value,
    });
  };

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render() {
    const { channel } = this.state;
    const { investAssetAllocation, loading } = this.props;
    const {
      stockA,
      all,
      china,
      usa,
      hongkong,
      other,
    } = investAssetAllocation;
    let salesPieData;
    if (channel === 'all') {
      salesPieData = all;
    }else if (channel === 'china') {
      salesPieData = china;
    } else if(channel === 'usa') {
      salesPieData = usa;
    } else if(channel === 'hongkong') {
      salesPieData = hongkong;
    } else {
      salesPieData = other;
    }

    console.log(stockA);
    if(salesPieData===undefined){
      salesPieData=[{x:"x",y:"0"}];
    }
    
    const menu = (
      <Menu>
        <Menu.Item>导出报表</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    return (
      <GridContent>
        <React.Fragment>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
                <AssetSummary
                  dropdownGroup={dropdownGroup}
                  channel={channel}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          
            </Col>
          </Row>
          <Suspense fallback={null}>
                <AssetDetailByCategory
                  loading={loading}
                  stockA={stockA}

                />
              </Suspense>
              <Suspense fallback={null}>
                <AssetDetailByChannel
                  loading={loading}
                  stockA={stockA}

                />
              </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default AssetAllocation;
