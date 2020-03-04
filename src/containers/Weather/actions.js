import {GET_WEATHER, GET_CITIES, GET_COORDS} from '../../constants'
import {actionCreator} from '../../api/actionCreator'

export const getWeatherByCity = query =>
  actionCreator({
    type: GET_WEATHER,
    url: '/weather',
    data: {
      q: query
    }
  })

export const getWeatherByCoords = data =>
  actionCreator({
    type: GET_COORDS,
    url: '/weather',
    data: data
  })

export const getWeatherInitialCities = ids =>
  actionCreator({
    type: GET_CITIES,
    url: '/group',
    data: {
      id: ids
    }
  })


export const addCityId = item => dispatch => {
  dispatch({
    type: 'ADD_CITY',
    payload: item
  })
}

export const removeCity = item => dispatch => {
  dispatch({
    type: 'REMOVE_CITY',
    payload: item
  })
}

