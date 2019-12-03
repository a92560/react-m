import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Button,
  Select
} from 'antd'
const Item = Form.Item
const Option = Select.Option

class AddUpdateForm extends Component {

  static propTypes = {
    roles: PropTypes.array,
    setForm: PropTypes.func.isRequired
  }

  static defaultProps = {
    roles: []
  }

  constructor(props) {
    super(props)
    this.props.setForm(this.props.form)
    this.state = {
      selectValue: "请选择"
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const user = this.props.user || {}
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    const { roles } = this.props
    return (
      <Form {...formLayout}>
        <Item label="用户名">
          {
            getFieldDecorator(
              "username",
              {
                initialValue: user.username || "",
                rules: [
                  {
                    required: true,
                    message: "请输入用户名"
                  }
                ]
              }
            )(
              <Input placeholder="请输入用户名" />
            )
          }
        </Item>
        {
          user._id ? null : 
          <Item label="密码">
            {
              getFieldDecorator(
                "password",
                {
                  initialValue: user.password || "",
                  rules: [
                    {
                      required: true,
                      message: "请输入密码"
                    }
                  ]
                }
              )(
                <Input placeholder="请输入密码" type="password" />
              )
            }
          </Item>
        }

        <Item label="邮箱">
          {
            getFieldDecorator(
              "email",
              {
                initialValue: user.email || "",
                rules: [
                  {
                    required: true,
                    message: "请输入邮箱"
                  }
                ]
              }
            )(
              <Input placeholder="请输入邮箱" />
            )
          }
        </Item>
        <Item label="手机号">
          {
            getFieldDecorator(
              "phone",
              {
                initialValue: user.phone || "",
                rules: [
                  {
                    required: true,
                    message: "请输入手机号"
                  }
                ]
              }
            )(
              <Input placeholder="请输入手机号" />
            )
          }
        </Item>
        <Item label="所属角色">
          {
            getFieldDecorator(
              "role_id",
              {
                initialValue: user.role_id || "",
                rules: [
                  {
                    required: true,
                    message: "请选择角色"
                  }
                ]
              }
            )(
              <Select>
                <Option value="">请选择</Option>
                {
                  (roles.length > 0) && roles.map(role => (
                    <Option value={role._id} key={role._id}>{role.name}</Option>
                  ))
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUpdateForm)