import {
  BUILD_CITY,
  BUILD_SETTLEMENT,
  FETCH_ALL_GAMES,
  CREATE_GAME,
  END_GAME,
  SET_PLAYER,
  SET_USER,
  FETCH_ONE_GAME,
  ROLL_DICE,
  END_TURN
} from './types'
import { db } from '../firebase'
import dummyData from '../dummyData'

// const gamesRef = db.collection('games')
const gamesRef = db.collection('testGames')

// build
// export const buildSettlement = () => ({
//   type: BUILD_SETTLEMENT,
//   p1_settlement: true
// })
// export const buildCity = () => ({ type: BUILD_CITY, p1_city: true })

// game
export const fetchGames = () => dispatch =>
  db.collection('testGames').onSnapshot(snap => {
    console.log('snap', snap)
    dispatch({
      type: FETCH_ALL_GAMES,
      payload: snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  })

export const fetchSingleGame = id => dispatch =>
  db
    .collection('testGames')
    .doc(`${id}`)
    .onSnapshot(snap => {
      dispatch({
        type: FETCH_ONE_GAME,
        payload: snap.data()
      })
    })

export const setUser = payload => ({
  type: SET_USER,
  payload
})

export const setPlayer = payload => ({})

/* 
  FUNCTIONS BEGIN HERE
*/

/* Firebase collection and document current points to testing database
***** Change testCollection and testDoc to point towards intended Firebase collection/document *****
*/
const testCollection = 'testGames'
const testDoc = 'bryan-test'

/* DICE ROLLING
  Generates a random dice roll using 2 pairs of random numbers from 1 to 6
*/
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
export const endTurn = player => {
  console.log('end turn ')
  console.log(`game.currentPlayer`)

  return function() {
    let currentPlayer = {}
    if (player >= 4) {
      currentPlayer[`game.currentPlayer`] = 1
      console.log('IF')
    } else {
      currentPlayer[`game.currentPlayer`] = player + 1
    }
    db
      .collection(testCollection)
      .doc(testDoc)
      .update(currentPlayer)
  }
}
/* DISTRIBUTE CARDS
  Accepts a dice roll number (1 - 12) and updates all player resources in Firebase
  
  HOW TO TEST
  Within game instance object in Firebase, navigate to tileNodes and find corresponding rollNumber that is being tested
  See all possible children (intersection nodes) associated with this tileNode
  Navigate to intersectionNodes to and adjust 'player' to value of '1', '2', '3', or '4'
  Set value of 'settlement' OR 'city' to true
  Test by clicking 'Distribute Cards' in localhost:3000 and observe affected player objects to see updated resources
*/
export const distributeCards = function(rollNumber) {
  let tiles = [] // Tiles correlating to rollNumber
  return function() {
    const gameInstance = db.collection(testCollection).doc(testDoc)
    gameInstance.get().then(doc => {
      console.log('doc.data', doc.data().tileNodes)
      // console.log('all players', doc.data().players)
      // clone all players into separate object
      var allPlayers = Object.assign({}, doc.data().players)
      let updatedGameInstance = {}
      // updatedGameInstance[`players`] = {}// Clone players object only in here
      console.log('allPlayers', allPlayers)
      let { tileNodes, intersectionNodes } = doc.data()
      let tileKeys = Object.keys(tileNodes)
      console.log('tileKeys', tileKeys)
      console.log('tileNodes', tileNodes)
      // Collect all tiles into 'tiles' array whose rollNumber matches current dice value rolled
      tileKeys.forEach(function(key) {
        if (tileNodes[key].rollNumber === rollNumber) {
          tiles.push(tileNodes[key])
        }
      })
      console.log('tiles', tiles)
      // Loop through all tiles with matching rollNumber
      tiles.forEach(function(tile) {
        // Loop through all intersection nodes of tile
        tile.children.forEach(function(intersectionNode) {
          // console.log("HELLO")
          // console.log('tile.resource', tile.resource)
          // console.log('intersectionNode', intersectionNode)
          // Reference to current single intersectionNode object within intersectionNodes(plural) object containing all intersecitons
          const intersection = intersectionNodes[intersectionNode]
          // If a player exists on this intersection
          if (intersection.player !== '0') {
            console.log('Player', intersection.player, 'receives resources!')
            // Creating reference to player with provided integer ie: (1, 2, 3, 4) -> (player1, player2, player3, player4)
            let playerReference = 'player' + intersection.player // if intersection.player = 1, playerReference = 'player1'
            // tile.resource refers to tileNodes>(intenger)>children>resource
            // Currenly listed in all caps, converted to lowercase here to easily refer to resource in player object
            /* SUGGESTION: Change resources in capitals to lowercase ie: (ORE -> ore) */
            let tileResourceReference = tile.resource.toLowerCase();
            // If this intersection contains a SETTLEMENT
            if (intersection.settlement === true) {
              // Award 1 resource to playerReference
              console.log('Player', intersection.player, 'received', 1, tile.resource)
              allPlayers[playerReference][tileResourceReference] += 1
            } 
            // If this intersection contains a CITY
            else if (intersection.city === true) {
              // Award 2 resources to playerReference
              allPlayers[playerReference][tileResourceReference] += 2
              console.log('Player', intersection.player, 'received', 2, tile.resource)
            }
          }
        })
      })
      // Logs updated players object
      console.log(allPlayers)
      // Overwrite updated player values in Firebase 'players' object
      updatedGameInstance[`players`] = allPlayers
      // Updates 'player' object in Firebase game instance
      gameInstance.update(updatedGameInstance) 
    })
  }
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
export const buildRoad = currentPlayerNumber => {
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
export const buildSettlement = currentPlayerNumber => {
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
export const buildCity = currentPlayerNumber => {
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
  let initiatorPlayer = 'player' + initiator // ie: player1
  let receiverPlayer = 'player' + receiver
  let initiatorData, // Empty
    receiverData,
    updatedInitiatorData = {},
    updatedReceiverData = {}
  const gameInstance = db.collection(testCollection).doc(testDoc)
  return function() {
    gameInstance
      .get() // Get entire game instance object
      .then(doc => {
        initiatorData = doc.data().players[initiatorPlayer] // Get player data for trade initiator
        receiverData = doc.data().players[receiverPlayer] // Get player data for trade receiver
      })

      .then(() => {
        console.log('initiatorData', initiatorData) // Test log
        console.log('receiverData', receiverData)
      })
      .then(() => {
        let offerKey = Object.keys(offer) // offerKey = ['brick', 'ore', 'sheep', 'wheat', 'wood'];
        offerKey.forEach(function(type) { // Use offerKey to loop over only cardTypes in player data object to adjust
          updatedInitiatorData[`players.${initiatorPlayer}.${type}`] = // 
            initiatorData[type] - offer[type] + exchange[type]
          updatedReceiverData[`players.${receiverPlayer}.${type}`] =
            receiverData[type] + offer[type] - exchange[type]
        })
      })
      .then(() =>
        Promise.all([
          gameInstance.update(updatedInitiatorData),
          gameInstance.update(updatedReceiverData)
        ])
      )
  }
}
