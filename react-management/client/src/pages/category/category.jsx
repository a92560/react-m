import React, { Component } from 'react'
import { Table, Button, Card, Icon, message, Modal } from 'antd';
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../component/link-button/link-button'
import './category.less'
import WrapperAddUpdateForm from './add-update-form';

class Category extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categorys: [], // 分类数组
      total: 0, // 总数量
      per_page: 3, // 每页展示数量 即pageSize
      page: 1, // 当前页码 即current
      showStatus: 0, // 1 即为表示添加分类 2 即表示为更新分类
      loading: false
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    await this.handleGetData()
    this.setState({
      loading: false
    })
  }

  handleGetData = async () => {
    const { data, status, total, message: errorMessage } = await reqCategoryList()
    if (status === 0) {
      this.setState({
        categorys: data,
        total: total
      })
    } else {
      message.error(errorMessage)
    }
  }

  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        width: 500,
      },
      {
        title: '操作',
        render: category => (<LinkButton onClick={() => {
          this.category = category // 保存当前分类, 其它地方都可以读取到
          this.setState({ showStatus: 2})
        }}>修改分类</LinkButton>)
      }
    ];
  }

  // 处理重新获取分页数据
  handleReGetData = async (page, per_page) => {
    const { data, status, message: errorMessage } = await reqCategoryList(page, per_page)
    if (status === 0) {
      this.setState({
        categorys: data
      })
    } else {
      message.error(errorMessage)
    }
  }

  // 选择每页展示数量变化
  onShowSizeChange = (current, pageSize) => {
    // current = page , pageSize = per_page
    this.setState({
      page: current,
      per_page: pageSize
    })
    this.handleReGetData(current, pageSize)
  }

  // 选择页码变化
  onChange = (page) => {
    this.setState({
      page
    }, () => {
      const { page, per_page } = this.state
      this.handleReGetData(page, per_page)
    })
  }

  // modal 确认之后
  onOk = () => {
    this.form.validateFields(async (err, values) => {
      if(!err){
        const {showStatus} = this.state
        const {categoryName} = values
        let result = null
        if(showStatus === 2){
          // 更新
          const {_id} = this.category
          result = await reqUpdateCategory(_id, categoryName)
        }
        if(showStatus === 1){
          // 添加
          result = await reqAddCategory(categoryName)
        }
        if(result.status === 0){
          message.success(`${showStatus === 1 ? "添加" : "修改"}成功`)
          this.form.resetFields()
          this.setState({
            showStatus: 0
          })
          const {per_page, page} = this.state
          this.handleReGetData(page, per_page)
        }else{
          this.setState({
            showStatus: 0
          })
          message.error("服务器错误，请稍后重试。")
        }
      }
    })
  }

  // modal 取消

  onCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }

  // 显示模态框
  showModal = () => {
    this.category = {}
    this.setState({
      showStatus: 1
    })
  }

  render() {
    const extra = (
      <Button type="primary" onClick={this.showModal}>
        <Icon type="plus" />
        添加
      </Button>
    )

    // 读取分类
    const category = this.category || {}

    const { categorys, total, per_page, page, loading } = this.state

    const paginationOptions = {
      defaultPageSize: per_page,
      showQuickJumper: true,
      total: total,
      onShowSizeChange: this.onShowSizeChange,
      showSizeChanger: true,
      current: page,
      onChange: this.onChange
    }
    return (
      <div className="category">
        <Card extra={extra} style={{ width: "100%" }}>
          <Table
            bordered
            rowKey="_id"
            columns={this.columns}
            dataSource={categorys}
            pagination={paginationOptions}
            loading={loading}
          />
        </Card>

        <Modal
          title={this.state.showStatus === 1 ? "添加分类" : "修改分类"}
          visible={this.state.showStatus !== 0}
          onOk={this.onOk}
          onCancel={this.onCancel}
          okText="确认"
          cancelText="取消"
        >
          <WrapperAddUpdateForm setForm={form => this.form = form} categoryName={category.name}/>
        </Modal>
      </div>
    )
  }
}

export default Category
