import _ from 'lodash'
import {GET_WEATHER, GET_CITIES, GET_COORDS} from '../../constants'
import initialState from '../../redux/initialState'

export const weatherReducer = (state = initialState.weather, action) => {
  switch (action.type) {
    case `${GET_WEATHER}_PENDING`:
      return {
        ...state,
        isLoading: true,
        cityDetails: null
      }
    case `${GET_WEATHER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        cityDetails: action.payload
      }
    case `${GET_WEATHER}_FAILURE`:
      return {
        ...state,
        isLoading: false,
      }
    case `${GET_COORDS}_PENDING`:
      return {
        ...state,
        isLoading: true,
        coordsDetails: null
      }
    case `${GET_COORDS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        coordsDetails: action.payload
      }
    case `${GET_COORDS}_FAILURE`:
      return {
        ...state,
        isLoading: false,
      }
    case `${GET_CITIES}_PENDING`:
      return {
        ...state,
        isCitiesLoading: true,
        cityList: null,
        cityDetails: null,
        coordsDetails: null
      }
    case `${GET_CITIES}_SUCCESS`:
      return {
        ...state,
        isCitiesLoading: false,
        cityList: action.payload.list
      }
    case `${GET_CITIES}_FAILURE`:
      return {
        ...state,
        isCitiesLoading: false,
      }
    case 'ADD_CITY':
      return {
        ...state,
        cityDetails: null,
        coordsDetails: null,
        cityList: [
          ...state.cityList,
          action.payload
        ],
        cityIds: state.cityIds ? state.cityIds.indexOf(action.payload.id) === -1 ? [...state.cityIds, action.payload.id] : [...state.cityIds] : [action.payload.id]
      }
    case 'REMOVE_CITY':
      const updatedCityList = _.filter(state.cityList, item => item.id !== action.payload.id)
      const updatedCityIds = _.filter(state.cityIds, id => id !== action.payload.id) 
      return {
        ...state,
        cityDetails: null,
        coordsDetails: null,
        cityList: [...updatedCityList],
        cityIds: [...updatedCityIds]
      }
    default:
      return state
  }
}

export const isRehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return state
    default:
      return state
  }
}
