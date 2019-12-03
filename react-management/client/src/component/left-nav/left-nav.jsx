import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import localStorageUtils from '../../utils/localStorageUtils'
import menuList from '../../config/menuConfig'
import './left-nav.less'
import logo from '../../assets/images/logo.jpg'

const { SubMenu } = Menu;

class LeftNav extends Component {

  getMenuNodes = (menuList) => {
    return menuList.map(menu => {
      // 查看是否有权限
      if (this.hasAuth(menu)) {
        if (!menu.children) {
          return (
            <Menu.Item key={menu.key}>
              <Link to={menu.key}>
                <Icon type={menu.icon} />
                {menu.title}
              </Link>
            </Menu.Item>
          )
        } else {
          const path = this.props.location.pathname
          const cItem = menu.children.find(cItem => path.indexOf(cItem.key) === 0)
          if (cItem) {
            this.openKey = menu.key
          }
          return (
            <SubMenu
              key={menu.key}
              title={
                <span>
                  <Icon type={menu.icon} />
                  <span>{menu.title}</span>
                </span>
              }
            >
              {
                this.getMenuNodes(menu.children)
              }
            </SubMenu>
          )
        }
      }

    })
  }

  hasAuth = (item) => {
    const user = localStorageUtils.getUser()
    const menus = (user.role && user.role.menus) || []
    if (item.public || menus.indexOf(item.key) !== -1 || user.username === 'admin') {
      return true
    } else if (item.children) {
      const cItem = item.children.find(cItem => menus.indexOf(cItem.key) !== -1)
      return !!cItem
    }
    return false
  }

  // 第一次render()执行之后
  componentDidMount() {

  }

  // 第一次render()执行之前
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    let selectedKeys = this.props.location.pathname
    if (selectedKeys.indexOf("/product") === 0) {
      selectedKeys = '/product'
    }
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img className="left-nav-logo" src={logo} alt="logo图片" />
          <h1>安琪后台</h1>
        </Link>
        {
          /* 
            defaultSelectedKeys 总是根据第一次指定的key显示
            selectedKeys 总是根据最新的key显示
          */
        }
        <Menu
          onClick={this.handleClick}
          selectedKeys={[selectedKeys]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);