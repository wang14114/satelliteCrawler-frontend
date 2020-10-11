import { Col, Row } from 'antd';
import React, { Component, Suspense } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { connect } from 'dva';
import { getTimeDistance } from './utils/utils';
import { AnalysisData } from './data.d';


const StockBasicList = React.lazy(() => import('./components/StockBasicList'));

interface TuShareProps {
  investAssetAllocation: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface TuShareState {
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
class tuShareInterface extends Component<
  TuShareProps,
  TuShareState
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

    if(salesPieData===undefined){
      salesPieData=[{x:"x",y:"0"}];
    }
    

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
          
            </Col>
          </Row>
          <Suspense fallback={null}>
                <StockBasicList
                  loading={loading}
                  stockA={stockA}
                />
          </Suspense>
             
        </React.Fragment>
      </GridContent>
    );
  }
}

export default tuShareInterface;
