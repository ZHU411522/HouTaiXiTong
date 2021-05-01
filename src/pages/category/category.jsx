import React, { Component } from 'react'
import { Card, Button, Icon, Table } from 'antd'
import { reqCategorys } from '../../api'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categorys: [],
            subCategorys: [], // 二级分类数组
            parentId: "0", //分类id   0表示一级分类
            parentName: "", // 分类名称
        }

        // this.getCategorys=this.getCategorys.bind(this)
    }

    /* 
      componentWillMount函数肯定在componentDidMount之前运行，
      前者是文档加载前执行，后者是加载后执行。
    */
    componentWillMount () {
        this.initColumn()
    }

    initColumn () {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                render: (category) => {
                    return (
                        <span>
                            <span>修改分类</span> &nbsp;&nbsp;&nbsp;
                            {/* 查看子分类 */}
                            {this.state.parentId === "0" ? (
                                <span onClick={() => this.showSubCategorys(category)}>
                                    查看子分类
                                </span>
                            ) : null}

                        </span>
                    )
                },
            },
        ]
    }

    //   获取分类列表
    // 传参，传0表示一级分类，传_id表示对应的分类
    getCategorys = async () => {
        const { parentId } = this.state
        const result = await reqCategorys(parentId)
        console.log(result);

        if (result.status === 0) {
            const categorys = result.data;

            if (parentId == '0') {
                this.setState({
                    categorys,
                })
            } else {
                this.setState({
                    subCategorys: categorys,
                })
            }
        }
    }


    // 获取二级分类列表  是根据父分类的id查找的
    showSubCategorys = (categorys) => {
        this.setState({
            // 先改掉分类id和分类名字
            parentId: categorys._id,
            parentName: categorys.name,
        }, () => {//回调
            this.getCategorys();
        })
    }

    // 处理数据
    // 点击一级分类修改状态
    showCategorys = () => {
        this.setState({
            // 分类id
            parentId: "0",
            // 分类名字
            parentName: "",
            subCategorys: [],
        });
    };


    // 这个生命周期用于调用接口
    // 挂载后
    componentDidMount () {
        // 获取刚开始的分类
        this.getCategorys()
    }

    render () {
        // const dataSource = [
        //   {
        //     key: '1',
        //     name: '胡彦斌',
        //     age: 32,
        //     address: '西湖区湖底公园1号',
        //   },
        //   {
        //     key: '2',
        //     name: '胡彦祖',
        //     age: 42,
        //     address: '西湖区湖底公园1号',
        //   },
        // ]

        const { categorys, parentId, subCategorys, parentName } = this.state
        const title = parentId === "0" ? (
            "一级分类"
        ) : (
            <span>
                <span onClick={this.showCategorys}>一级分类</span> --&gt;
                <span>{parentName}</span>
            </span>
        );
        const extra = (
            <span>
                <Button type="primary">
                    <Icon type="plus" />
          添加
        </Button>
            </span>
        )
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={parentId === '0' ? categorys : subCategorys} columns={this.columns} />;
            </Card>
        )
    }
}

export default Category
