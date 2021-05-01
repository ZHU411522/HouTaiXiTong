import React, { Component } from 'react'
import './header.css'
import { Modal, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { formatData } from '../../utils/dataUtils'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'

const { confirm } = Modal
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: formatData(Date.now()),
    }
  }

  componentDidMount() {
    this.getTime()
  }

  getTime = () => {
    setInterval(() => {
      // 每次都执行下
      const currentTime = formatData(Date.now())
      // 设置状态
      this.setState({
        currentTime: currentTime,
      })
    }, 1000)
  }

  // 当前的位置
  getTitle = () => {
    // console.log(this.props.location.pathname)

    // 不是路由组件
    const path = this.props.location.pathname
    let title
    // 循环菜单
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title
        // console.log(title)
      } else if (item.children) {
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) == 0
        )
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  //   退出登录
  loginout = () => {
    Modal.confirm({
      content: '确定退出吗',
      onOk: () => {
        console.log('OK', this)
        //   删除保存的user数据
        storageUtils.removeUser()

        // 跳转到login
        this.props.history.replace('/login')
      },
    })
  }

  render() {
    const { currentTime } = this.state
    const title = this.getTitle()
    return (
      <div className="header">
        <span>当前时间:{currentTime}</span>
        <span>当前的位置是:{title}</span>
        <Button type="primary" onClick={this.loginout}>
          退出登陆
        </Button>
      </div>
    )
  }
}

// 把这个非路由组件(withRouter)包装成路由组件
// 需要用高阶组件包装
export default withRouter(Header)
