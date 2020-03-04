import React from 'react'
import {Col, Card, Row, Button, Spin} from 'antd'

import CityItem from '../CityItem'

import "antd/dist/antd.css";


const CityList = ({list, onRemoveCity}) => {
  if (!list) return <Spin />
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {list.map(item => <CityItem item={item} extraType="remove" onRemoveCity={onRemoveCity} span={8} />)}
      </Row>
    </div>
  )
}

export default CityList