import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import {withRouter} from 'react-router-dom'
import localStorageUtils from '../../utils/localStorageUtils'
import {formatDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import './header.less'
import menuList from '../../config/menuConfig';
import LinkButton from '../link-button/link-button';

const { confirm } = Modal;
class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTime: Date.now(),
      dayPictureUrl: "",
      weather: ""
    }
  }

  componentDidMount(){
    // 启动定时器
    this.timer = setInterval(() => {
      this.setState({
        currentTime: Date.now()
      })
    }, 1000)

    // 获取天气
    this.getWeather()
  }

  componentWillUnmount(){
    // 清除定时器
    clearInterval(this.timer)
  }

  handleLogout = () => {
    // 显示确认提示
    confirm({
      title: '确认要退出吗？',
      onOk: () => {
        localStorageUtils.removeUser()
        this.props.history.replace("/login")
      },
      onCancel: () => {
        console.log('cancel');
      },
    });
  }


  getTitle = () => {
    let title = ""
    const path = this.props.location.pathname
    menuList.forEach(menu => {
      if(menu.key === path){
        title = menu.title
      }else if(menu.children){
        const cMenu = menu.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cMenu){
          title = cMenu.title
        }
      }
    })
    return title
  }

  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather("广州")
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  render() {
    const user = localStorageUtils.getUser()
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          欢迎，{user.username}
          <LinkButton onClick={this.handleLogout}>退出</LinkButton>
          {/* <span onClick={this.handleLogout}>退出</span> */}
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{formatDate(this.state.currentTime)}</span>
            <img src={this.state.dayPictureUrl} alt="weather"/>
            <span>{this.state.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
