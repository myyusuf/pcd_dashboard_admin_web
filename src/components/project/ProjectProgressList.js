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
import Constant from '../../Constant';

const Column = Table.Column;

const PROJECT_PROGRESS_UPLOAD_URL = `${Constant.serverUrl}/api/projectprogressupload`;

const uploadProps = {
  name: 'projectProgressFile',
  action: PROJECT_PROGRESS_UPLOAD_URL,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    if (info.file.status === 'done') {
      console.log(info);
      if (info.file.response.status === 'ERROR') {
        const description = info.file.response.payload.map(code => (<p>{code}</p>));
        Modal.error({
          title: 'Unidentified Project Codes: ',
          content: (
            <div>
              {description}
            </div>
          ),
          onOk() {},
        });
      }
    }
  },
};

class ProjectProgressList extends Component {
  componentWillMount() {
    this.props.fetchProjectProgresses();
  }

  render() {
    const {
      projectProgresses,
      count,
      pageSize,
      currentPage,
      fetchProjectProgresses,
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
                onClick={() => fetchProjectProgresses()}
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
              dataSource={projectProgresses}
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
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

ProjectProgressList.propTypes = {
  fetchProjectProgresses: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  projectProgresses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    projectProgresses: state.projectReducers.projectProgresses.rows,
    count: state.projectReducers.projectProgresses.count,
    searchText: state.projectReducers.projectProgressSearch.searchText,
    pageSize: state.projectReducers.projectProgressSearch.pageSize,
    currentPage: state.projectReducers.projectProgressSearch.currentPage,
    loading: state.projectReducers.projectProgressSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchProjectProgresses: () => {
      dispatch({
        type: 'FETCH_PROJECT_PROGRESSES_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_PROJECT_PROGRESS_TYPES_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'PROJECT_PROGRESS_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'PROJECT_PROGRESS_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
  }
);

const ProjectProgressListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectProgressList);

export default ProjectProgressListWrapper;
