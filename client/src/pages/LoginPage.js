import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert('Hình như cậu đã ghi nhầm mật khẩu hoặc username nhỉ?');
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />;
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Đăng Nhập</h1>
            <input type="text" placeholder="username (tên đăng nhập của cậu)"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <input type="password" placeholder="mật khẩu của cậu"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button>Cùng viết với mình nào:3</button>
        </form>
    );
}