import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import {Redirect} from 'react-router-dom'
import localStorageUtils from '../../utils/localStorageUtils'
import { reqLogin } from "../../api";
import logo from "../../assets/images/logo.jpg";
import "./login.less";
const Item = Form.Item;
class Login extends Component {
  handleSubmit = e => {
    // 阻止表单的默认行为
    e.preventDefault();
    const { form } = this.props;
    const values = form.getFieldsValue();
    this.props.form.validateFields(async (err, { username, password }) => {
      if (!err) {
        const result = await reqLogin(username, password);
        if (result.status === 0) {
          // 登录成功
          localStorageUtils.saveUser(result.data)
          this.props.history.replace("/");
        } else {
          // 登录失败
          message.error(result.message);
          this.props.form.resetFields();
        }
      } else {
        // 验证失败
        alert("验证失败");
      }
    });
  };

  validatePwd = (rule, value, callback) => {
    /* 
     1) 密码必须输入
     2) 必须大于六位
     3) 必须小于十六位
     4) 必须是有英文数字和下划线
    */
    value = value.trim();
    if (!value) {
      callback("请输入密码");
    } else if (value.length < 3) {
      callback("密码必须大于3位");
    } else if (value.length > 16) {
      callback("密码必须小于16位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      // /^.*(?=.{6,})(?=.*\d)(?=.*_)(?=.*[a-zA-Z]).*$/
      callback("密码必须由数字或字母或下划线组成");
    } else {
      callback();
    }
  };

  render() {
    const user_id = localStorageUtils.getUser()._id
    if(user_id){
      return <Redirect to="/"/>
    }

    // 接受一个form属性， 是一个对象类型吧， 有一个方法
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="" />
          <h1>React项目 后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "请输入用户名" },
                  { min: 4, message: "用户名不能小于4位" },
                  { max: 16, message: "用户名不能大于16位" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文字母和数字和下划线组成"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                initialValue: "",
                rules: [{ validator: this.validatePwd }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}
const WrapForm = Form.create()(Login);

// Form.create()是一个函数 利用Form.create()包装form组件生成一个新的组件
// 新组件会向form传递一个属性： 属性名： form 类型为对象

// 高阶组件
// 本质是一个函数
// 函数接受一个组件 返回一个新组件
// Form.create()返回的函数就是一个高阶组件

// 高阶函数
// 接收的参数是函数或者返回值是函数
// 常见的  数组遍历的方法 / 定时器 /promise / 高阶组件
// 作用： 实现一个更强大的 动态的功能

/*
 * 组件： 组件类 本质就是一个构造函数
 */
export default WrapForm;
