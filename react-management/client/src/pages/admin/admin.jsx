import React, { Component } from 'react'
import { Layout } from 'antd'
import { Redirect, Route, Switch } from 'react-router-dom'
import LeftNav from '../../component/left-nav/left-nav'
import MHeader from '../../component/header/header'
import Home from '../../pages/home/home'
import Category from '../../pages/category/category'
import ProductHome from '../../pages/product/home'
import Role from '../../pages/role/role'
import User from '../../pages/user/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'

const { Sider, Content, Header, Footer } = Layout
class Admin extends Component {

  render() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const menus = (user.role && user.role.menus) || []
    if (menus && menus.length > 0) {
      const pathname = this.props.history.location.pathname
      // 浏览器输入
      // 直接相等
      console.log(menus.toString().indexOf(pathname))
      if((menus.toString().indexOf(pathname)) === -1){
        // product/addupdate
        let path = (/^(\/[\w\d_-]+)(?:\/?)/.exec(pathname) && /^(\/[\w\d_-]+)(?:\/?)/.exec(pathname)[1]) || pathname
        if(!(menus.toString().indexOf(path))){
          return <Redirect to="/home" />
        }
      }
    }
    if (!user._id) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <MHeader />
          <Content style={{ background: 'white', margin: '20px', borderBox: "box-sizing" }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={ProductHome} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", lineHeight: "1", height: 60 }}>
            推荐使用谷歌浏览器访问效果更佳
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin