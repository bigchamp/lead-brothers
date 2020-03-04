import React from 'react'
import {Menu} from 'antd'
import { Link } from 'react-router-dom'

import "antd/dist/antd.css";


const Header = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link to="/">Погода</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/about">О проекте</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/contacts">Контакты</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Header