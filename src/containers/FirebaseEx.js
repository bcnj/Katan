import { db } from '../firebase'

//this works but it is necessary that we make it less convoluted to simply get to the game,
//as of now it does not make sense to query for anything even mildly nested


//gets all data from firestore, we would need to save a reference to the
//game to properly grab the doc reference in the future
var gameUpdate = {};
gameUpdate[`game.currentPlayer`] = 'Claire';

let ref = db.collection('games').doc('Rl197rMEsQZkcoK1Qaws')
ref
  .update(gameUpdate)
  .then(data => {
    if (!data.exists) {
      console.log('No such dataument!')
    } else {
      console.log('dataument data:', data.data().game)
    }
  })
  .catch(err => {
    console.log('Error getting document', err)
  })
