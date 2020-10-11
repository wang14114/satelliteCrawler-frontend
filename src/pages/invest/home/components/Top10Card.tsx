import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import { RangePickerValue } from 'antd/es/date-picker/interface';
import React from 'react';
import numeral from 'numeral';
import { VisitDataType } from '../data.d';
import { Bar } from './Charts';
import styles from '../style.less';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData: { title: string; total: number }[] = [];
rankingListData.push({title:"贵州茅台",total:1001});
rankingListData.push({title:"工商银行",total:893});
rankingListData.push({title:"农业银行",total:231});
rankingListData.push({title:"东方航空",total:123});
rankingListData.push({title:"上海机场",total:83});
rankingListData.push({title:"中国软件",total:13});
rankingListData.push({title:"中兴通讯",total:374});
rankingListData.push({title:"上海能源",total:192});
// for (let i = 0; i < 7; i += 1) {
//   rankingListData.push({
//     title: formatMessage({ id: 'invest-home.analysis.test' }, { no: i }),
//     total: 323234,
//   });
// }

const Top10Card = ({
  rangePickerValue,
  salesData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}: {
  rangePickerValue: RangePickerValue;
  isActive: (key: 'today' | 'week' | 'month' | 'year') => string;
  salesData: VisitDataType[];
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: 'today' | 'week' | 'month' | 'year') => void;
}) => (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      <Tabs
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <a className={isActive('today')} onClick={() => selectDate('today')}>
                <FormattedMessage id="invest-home.top10.all-day" defaultMessage="All Day" />
              </a>
              <a className={isActive('week')} onClick={() => selectDate('week')}>
                <FormattedMessage id="invest-home.top10.all-week" defaultMessage="All Week" />
              </a>
              <a className={isActive('month')} onClick={() => selectDate('month')}>
                <FormattedMessage id="invest-home.top10.all-month" defaultMessage="All Month" />
              </a>
              <a className={isActive('year')} onClick={() => selectDate('year')}>
                <FormattedMessage id="invest-home.top10.all-year" defaultMessage="All Year" />
              </a>
            </div>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{ width: 256 }}
            />
          </div>
        }
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane
          tab={<FormattedMessage id="invest-home.top10.totalAsset" defaultMessage="Total Asset" />}
          key="totalAsset"
        >
          <Row type="flex">
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  height={295}
                  title={
                    <FormattedMessage
                      id="invest-home.top10.unit"
                      defaultMessage="Unit: 10000/USD"
                    />
                  }
                  data={salesData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>
                  <FormattedMessage
                    id="invest-home.top10.ranking"
                    defaultMessage="Top 10"
                  />
                </h4>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <span className={styles.rankingItemValue}>
                        {numeral(item.total).format('0,0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
        {/*
        <TabPane
          tab={<FormattedMessage id="invest-home.top10.cnstockA" defaultMessage="CN Stock A" />}
          key="cnStockA"
        >
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  height={292}
                  title={
                    <FormattedMessage
                      id="invest-home.top10.cnstock.unit"
                      defaultMessage="CNY"
                    />
                  }
                  data={salesData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>
                  <FormattedMessage
                    id="invest-home.analysis.visits-ranking"
                    defaultMessage="Visits Ranking"
                  />
                </h4>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <span>{numeral(item.total).format('0,0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
                  */}
      </Tabs>
    </div>
  </Card>
);

export default Top10Card;
