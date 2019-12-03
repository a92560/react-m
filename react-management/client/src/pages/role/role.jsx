import React, { Component } from 'react'
import {
  Card,
  Table,
  Modal,
  Button,
  message,
} from 'antd'
import MPagination from '../../component/pagination'
import localStorageUtils from '../../utils/localStorageUtils'
import { formatDate } from '../../utils/dateUtils'
import LinkButton from '../../component/link-button/link-button'
import { reqGetRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
class Role extends Component {
  constructor(props) {
    super(props)
    // 初始化表格  th显示
    this.initColumns()
    // 设置ref 获取auth-form内的状态数据
    this.authRef = React.createRef()
    this.state = {
      roles: [],
      total: 0,
      loading: false,
      isShowAdd: false, // 是否显示添加角色按钮
      isShowAuth: false, // 是否显示授权按钮
      current: 1,
      pageSize: 3,
      closeAuth: false
    }
  }

  componentDidMount() {
    // 发送ajax请求获取角色列表
    this.getRoles({ page: 1, per_page: 3 })
  }

  // 初始化表格  th显示
  initColumns = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        // render: (create_time) => formatDate(create_time),
        render: formatDate
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: formatDate
      },
      {
        title: "授权人",
        dataIndex: "auth_name"
      },
      {
        title: "操作",
        render: (role) => {
          return (
            <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton>
          )
        }
      }
    ]
  }

  getRoles = async (pageObj) => {
    this.setState({
      loading: true
    })
    const result = await reqGetRoles(pageObj)
    if (result.status === 0) {
      this.setState({
        roles: result.data,
        total: result.total,
        loading: false
      })
    } else {
      this.setState({
        loading: false
      })
      message.error(result.message)
    }
  }

  onChangeCurPageOrPageSize = (pageNumber, pageSize) => {
    this.setState({
      current: pageNumber,
      pageSize
    })
    this.getRoles({ page: pageNumber, per_page: pageSize })
  }


  // 确认添加角色
  addRole = () => {
    this.form.validateFields(async (err, values) => {
      if(!err){
        const {roleName} = values
        const result = await reqAddRole(roleName)
        if(result.status === 0){
          message.success("添加角色成功")
          this.setState({
            isShowAdd: false
          })
          this.getRoles({ page: 1, per_page: 3 })
        }else{
          message.error(result.message)
        }
      }else{
        message.error("表单校验不通过")
      }
    })
  }

  // 授权界面的显示
  showAuth = (role) => {
    this.role = role
    this.setState({
      isShowAuth: true,
      closeAuth: false
    })
  }

  // 更新角色权限
  udpateRole = async () => {
    const {role} = this
    const updateRole = {}
    updateRole.menus = this.authRef.current.getCheckedKeys()
    updateRole.auth_name = localStorageUtils.getUser().username
    updateRole.auth_time = Date.now()
    const result = await reqUpdateRole(role._id, updateRole)
    if(result.status === 0){
      message.success("更新角色权限成功")
      this.setState({
        isShowAuth: false
      })
      this.getRoles({ page: this.state.current, per_page: this.state.pageSize })
    }else{
      message.error("更新角色权限失败")
    }
  }

  render() {
    const { roles, total, loading, isShowAdd, isShowAuth, closeAuth } = this.state
    const title = (
      <Button type="primary" onClick={() => this.setState({isShowAdd: true})}>
        添加角色
      </Button>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={false}
          loading={loading}
        />
        <MPagination
          total={total}
          handleChange={this.onChangeCurPageOrPageSize} //当前页及条数改变都会从子组件触发此方法，用于传递页码和条数
          pageSizeOptions={['3', '5', '10', '20']}    
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ isShowAdd: false })
          }}
        >
          <AddForm setForm={form => this.form = form}/>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.udpateRole}
          onCancel={() => {
            // 把AuthForm设置的状态恢复
            this.setState({ isShowAuth: false, closeAuth: true })
          }}
        >
          <AuthForm role={this.role} closeAuth={closeAuth} ref={this.authRef}/>
        </Modal>
      </Card>
    )
  }
}

export default Role