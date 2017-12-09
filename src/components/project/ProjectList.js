import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import ProjectWindow from './ProjectWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class ProjectList extends Component {
  componentWillMount() {
    this.props.fetchProjects();
  }

  render() {
    const {
      projects,
      count,
      pageSize,
      currentPage,
      fetchProjects,
      openAddWindow,
      openEditWindow,
      confirmDelete,
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
                onClick={() => fetchProjects()}
                style={{ marginRight: 15 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => openAddWindow()}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={projects}
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
                title="Code"
                dataIndex="code"
                key="code"
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Button
                      icon="edit"
                      onClick={() => openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={() => confirmDelete(record)}
                    />
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <ProjectWindow />
      </div>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    projects: state.projectReducers.projects.rows,
    count: state.projectReducers.projects.count,
    searchText: state.projectReducers.projectSearch.searchText,
    pageSize: state.projectReducers.projectSearch.pageSize,
    currentPage: state.projectReducers.projectSearch.currentPage,
    loading: state.projectReducers.projectSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchProjects: () => {
      dispatch({
        type: 'FETCH_PROJECTS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_PROJECT_TYPES_LOGIC',
      });
    },
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_PROJECT_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_PROJECT_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'PROJECT_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'PROJECT_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete project: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_PROJECT_LOGIC',
            payload: record,
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
  }
);

const ProjectListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);

export default ProjectListWrapper;
