import { BUILD_SETTLEMENT, BUILD_CITY } from '../actions/types'

const initialState = {
  p1_settlement: false,
  p1_city: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}