import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Pagination
} from 'antd'

class MPagination extends Component {

  static propTypes = {
    pageSizeOptions: PropTypes.array,
    total: PropTypes.number
  }

  static defaultProps = {
    pageSizeOptions: ['2', '3', '5', '10'],
    total: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
  }

  // 展示一共多少条数据
  showTotal = (total) => {
    return `总共${total}条`
  }

  // 页码改变后的回调
  onChange = (pageNumber, pageSize) => {
    this.setState({
      current: pageNumber
    })
    // 通知父组件我的状态改变啦
    this.props.handleChange && this.props.handleChange(pageNumber, pageSize)
  }

  // pageSize 改变后的回调
  onShowSizeChange = (current, pageSize) => {
    // 跳回第一页
    this.setState({
      current: 1
    }, () => {
      this.props.handleChange && this.props.handleChange(current, pageSize)
    })

    
  }

  render() {

    const { pageSizeOptions, total } = this.props


    return (
      <Fragment>
        {
          total ?
            <div className="pagination" style={{ marginTop: 20, float: "right" }}>
              <Pagination
              pageSizeOptions={pageSizeOptions}
              defaultPageSize={Number(pageSizeOptions[0])}
              showQuickJumper
              showSizeChanger
              showTotal={this.showTotal}
              current={this.state.current}
              total={total}
              onChange={this.onChange}
              onShowSizeChange={this.onShowSizeChange}
              style={{float: "right"}}
              />
            </div>
            :
            ""
        }
      </Fragment>
    )
  }
}

export default MPagination