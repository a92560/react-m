import React, { Component } from 'react'
import {throttle} from 'lodash'
import {
  Card,
  Table,
  Icon,
  Select,
  Button,
  Input,
  message
} from 'antd'
import LinkButton from '../../component/link-button/link-button'
import { reqGetProduct, reqGetSearchProduct, reqUpdateProduct } from '../../api'

class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      products: [], // 商品列表
      searchType: "name",
      k: '', // 搜索关键字
      current: 1
    }
  }

  componentWillMount() {
    // 回到跳转的那一页
    if (this.props.location.state) {
      this.page = this.props.location.state.page
    }
    this.setState({
      loading: true,
      current: this.page ? this.page : 1
    })
    // 初始化表格列值
    this.initColumns()
    // 初始化表格数据
    this.initProducts()
    this.setState({
      loading: false
    })
  }

  initProducts = async () => {
    const { searchType, k } = this.state
    if (k) {
      this.setState({
        current: 1
      })
    }
    let result = null
    k ? result = await reqGetSearchProduct(searchType, k) : result = await reqGetProduct()
    if (result.status === 0) {
      this.setState({
        products: result.data
      })
    } else {
      message.error(result.message)
    }

  }

  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => '¥' + price
      },
      {
        title: "状态",
        render: ({ status, _id }) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return (
            <span>
              <Button onClick={() => this.updateProStatus(_id, status)}>{btnText}</Button>
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: "操作",
        width: 120,
        render: (product) => (
          <span>
            <LinkButton onClick={() => 
              this.props.history.push({ pathname: `/product/detail/${product._id}`, state: { product, page: this.state.current } })
              }>
                详情
            </LinkButton>
            <LinkButton onClick={() => this.props.history.push({ pathname: `/product/addupdate/${product._id}/${this.state.current}`, state: { product } })}>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  // 处理输入框值改变
  handleChange = (e) => {
    this.setState({
      k: e.target.value
    })
  }

  // 商品上下架管理
  updateProStatus = throttle(async (proId, status) => {
    status = status === 1 ? 2 : 1
    const result = await reqUpdateProduct(proId, {status})
    if (result.status === 0) {
      message.success("更新成功")
      this.initProducts()
    } else {
      message.error("更新失败，请稍后重试。")
    }
  }, 2000)

  onChange = (page) => {
    this.setState({
      current: page,
    });
  }

  render() {
    const title = (
      <span>
        <Select
          style={{ width: 200 }}
          value={this.state.searchType}
          onChange={val => this.setState({ searchType: val })}
        >
          <Select.Option value="name">按名称搜索</Select.Option>
          <Select.Option value="desc">按描述搜索</Select.Option>
        </Select>
        <Input
          type="text"
          placeholder="请输入关键字"
          value={this.state.k}
          style={{ width: 200, margin: "0 10px" }}
          onChange={this.handleChange}
        />
        <Button type="primary" onClick={this.initProducts}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={() => this.props.history.push(`/product/addupdate/${this.state.current}`)}>
        <Icon type="plus" />
        添加商品
      </Button>
    )

    const { loading, products, current } = this.state

    const paginationOptions = {
      defaultPageSize: 3,
      showQuickJumper: true,
      showSizeChanger: true,
      current,
      onChange: this.onChange
    }

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          dataSource={products}
          pagination={paginationOptions}
          loading={loading}
        />
      </Card>
    )
  }
}

export default Product