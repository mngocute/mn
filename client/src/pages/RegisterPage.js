import { useState } from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert('Chúc mừng cậu đã đăng ký thành công ^^');
        } else {
            alert('Ỏoo :< bị lỗi rùi');
        }
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Đăng Ký</h1>
            <input type="text" placeholder="username (tên đăng nhập của cậu)" value={username} onChange={ev => setUsername(ev.target.value)} />
            <input type="password" placeholder="mật khẩu của cậu" value={password} onChange={ev => setPassword(ev.target.value)} />
            <button>Cùng mình viết lên những câu chuyện nhé :3</button>
        </form>
    );
}