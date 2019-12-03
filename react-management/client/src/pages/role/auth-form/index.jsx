import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree
class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object.isRequired,
    closeAuth: PropTypes.bool.isRequired
  }

  static defaultProps = {
    role: {},
    closeAuth: false
  }

  constructor(props) {
    super(props)
    this.state = {
      checkedKeys: [],
      _id: ""
    }
    // 根据传入角色的menus来更新checkedKeys状态
    this.nodes = this.getNodes(menuList)
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const menus = nextProps.role.menus
    const closeAuth = nextProps.closeAuth
    // 取消了 || 取消之后 点击其他角色的权限
    if (closeAuth || nextProps.role._id != prevState._id) {
      return {
        checkedKeys: menus,
        _id: nextProps.role._id
      }
    }
    // 组件内部状态自己更新
    return null
  }

  getCheckedKeys = () => this.state.checkedKeys

  // 动态生成TreeNode
  getNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {
            item.children ? this.getNodes(item.children) : null
          }
        </TreeNode>
      )
      return pre
    }, [])
  }

  // 选择对应的权限 
  onCheck = (checkedKeys) => {
    console.log("checkedKeys", checkedKeys)
    this.setState({
      checkedKeys
    })
  }

  render() {
    const { role } = this.props
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }
    return (
      <div>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll
          // defaultSelectedKeys={['0-0-0', '0-0-1']} // 点击文本内容 会添加背景
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {/* 这下面的子节点菜单 要根据menuConfig中的来生成 */}
            {
              this.nodes ? this.nodes : null
            }
          </TreeNode>
        </Tree>
      </div>
    )
  }
}

export default AuthForm