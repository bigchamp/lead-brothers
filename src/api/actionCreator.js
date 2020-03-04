import {weatherAPI} from '.'

export const actionCreator = values => async dispatch => {
  const {method, type, data, url} = values

  dispatch({
    type: `${type}_PENDING`
  })
  try {
    const response = await weatherAPI({
      data: data,
      url: url,
      method: method
    })

    console.log(response)

    if (response && response.status === 200) {
      if (response.data && response.data.status === 'error') {
        dispatch({
          type: `${type}_FAILURE`,
          payload: response.data && (response.data.error || response.data.errors),
          data: data,
          error: true
        })
      } else {
        dispatch({
          type: `${type}_SUCCESS`,
          payload: response.data ? response.data : response
        })
      }
    }
  } catch (err) {
    dispatch({
      type: `${type}_FAILURE`,
      payload: err,
      error: true
    })
  }
}
