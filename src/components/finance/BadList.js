import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Upload from 'antd/lib/upload';
import numeral from 'numeral';
import Constant from '../../Constant';

const Column = Table.Column;

const BAD_UPLOAD_URL = `${Constant.serverUrl}/api/badupload`;

const uploadProps = {
  name: 'badFile',
  action: BAD_UPLOAD_URL,
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

class BadList extends Component {
  componentWillMount() {
    this.props.fetchBads();
  }

  render() {
    const {
      bads,
      count,
      pageSize,
      currentPage,
      fetchBads,
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
                onClick={() => fetchBads()}
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
              dataSource={bads}
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
                title="Project Code"
                dataIndex="Project.code"
                key="Project.code"
              />
              <Column
                title="Month"
                dataIndex="month"
                key="month"
              />
              <Column
                title="Year"
                dataIndex="year"
                key="year"
              />
              <Column
                title="Piutang Usaha"
                dataIndex="piutangUsaha"
                key="piutangUsaha"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Tagihan Bruto"
                dataIndex="tagihanBruto"
                key="tagihanBruto"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Retensi"
                dataIndex="piutangRetensi"
                key="piutangRetensi"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="PDP"
                dataIndex="pdp"
                key="pdp"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="BAD"
                dataIndex="bad"
                key="bad"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

BadList.propTypes = {
  fetchBads: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  bads: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    bads: state.financeReducers.bads.rows,
    count: state.financeReducers.bads.count,
    searchText: state.financeReducers.badSearch.searchText,
    pageSize: state.financeReducers.badSearch.pageSize,
    currentPage: state.financeReducers.badSearch.currentPage,
    loading: state.financeReducers.badSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchBads: () => {
      dispatch({
        type: 'FETCH_BADS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_BAD_TYPES_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'BAD_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'BAD_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
  }
);

const BadListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BadList);

export default BadListWrapper;
