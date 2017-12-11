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

const PROJECTION_UPLOAD_URL = `${Constant.serverUrl}/api/projectionupload`;

const uploadProps = {
  name: 'projectionFile',
  action: PROJECTION_UPLOAD_URL,
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

class ProjectionList extends Component {
  componentWillMount() {
    this.props.fetchProjections();
  }

  render() {
    const {
      projections,
      count,
      pageSize,
      currentPage,
      fetchProjections,
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
                onClick={() => fetchProjections()}
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
              dataSource={projections}
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
                title="PDP"
                dataIndex="pdp"
                key="pdp"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Tagihan Bruto"
                dataIndex="tagihanBruto"
                key="tagihanBruto"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Usaha"
                dataIndex="piutangUsaha"
                key="piutangUsaha"
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Piutang Retensi"
                dataIndex="piutangRetensi"
                key="piutangRetensi"
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

ProjectionList.propTypes = {
  fetchProjections: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  projections: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    projections: state.financeReducers.projections.rows,
    count: state.financeReducers.projections.count,
    searchText: state.financeReducers.projectionSearch.searchText,
    pageSize: state.financeReducers.projectionSearch.pageSize,
    currentPage: state.financeReducers.projectionSearch.currentPage,
    loading: state.financeReducers.projectionSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchProjections: () => {
      dispatch({
        type: 'FETCH_PROJECTIONS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_PROJECTION_TYPES_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'PROJECTION_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'PROJECTION_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
  }
);

const ProjectionListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectionList);

export default ProjectionListWrapper;
