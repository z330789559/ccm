import React, { Component } from 'react'
import { Table } from 'antd'
import http from '../../utils/http'
import { injectIntl } from 'react-intl'

class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      uploadLoading: false,
      dataSource: [],
      pagingConfig: props.pagination === false ? false : this.setPagination(props.pagination || {})
    }
  }

  componentDidMount() {
    if (this.props.url && this.props.isShow) {
      const { current, pageSize } = this.state.pagingConfig
      pageSize ? this.queryListByPaging(current, pageSize) : this.queryList()
    }
  }

  componentDidUpdate(prevProps) {
    const { url, search, otherParam } = this.props
    if ((prevProps.search !== search && url) || (prevProps.otherParam !== otherParam && url) || prevProps.url !== url) {
      const { pageSize } = this.state.pagingConfig
      pageSize ? this.queryListByPaging(1, pageSize) : this.queryList()
    }
  }

  setPagination(data) {
    const { onChange, onShowSizeChange } = data
    const { intl } = this.props
    return Object.assign(
      {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        showTotal: (total, range) => `${intl.messages.lang59}${total}${intl.messages.lang60}${range[0]}-${range[1]}${intl.messages.lang61}`
      },
      data,
      {
        onChange: (current, pageSize) => this.queryListByPaging(current, pageSize).then(() => onChange?.(current, pageSize)),
        onShowSizeChange: (current, pageSize) => this.queryListByPaging(current, pageSize).then(() => onShowSizeChange?.(current, pageSize))
      }
    )
  }

  queryListByPaging(pn, ps) {
    this.setState({ loading: true })
    const { url, search, otherParam } = this.props
    return http.get(`${url}?pn=${pn}&ps=${ps}${otherParam || ''}`, ({ rows, total }) => {
      this.setState({
        loading: false,
        dataSource: rows,
        pagingConfig: Object.assign({}, this.state.pagingConfig, {
          current: pn,
          pageSize: ps,
          total
        })
      })
    })
  }

  // 自定义 otherParam 为对象
  queryList() {
    this.setState({ loading: true })
    const { url, search, otherParam } = this.props
    return http.get(url, { params: Object.assign(search, otherParam) }, (data) => {
      this.setState({
        loading: false,
        dataSource: data
      })
    })
  }

  // 若存在复选框，获取选中数据
  getSelectedData() {
    // return this.state.selectedList;
  }

  refreshGrid(isCurrent) {
    const { current, pageSize } = this.state.pagingConfig
    pageSize ? this.queryListByPaging(isCurrent ? current : 1, pageSize) : this.queryList()
  }
  render() {
    const { loading, dataSource, pagingConfig } = this.state
    const { url, search, pagination, className, ...params } = this.props
    return <Table className="mx-grid" rowKey="_id" loading={loading} pagination={pagingConfig} dataSource={dataSource} {...params} />
  }
}

export default injectIntl(Grid)
