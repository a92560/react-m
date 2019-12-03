import React, { Component } from 'react'
import {
  Table,
  Button,
  Card,
  message,
  Modal
} from 'antd'
import { formatDate } from '../../utils/dateUtils'
import LinkButton from '../../component/link-button/link-button'
import { reqUserList, reqDeleteUser, reqAddUser, reqUpdateUser } from '../../api'
import AddUpdateForm from './add-update-form'
import MPagination from '../../component/pagination'

const { confirm } = Modal
class User extends Component {

  constructor(props) {
    super(props)
    this.initColumns()
    this.state = {
      userList: [],
      roles: [],
      total: 0,
      formVisible: false, // 控制modal隐藏显示
    }
  }

  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "电话",
        dataIndex: "phone"
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: formatDate
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: role_id => this.roleName[role_id]
      },
      {
        title: "操作",
        render: (user) => {
          return (
            <span>
              <LinkButton onClick={() => this.handleEditUser(user)}>修改</LinkButton>
              <LinkButton onClick={() => this.handleDeleteUser(user._id)}>删除</LinkButton>
            </span>
          )
        }
      }
    ]
  }

  async componentDidMount() {
    this.getUserList()
  }

  getUserList = async () => {
    const result = await reqUserList()
    if (result.status === 0) {
      const { roles, users, total } = result.data
      this.roleName = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      }, {})
      this.userList = users
      this.setState({
        userList: users.slice(0, 3),
        roles,
        total
      })
    } else {
      message.error("获取用户列表失败，请稍后重试。")
    }
  }

  // 处理用户修改
  handleEditUser = (user) => {
    this.setState({
      formVisible: true
    })
    this.user = user
  }

  // 处理用户删除
  handleDeleteUser = async (_id) => {
    confirm({
      title: '确定要删除该用户吗？',
      okType: 'danger',
      onOk: async () => {
        const result = await reqDeleteUser(_id)
        if (result.status === 0) {
          message.success("删除用户成功")
          this.getUserList()
        } else {
          message.error("删除用户失败")
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    this.setState({
      formVisible: false
    })
  }

  // 用户点击确定添加用户
  handleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const result = !(this.user && this.user._id) ? await reqAddUser(values) : await reqUpdateUser(this.user._id, values)
        if (result.status === 0) {
          message.success( ((this.user && this.user._id) ? "更新" : "添加")+ "用户成功")
          this.getUserList()
        } else {
          message.error("添加用户失败，请稍后重试。")
        }
      } else {
        message.error("表单校验不通过")
      }
    })
    this.setState({
      formVisible: false
    })
  }

  handleCancel = () => {
    this.user = {}
    this.form.resetFields()
    this.setState({
      formVisible: false
    })
  }

  handleChange = (page, pageSize) => {
    this.setState({
      userList: this.userList.slice(((page - 1) * pageSize), (page * pageSize))
    })
  }

  render() {
    const title = (
      <Button icon="plus" type="primary" onClick={() => this.setState({ formVisible: true })}>
        添加用户
      </Button>
    )

    const { userList } = this.state
    return (
      <Card title={title}>
        <Table
          bordered
          dataSource={userList}
          columns={this.columns}
          pagination={false}
          rowKey="_id"
        />
        <MPagination total={this.state.total} handleChange={this.handleChange} pageSizeOptions={['3', '5', '10', '20']} />
        <Modal
          title={(this.user && this.user._id) ? "更新用户" : "添加用户"}
          visible={this.state.formVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUpdateForm roles={this.state.roles} user={this.user || {}} setForm={form => this.form = form} />
        </Modal>
      </Card>
    )
  }
}

export default User