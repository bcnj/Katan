import { db } from '../firebase'
import { GET_GAME } from './actions/types'

//need to figure how to pass this, etc., otherwise functions work
const currentGame = "whatever the current game is"

const getGame = game => ({
  type: GET_GAME,
  game
})

export const getGameThunk = () => {
  return dispatch => {
    db
      .collection('testGames')
      .doc('3q3FiQ9yuZQVwsg7FaqT')
      .get()
      .then(doc => {
        let game = doc.data().game
        const action = getGame(game)
        dispatch(action)
      })
  }
}
