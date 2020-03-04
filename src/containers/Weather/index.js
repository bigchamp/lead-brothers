import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Tabs, Input, Spin } from 'antd'
import Search from 'antd/lib/input/Search'

import {CityItem, CityList} from '../../components'

import {getWeatherByCity, getWeatherByCoords, getWeatherInitialCities, addCityId, removeCity} from './actions'
const { TabPane } = Tabs

export class Weather extends Component {
  state = { 
    visible: false, 
    coords: {
      lon: '',
      lat: ''
    }
  };

  componentDidUpdate(prevProps) {
    const {getWeatherInitialCities, cityIds} = this.props

    // if(cityIds !== prevProps.cityIds) {
    //   getWeatherInitialCities(cityIds.toString())
    // }
  }

  componentDidMount() {
    const {getWeatherInitialCities, cityIds} = this.props

    if(cityIds && cityIds.length > 0) {
      getWeatherInitialCities(cityIds.toString())
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onSearchCity = text => {
    const {getWeatherByCity} = this.props
    getWeatherByCity(text)
  }

  onAddCity = item => {
    const {addCityId} = this.props
    addCityId(item)
    this.handleCancel()
  }

  onRemoveCity = item => {
    const {removeCity} = this.props
    removeCity(item)
  }

  onSearchByCoords = () => {
    const {getWeatherByCoords} = this.props
    const {coords} = this.state

    getWeatherByCoords(coords)
  }

  onChangeLat = e => {
    e.persist()
    this.setState(prevState => ({
      coords: {
        ...prevState.coords,
        lat: e.target.value
      }
    }))
  }

  onChangeLon = e => {
    e.persist()
    this.setState(prevState => ({
      coords: {
        ...prevState.coords,
        lon: e.target.value
      }
    }))
  }

  render() {
    const {cityDetails, coordsDetails, isLoading, cityList} = this.props
    const {visible, coords: {lat, lon}} = this.state

    console.log(this.state.coords)
    return (
      <div>
        <h2>Погода</h2>
        <CityList list={cityList} onRemoveCity={this.onRemoveCity} />
        <Button onClick={this.showModal}>Добавить город</Button>
        <Modal
          title="Добавить город"
          visible={visible}
          onCancel={this.handleCancel}
          cancelText="Закрыть"
        >
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Поиск города по названию" key="1" style={{ minHeight: 200 }} >
              <Search
                style={{marginBottom: 20}}
                placeholder="Напишите название города"
                onSearch={this.onSearchCity}
              />
              <div>
                {isLoading && <Spin size="large" />}
                {cityDetails && <CityItem item={cityDetails} onAddCity={this.onAddCity} />}
              </div>
            </TabPane>
            <TabPane tab="Поиск по координатам" key="2">
            <div>
            <Input
              style={{width: 75, marginBottom: 20, marginRight: 10}}
              placeholder="lat"
              onChange={this.onChangeLat}
              maxLength={6}
            />
            <Input
              style={{width: 75, marginBottom: 20, marginRight: 10}}
              placeholder="lon"
              onChange={this.onChangeLon}
              maxLength={6}
            />
            <Button disabled={!lat || !lon} onClick={this.onSearchByCoords}>Поиск</Button>
            </div>
            <div>
              {isLoading && <Spin size="large" />}
              {coordsDetails && <CityItem item={coordsDetails} onAddCity={this.onAddCity} />}
            </div>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cityDetails: state.weatherReducer.cityDetails,
  coordsDetails: state.weatherReducer.coordsDetails,
  isLoading: state.weatherReducer.isLoading,
  cityIds: state.weatherReducer.cityIds,
  cityList: state.weatherReducer.cityList,
})

const mapDispatchToProps = dispatch => ({
  addCityId: id => dispatch(addCityId(id)),
  removeCity: item => dispatch(removeCity(item)),
  getWeatherByCity: (...args) => dispatch(getWeatherByCity(...args)),
  getWeatherInitialCities: (...args) => dispatch(getWeatherInitialCities(...args)),
  getWeatherByCoords: (...args) => dispatch(getWeatherByCoords(...args)),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Weather)
