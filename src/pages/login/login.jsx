import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { Redirect } from "react-router-dom";
import Header from "./header/header";
import "./login.css";
// import ajax from "../../api/ajax";
import { reqLogin } from "../../api";
import StoreUtils from "../../utils/storageUtils";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                const { username, password } = values;
                const result = await reqLogin(username, password);
                console.log(result);
                if (result.status === 0) {
                    message.success("登录成功");
                    StoreUtils.saveUser(result.data);
                    this.props.history.push("/");
                } else {
                    message.error(result.msg);
                }
            }
        });
    };
    validatorPwd = (rule, value, callback) => {
        if (!value) {
            callback("密码不能为空");
        } else if (value.length < 5) {
            callback("密码不能小于5位");
        } else if (value.length > 16) {
            callback("密码不能大于16位");
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是数字字母下划线");
        } else {
            callback();
        }
    };
    render () {
        const user = StoreUtils.getUser() || "";
        if (user && user._id) {
            return <Redirect to="/" />;
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login_box">
                <Header />
                <div className="login_content">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator("username", {
                                rules: [
                                    { required: true, message: "用户名不能为空" },
                                    { min: 5, message: "最少5为" },
                                    { max: 5, message: "最多16为" },
                                    {
                                        pattern: /^[a-zA-Z0-9_]+$/,
                                        message: "用户名必须是字母数字下划线",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                    }
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        validator: this.validatorPwd,
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                登录
              </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
// 高阶组件表示函数中传入一个组件，返回一个新的组件
