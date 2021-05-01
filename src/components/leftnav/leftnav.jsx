import React, { Component } from "react";
// withRouter是非路由组件
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon, Button } from "antd";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;
// class组件
class Leftnav extends Component {
    //   constructor(props) {
    //     super(props);
    //   }
    getMenunodes = (menuList) => {
        // 获取当前的路径
        const path = this.props.location.pathname

        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                );
            } else {
                /* 
                    获取当前的路径，然后循环遍历item.children，如果找到有，
                    就获取当前的item.children的父元素的key的值
                */
                /* 
                    循环item.children,需要找一下有没有当前路径对应的项，如果找到就说明
                    需要展开这个子菜单的父菜单
                */
                //    这个find找到的话是true,找不到的话就是undefined
                const cItem = item.children.find((cItem) => cItem.key == path)

                if (cItem) {
                    // alert(item.key)
                    // 把找到的元素的key保存在openKey中
                    this.openKey = item.key;
                }

                // 如果有下拉菜单（二级路由）
                // 二级菜单要循环一级菜单
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 递归调用自己(它的孩子children) */}
                        {this.getMenunodes(item.children)}
                    </SubMenu>
                );
            }
        });
    };
    componentDidMount () {
        // console.log(this.getMenunodes(menuList));
    }

    componentWillMount () {
        // 在页面渲染之前就已经拿到数据了，这时候的openKey是可以使用的
        this.getNodes = this.getMenunodes(menuList);
    }

    render () {
        //   获取到当前路由的路径名字

        const path = this.props.location.pathname;
        const openKey = this.openKey;
        console.log(path);
        return (
            <div style={{ width: "100%" }}>
                {/* defaultSelectedKeys默认选中的意思
                selectedKeys能拿到当前的选中项 */}
                <Menu
                    selectedKeys={[path]}
                    // defaultSelectedKeys={[path]}
                    defaultOpenKeys={["sub2"]}
                    mode="inline"
                    theme="dark"
                >
                    {/* {this.getMenunodes(menuList)} */}
                    {this.getNodes}
                </Menu>
            </div>
        );
    }
}

// 把这个非路由组件(withRouter)包装成路由组件
// 需要用高阶组件包装
export default withRouter(Leftnav);
