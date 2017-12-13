import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Upload from 'antd/lib/upload';
import Modal from 'antd/lib/modal';
import numeral from 'numeral';
import Constant from '../../Constant';

const Column = Table.Column;

const CASH_FLOW_UPLOAD_URL = `${Constant.serverUrl}/api/cashflowupload`;

const uploadProps = {
  name: 'cashFlowFile',
  action: CASH_FLOW_UPLOAD_URL,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    if (info.file.status === 'done') {
      console.log(info);
    }
  },
};

class CashFlowList extends Component {
  componentWillMount() {
    this.props.fetchCashFlows();
  }

  render() {
    const {
      cashFlows,
      count,
      pageSize,
      currentPage,
      fetchCashFlows,
      searchText,
      searchTextChanged,
      pageChanged,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10, marginTop: 15 }}>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="Code or Name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchCashFlows()}
                style={{ marginRight: 15 }}
              />
              <Upload {...uploadProps}>
                <Button
                  type="primary"
                  shape="circle"
                  icon="upload"
                  style={{ marginLeft: 0 }}
                />
              </Upload>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={cashFlows}
              style={{ marginTop: 15 }}
              rowKey="id"
              loading={loading}
              pagination={{
                total: count,
                current: currentPage,
                pageSize,
              }}
              onChange={pagination => pageChanged(pagination.current)}
              size="middle"
            >
              <Column
                title="Type Code"
                dataIndex="CashFlow.typeCode"
                key="CashFlow.typeCode"
              />
              <Column
                title="Month"
                dataIndex="month"
                key="month"
              />
              <Column
                title="Year"
                dataIndex="CashFlow.year"
                key="CashFlow.year"
              />
              <Column
                title="RKAP"
                dataIndex="CashFlow.rkap"
                key="CashFlow.rkap"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Rolling"
                dataIndex="CashFlow.rolling"
                key="CashFlow.rolling"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Ra"
                dataIndex="ra"
                key="ra"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Prog"
                dataIndex="prog"
                key="prog"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Ri"
                dataIndex="ri"
                key="ri"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

CashFlowList.propTypes = {
  fetchCashFlows: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cashFlows: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    cashFlows: state.financeReducers.cashFlows.rows,
    count: state.financeReducers.cashFlows.count,
    searchText: state.financeReducers.cashFlowSearch.searchText,
    pageSize: state.financeReducers.cashFlowSearch.pageSize,
    currentPage: state.financeReducers.cashFlowSearch.currentPage,
    loading: state.financeReducers.cashFlowSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCashFlows: () => {
      dispatch({
        type: 'FETCH_CASH_FLOWS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_CASH_FLOW_TYPES_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'CASH_FLOW_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'CASH_FLOW_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
  }
);

const CashFlowListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CashFlowList);

export default CashFlowListWrapper;
