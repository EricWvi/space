import "./LogIn.css";
import {useReducer, useState} from "react";
import {useNavigate} from "react-router-dom"
import {login} from "../../api/account.js";
import { message } from 'antd';

export default function LogIn() {
    return (
        <div className="login-container">
            <SideImage url="/images/login-pic.jpg">
                在 SPACE,
                <br /> 新的一天。
            </SideImage>
            <div className="content">
                <nav className="auth-nav">
                    <p className="auth-link">
                        还不是 Space 的一员?
                        <br /> 注册
                    </p>
                </nav>
                <div className="b-20"></div>
                <main>
                    <LoginPanel />
                </main>
            </div>
        </div>
    );
}

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            name: "",
            password: "",
        };
    }
    return {
        ...state,
        [event.name]: event.value,
    };
};

function LoginPanel() {
    const navigate = useNavigate();

    const [formData, setFormData] = useReducer(formReducer, {
        name: "Eric",
        password: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = () => {
        setSubmitting(true);
        login(formData.name, formData.password, handleResponse);
    };

    const handleResponse = (body) => {
        setSubmitting(false);
        setFormData({
            reset: true,
        });

        if (undefined === body) {
            message.error("网络错误");
            return;
        }

        if (body.code === 200) {
            message.success("登陆成功");
            localStorage.setItem("token", body.message.token);
            setTimeout(() => {
                // initStore();
                navigate("/");
            }, 1000)
        } else {
            message.error(body.message);
        }
    };

    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };

    return (
        <div className="login-panel">
            <h2>登录账户</h2>
            <form>
                <fieldset>
                    <label>
                        <p>用户名</p>
                        <input
                            className="text-input"
                            name="name"
                            autoComplete="off"
                            disabled={submitting}
                            onChange={handleChange}
                            value={formData.name || ""}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <label className="password">
                        <p>
                            密码
                            <a>忘记密码?</a>
                        </p>
                        <input
                            className="text-input"
                            type="password"
                            name="password"
                            autoComplete="off"
                            disabled={submitting}
                            onChange={handleChange}
                            value={formData.password || ""}
                        />
                    </label>
                </fieldset>
            </form>
            <button className="button"
                    disabled={submitting}
                    onClick={handleSubmit}>
                登 录
            </button>
        </div>
    );
}

const SideImage = ({ children, url }) => {
    return (
        <div
            className="side-image-container"
            style={{ backgroundImage: `url(${url})` }}
        >
            <header>
                <img className="auth-logo" src="/images/icon.svg"></img>
                {children}
            </header>
        </div>
    );
}
