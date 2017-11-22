import { GET_INTERSECTIONS, SET_INTERSECTION } from '../actions/types'

const intersectionsReducer = function(intersections = [], action) {
  switch (action.type) {
    case GET_INTERSECTIONS:
      return action.intersections
    case SET_INTERSECTION:
      const otherIntersections = intersections.filter(
        intersection => intersection.id !== action.intersection.id
      )
      return [...otherIntersections, action.intersection]
    default:
      return intersections
  }
}

export default intersectionsReducer
