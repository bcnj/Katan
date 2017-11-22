import { db } from '../firebase'
import { GET_INTERSECTIONS, SET_INTERSECTION } from '../actions/types'

//need to figure how to pass this, etc., otherwise the functions work
const currentGame = 'whatever the current game is'

const getIntersections = intersections => ({
  type: GET_INTERSECTIONS,
  intersections
})

const setIntersection = intersection => ({
  type: SET_INTERSECTION,
  intersection
})

export const getIntersectionsThunk = () => {
  return dispatch => {
    db
      .collection('testGames')
      .doc(currentGame)
      .get()
      .then(doc => {
        let intersections = doc.data().intersectionNodes
        console.log(intersections)
        const action = getIntersections(intersections)
        dispatch(action)
      })
  }
}

//three in one
export const setIntersectionThunk = (intersectionId, type) => {
  let intersectionUpdate = {}
  if(type === 'settlement'){
    intersectionUpdate[`intersectionNodes.${intersectionId}.settlement`] = true
  } else if (type === 'city') {
    intersectionUpdate[`intersectionNodes.${intersectionId}.city`] = true
  } else {
    intersectionUpdate[`intersectionNodes.${intersectionId}.name`] = type
  }
  return dispatch => {
    db
      .collection('testGames')
      .doc(currentGame)
      .update(intersectionUpdate)
  }
}
