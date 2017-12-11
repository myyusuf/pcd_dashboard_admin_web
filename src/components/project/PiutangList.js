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

const PIUTANG_UPLOAD_URL = `${Constant.serverUrl}/api/piutangupload`;

const uploadProps = {
  name: 'piutangFile',
  action: PIUTANG_UPLOAD_URL,
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

class PiutangList extends Component {
  componentWillMount() {
    this.props.fetchPiutangs();
  }

  render() {
    const {
      piutangs,
      count,
      pageSize,
      currentPage,
      fetchPiutangs,
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
                onClick={() => fetchPiutangs()}
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
              dataSource={piutangs}
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
                title="Owner"
                dataIndex="owner"
                key="owner"
              />
              <Column
                title="PDP 1"
                dataIndex="pdp1"
                key="pdp1"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Tagihan Bruto 1"
                dataIndex="tagihanBruto1"
                key="tagihanBruto1"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Usaha 1"
                dataIndex="piutangUsaha1"
                key="piutangUsaha1"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Retensi 1"
                dataIndex="piutangRetensi1"
                key="piutangRetensi1"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

PiutangList.propTypes = {
  fetchPiutangs: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  piutangs: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    piutangs: state.projectReducers.piutangs.rows,
    count: state.projectReducers.piutangs.count,
    searchText: state.projectReducers.piutangSearch.searchText,
    pageSize: state.projectReducers.piutangSearch.pageSize,
    currentPage: state.projectReducers.piutangSearch.currentPage,
    loading: state.projectReducers.piutangSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPiutangs: () => {
      dispatch({
        type: 'FETCH_PIUTANGS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_PIUTANG_TYPES_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'PIUTANG_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'PIUTANG_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
  }
);

const PiutangListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PiutangList);

export default PiutangListWrapper;
