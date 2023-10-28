import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
        // return <Navigate to={'/'} />;
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">
                Mngoc
            </Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Tạo một bài viết</Link>
                        <a onClick={logout}>Đăng Xuất ({username})</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Đăng Nhập</Link>
                        <Link to="/register">Đăng Ký</Link>
                    </>
                )}
            </nav>
        </header>
    );
}