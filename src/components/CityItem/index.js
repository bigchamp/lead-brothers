import React from 'react'
import {Col, Card, Row, Button} from 'antd'

import "antd/dist/antd.css";


const CityItem = ({item, onAddCity, onRemoveCity, span, extraType}) => {
  const {coord, name, weather, main, id} = item
  return (
    <Col span={span || 24}>
      <Card
        style={{marginBottom: 10}}
        title={`${name} (${coord.lat}, ${coord.lon})`}
        extra={extraType === 'remove' ? <Button type='danger' onClick={() => onRemoveCity(item)}>Удалить город</Button> : <Button onClick={() => onAddCity(item)}>Добавить город</Button>}
        bordered
      >
        <Row justify="space-between" align="middle">
          Температура: 
          <div>
            <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt="weather icon" />
            {main.temp}
          </div>
        </Row>
        <Row justify="space-between" align="middle">
          Ощущается: 
          <div>
            {main.feels_like}
          </div>
        </Row>
      </Card>
    </Col>
  )
}

export default CityItem