import React, { Component, Suspense } from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import config from './config';

const LaunchDataTable = React.lazy(() => import('./components/LaunchDataTable'));
const ControlPanel = React.lazy(() => import('./components/ControlPanel'));
const PageLoading = React.lazy(() => import('./components/PageLoading'));

interface launchHistoryProps {
  launchHistory: [];
  dispatch: Dispatch<any>;
  loading: boolean;
  status: string;
  type: string;
}

interface launchHistoryState {
  rocketData: [];
  satelliteData: [];
  orbitDate: [];
  year: string;
}

//dva method, mapStateToPrpp, mapDispatchToProps
@connect(
  ({
    launchHistory,
    loading,
    status,
    type,
  }: {
    launchHistory: any;
    loading: {
      effects: { [key: string]: boolean };
    };
    status: any;
    type: any;
  }) => ({
    launchHistory: launchHistory.launchDataList,
    loading: loading.effects['launchHistory/crawlerLaunchData'],
    status: launchHistory.status,
    type: launchHistory.type,
  }),
)
class Home extends Component<launchHistoryProps, launchHistoryState> {
  state: launchHistoryState = {
    rocketData: [],
    satelliteData: [],
    orbitDate: [],
    year: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'launchHistory/fetchLaunchData',
    });
  }

  componentDidUpdate(prevProps: any) {
    if (this.props !== prevProps) {
      const { type, status, dispatch } = this.props;
      if (type !== 'fetchLaunchData') {
        if (status == 'ok') {
          dispatch({
            type: 'launchHistory/fetchLaunchData',
          });
        } else {
          //handle error
        }
      } else {
        this.setState({ rocketData: this.props.launchHistory, satelliteData: [], orbitDate: [] });
      }
    }
  }

  handleOnClickRocket(rocket: any) {
    this.setState({ satelliteData: rocket.satelliteList });
    this.setState({ orbitDate: [] });
  }

  handleOnClickSatellite(satellite: any) {
    this.setState({ orbitDate: satellite.orbitList });
  }

  handleOnClickClearAll() {
    const { dispatch } = this.props;
    dispatch({
      type: 'launchHistory/clearAllLaunchData',
    });
  }

  handleOnClickFetch() {
    const { dispatch } = this.props;
    let years = [];
    if (this.state.year === '') {
      years = config.years;
    } else {
      years.push(this.state.year);
    }
    dispatch({
      type: 'launchHistory/crawlerLaunchData',
      payload: {
        years: years,
      },
    });
  }

  handleOnSelectYear(date: any) {
    if (date !== null) {
      this.setState({ year: date.year() });
    } else {
      this.setState({ year: '' });
    }
  }

  render() {
    const { loading } = this.props;
    const { rocketData, satelliteData, orbitDate } = this.state;
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={null}>
            <ControlPanel
              onClickClearAll={this.handleOnClickClearAll.bind(this)}
              onClickFetch={this.handleOnClickFetch.bind(this)}
              onSelectYear={this.handleOnSelectYear.bind(this)}
            />
          </Suspense>
          <Suspense fallback={null}>
            <LaunchDataTable
              loading={loading}
              rocketData={rocketData}
              satelliteData={satelliteData}
              orbitData={orbitDate}
              onClickRocket={this.handleOnClickRocket.bind(this)}
              onClickSatellite={this.handleOnClickSatellite.bind(this)}
            />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Home;
