"use client";

import React, { useState } from "react";

export default function Navbar() {
    const [isNavVisible, setIsNavVisible] = useState(true);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <>
            {/* 导航栏 */}
            <nav className={`navbar ${isNavVisible ? 'visible' : 'hidden'}`}>
                <div className="navbar-content">
                    <div className="logo">MyWebsite</div>
                    <ul className="nav-links">
                        <li><a href="/profile">首页</a></li>
                        <li><a href="/about">关于</a></li>
                        <li><a href="/services">服务</a></li>
                        <li><a href="/contact">联系我们</a></li>
                    </ul>
                </div>
                
                {/* 导航栏切换按钮 - 在导航栏内部下方 */}
                <div className="nav-toggle-inside" onClick={toggleNav}>
                    {isNavVisible ? "▲ 隐藏" : "▼ 显示"}
                </div>
            </nav>
        </>
    );
}
