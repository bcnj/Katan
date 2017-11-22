import { db } from '../firebase'

export const turnRoadsOff = (gameId) => {
  const roadUpdate = {}
  for (let i = 1; i<= 72; i++){
    roadUpdate[`roadNodes.${i}.active`] = false
  }
  db.collection('games').doc(`${gameId}`)
  .update(roadUpdate)
}

export const turnRoadsOn = (currentPlayer, gameId, roadNodes) =>{
  const roadUpdate = {}
  for (let i = 1; i<= 72; i++){
    if(roadNodes[i].player === currentPlayer){
      roadNodes[i].roadNeighbors.forEach( int => {
        if(roadNodes[int].player === '0'){
          roadUpdate[`roadNodes.${int}.active`] = true
        }
      })
    }
  }
  db.collection('games').doc(`${gameId}`)
  .update(roadUpdate)
}

export const buildRoad = (currentPlayer, gameId, roadId) => {       const roadUpdate = {}
  roadUpdate[`roadNodes.${roadId}.player`] = currentPlayer
  db.collection('games').doc(`${gameId}`)
  .update(roadUpdate)
  turnRoadsOff(gameId)
}



export const rollDice = () => {
  console.log('Rolling dice...')
  let dice1 = Math.floor(Math.random() * 6) + 1
  let dice2 = Math.floor(Math.random() * 6) + 1
  const diceSum = dice1 + dice2
  return function(dispatch) {
    let diceRoll = {}
    diceRoll[`game.diceRoll`] = diceSum
    db
      .collection(testCollection)
      .doc(testDoc)
      .update(diceRoll)
      .then(() => console.log('Dice has been rolled'))
      .catch(err => console.log('Error has occured for rolling dice: ', err))
  }
}

/* END TURN
  Player ends turn, switches to next player
  Notes: Change dummyData.game.currentPlayer equal to a number 1 to indicate player1
  endTurn accepts a player as a number and manipulates Firebase store.
*/
// export const endTurn = player => {
//   console.log('end turn ')
//   console.log(`game.currentPlayer`)

//   return function() {
//     let currentPlayer = {}
//     if (player >= 4) {
//       currentPlayer[`game.currentPlayer`] = 1
//       console.log('IF')
//     } else {
//       currentPlayer[`game.currentPlayer`] = player + 1
//     }
//     db
//       .collection(testCollection)
//       .doc(testDoc)
//       .update(currentPlayer)
//   }
// }
/* TODO */
export const distributeCards = function() {
  var ref = db.ref('testGames').child('bryan-test')
}

/* ENABLE BUILD AND TRADE
  enableBuildAndTrade will enable the build and trade button on the player who is indicated by
  'currentPlayer' value in Firebase
*/
export const enableBuildAndTrade = currentPlayerNumber => {
  var key = 'player' + currentPlayerNumber
  console.log('enableBuildAndTrade', key)
  return function() {
    var player = {}
    player[`players.${key}.build`] = true
    player[`players.${key}.trade`] = true
    console.log('player', player)
    db
      .collection(testCollection)
      .doc(testDoc)
      .update(player)
  }
}

/* ENABLE ONLY BUILD
  Similar to enableBuildAndTrade
  enableBuild is ONLY valid for the setup phase where all players will only build settlements
*/
export const enableBuild = currentPlayerNumber => {
  var key = 'player' + currentPlayerNumber
  console.log('enableBuild', key)
  return function() {
    var player = {}
    player[`player.${key}.build`] = true
    db
      .collection(testCollection)
      .doc(testDoc)
      .update(player)
  }
}

/* BUILDING FUNCTIONS FOR ROADS, SETTLEMENTS, AND CITIES */

/* BUILD ROAD FROM BUY PAGE
  Deducts resources required to build road
  No validation to check if player has enough resources
  currentPlayerNumber can be any value from 1 to 4, to indicate player1 to player4
*/
export const buildRoadResource = currentPlayerNumber => {
  var player = 'player' + currentPlayerNumber
  let playerData
  const game = db.collection(testCollection).doc(testDoc)
  return function() {
    game
      .get()
      .then(doc => {
        playerData = doc.data().players[player]
      })
      .then(() => {
        console.log('Grabbed player data...')
        console.log(playerData)
        let updatedPlayerData = {}
        // Reduce player resources
        updatedPlayerData[`players.${player}.brick`] = playerData.brick - 1 // Reduce 1 brick
        updatedPlayerData[`players.${player}.wood`] = playerData.wood - 1 // Reduce 1 brick
        game.update(updatedPlayerData)
      })
  }
}

/* BUILD SETTLEMENT FROM BUY PAGE
*/
export const buildSettlementResource = currentPlayerNumber => {
  var player = 'player' + currentPlayerNumber
  let playerData
  const game = db.collection(testCollection).doc(testDoc)
  return function() {
    game
      .get()
      .then(doc => {
        playerData = doc.data().players[player]
      })
      .then(() => {
        let updatedPlayerData = {}
        // Reduce player resources
        updatedPlayerData[`players.${player}.brick`] = playerData.brick - 1
        updatedPlayerData[`players.${player}.wood`] = playerData.wood - 1
        updatedPlayerData[`players.${player}.wheat`] = playerData.wheat - 1
        updatedPlayerData[`players.${player}.sheep`] = playerData.sheep - 1
        // Add victory points
        updatedPlayerData[`players.${player}.score`] = playerData.score + 1
        // Update Firebase
        game.update(updatedPlayerData)
      })
  }
}

/* BUILD CITY FROM BUY PAGE */
export const buildCityResource = currentPlayerNumber => {
  var player = 'player' + currentPlayerNumber
  let playerData
  const game = db.collection(testCollection).doc(testDoc)
  return function() {
    game
      .get()
      .then(doc => {
        playerData = doc.data().players[player]
      })
      .then(() => {
        let updatedPlayerData = {}
        // Reduce player resources
        updatedPlayerData[`players.${player}.wheat`] = playerData.wheat - 2
        updatedPlayerData[`players.${player}.ore`] = playerData.ore - 3
        // Add victory points
        updatedPlayerData[`players.${player}.score`] = playerData.score + 2
        // Update Firebase
        game.update(updatedPlayerData)
      })
  }
}

/* INITIATE TRADE
  Parameters types:
    initiator & receiver: integers
    offer & exchange: objects containing card types and quantity
*/
export const initiateTrade = (initiator, receiver, offer, exchange) => {
  let initiatorPlayer = 'player' + initiator
  let receiverPlayer = 'player' + receiver
  let initiatorData,
    receiverData,
    updatedInitiatorData = {},
    updatedReceiverData = {}
  const game = db.collection(testCollection).doc(testDoc)
  return function() {
    game
      .get()
      .then(function(doc) {
        initiatorData = doc.data().players[initiatorPlayer]
        receiverData = doc.data().players[receiverPlayer]
      })
      .then(() => {
        console.log('initiatorData', initiatorData)
        console.log('receiverData', receiverData)
      })
      .then(() => {
        let offerKey = Object.keys(offer)
        offerKey.forEach(function(type) {
          updatedInitiatorData[`players.${initiatorPlayer}.${type}`] =
            initiatorData[type] - offer[type] + exchange[type]
          updatedReceiverData[`players.${receiverPlayer}.${type}`] =
            receiverData[type] + offer[type] - exchange[type]
        })
      })
      .then(() =>
        Promise.all([
          game.update(updatedInitiatorData),
          game.update(updatedReceiverData)
        ])
      )
  }
}

