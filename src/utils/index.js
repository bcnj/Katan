import { db } from '../firebase'

export const turnRoadsOff = gameId => {
  const roadUpdate = {}
  for (let i = 1; i <= 72; i++) {
    roadUpdate[`roadNodes.${i}.active`] = false
  }
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(roadUpdate)
}

export const turnRoadsOn = (currentPlayer, gameId, roadNodes) => {
  const roadUpdate = {}
  for (let i = 1; i <= 72; i++) {
    if (roadNodes[i].player === currentPlayer) {
      roadNodes[i].roadNeighbors.forEach(int => {
        if (roadNodes[int].player === '0') {
          roadUpdate[`roadNodes.${int}.active`] = true
        }
      })
    }
  }
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(roadUpdate)
}

export const buildRoad = (currentPlayer, gameId, roadId) => {
  const roadUpdate = {}
  roadUpdate[`roadNodes.${roadId}.player`] = currentPlayer
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(roadUpdate)
  buildRoadResource(currentPlayer, gameId)
  turnRoadsOff(gameId)
}

export const turnIntersectionOff = gameId => {
  const intersectionUpdate = {}
  for (let i = 1; i <= 72; i++) {
    intersectionUpdate[`intersectionNodes.${i}.active`] = false
  }
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(intersectionUpdate)
}

export const turnSettlementOn = (
  currentPlayer,
  gameId,
  intersectionNodes,
  roadNodes
) => {
  const settlementUpdate = {}
  for (let i = 1; i <= 54; i++) {
    if (
      intersectionNodes[i].player === '0' &&
      !intersectionNodes[i].neighbors.find(
        n => intersectionNodes[n].player !== '0'
      ) &&
      intersectionNodes[i].roadNeighbors.find(
        n => roadNodes[n].player === currentPlayer
      )
    ) {
      settlementUpdate[`intersectionNodes.${i}.active`] = true
    }
  }
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(settlementUpdate)
}

export const turnCityOn = (currentPlayer, gameId, intersectionNodes) => {
  const cityUpdate = {}
  for (let i = 1; i <= 54; i++) {
    if (
      intersectionNodes[i].player === currentPlayer &&
      intersectionNodes[i].city === false &&
      intersectionNodes[i].settlement === true
    ) {
      cityUpdate[`intersectionNodes.${i}.active`] = true
    }
  }
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(cityUpdate)
}

export const buildSettlement = (currentPlayer, gameId, intersectionId) => {
  const settlementUpdate = {}
  settlementUpdate[`intersectionNodes.${intersectionId}.player`] = currentPlayer
  settlementUpdate[`intersectionNodes.${intersectionId}.settlement`] = true
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(settlementUpdate)
  buildSettlementResource(currentPlayer, gameId)
  turnIntersectionOff(gameId)
}

export const buildCity = (currentPlayer, gameId, intersectionId) => {
  const cityUpdate = {}
  cityUpdate[`intersectionNodes.${intersectionId}.city`] = true
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(cityUpdate)
  buildCityResource(currentPlayer, gameId)
  turnIntersectionOff(gameId)
}


export const rollDice = (diceSum, gameId) => {
    const diceRoll = {}
    diceRoll[`game.diceRoll`] = diceSum
    db.collection('games').doc(`${gameId}`)
      .update(diceRoll)
      .then(() => console.log('Dice has been rolled'))
      .catch(err => console.log('Error has occured for rolling dice: ', err))
}

export const distributeResources = (diceCount, gameId, tileNodes, intersectionNodes) => {
  // const resourceUpdate = {}
  let playerData
  for (let i = 1; i<= 19; i++){
    if(tileNodes[i].rollNumber === diceCount && tileNodes[i].resource !== 'dessert'){
    tileNodes[i].children.forEach(n => {
      let intersection = intersectionNodes[n]
      let currentTile = tileNodes[i]
      // has a city
      if (intersection.city){
        console.log('iam HERE')
        let game = db.collection('games').doc(gameId)
        game
        .get()
        .then(doc => {
          playerData = doc.data().players[intersection.player]
        })
        .then(() => {
          let updateResourceForCity = {}
          updateResourceForCity[`players.${intersection.player}.${currentTile.resource}`] = playerData[`${currentTile.resource}`] + 2 // Add 2 resources
          game.update(updateResourceForCity)
        })
      }
      // has a settlement
      else if (intersection.settlement){
        let game = db.collection('games').doc(gameId)
        game
        .get()
        .then(doc => {
          playerData = doc.data().players[intersection.player]
        })
        .then(() => {
          let updateResourceForSet = {}
          updateResourceForSet[`players.${intersection.player}.${currentTile.resource}`] = playerData[currentTile.resource] + 1 // Add 2 resources
          game.update(updateResourceForSet)
        })
      }
    })
  }
}}


// /* END TURN
//   Player ends turn, switches to next player
//   Notes: Change dummyData.game.currentPlayer equal to a number 1 to indicate player1
//   endTurn accepts a player as a number and manipulates Firebase store.
// */
// // export const endTurn = player => {
// //   console.log('end turn ')
// //   console.log(`game.currentPlayer`)

// //   return function() {
// //     let currentPlayer = {}
// //     if (player >= 4) {
// //       currentPlayer[`game.currentPlayer`] = 1
// //       console.log('IF')
// //     } else {
// //       currentPlayer[`game.currentPlayer`] = player + 1
// //     }
// //     db
// //       .collection(testCollection)
// //       .doc(testDoc)
// //       .update(currentPlayer)
// //   }
// // }
// /* TODO */
// export const distributeCards = function() {
//   var ref = db.ref('testGames').child('bryan-test')
// }

// /* ENABLE BUILD AND TRADE
//   enableBuildAndTrade will enable the build and trade button on the player who is indicated by
//   'currentPlayer' value in Firebase
// */
// export const enableBuildAndTrade = currentPlayerNumber => {
//   var key = 'player' + currentPlayerNumber
//   console.log('enableBuildAndTrade', key)
//   return function() {
//     var player = {}
//     player[`players.${key}.build`] = true
//     player[`players.${key}.trade`] = true
//     console.log('player', player)
//     db
//       .collection(testCollection)
//       .doc(testDoc)
//       .update(player)
//   }
// }

// /* ENABLE ONLY BUILD
//   Similar to enableBuildAndTrade
//   enableBuild is ONLY valid for the setup phase where all players will only build settlements
// */
// export const enableBuild = currentPlayerNumber => {
//   var key = 'player' + currentPlayerNumber
//   console.log('enableBuild', key)
//   return function() {
//     var player = {}
//     player[`player.${key}.build`] = true
//     db
//       .collection(testCollection)
//       .doc(testDoc)
//       .update(player)
//   }
// }

/* BUILDING FUNCTIONS FOR ROADS, SETTLEMENTS, AND CITIES */

/* BUILD ROAD FROM BUY PAGE
  Deducts resources required to build road
  No validation to check if player has enough resources
  currentPlayerNumber can be any value from 1 to 4, to indicate player1 to player4
*/

export const buildRoadResource = (currentPlayer, gameId) => {
  let playerData
  let game = db.collection('games').doc(gameId)
  game
    .get()
    .then(doc => {
      playerData = doc.data().players[currentPlayer]
    })
    .then(() => {
      let updatedPlayerData = {}
      // Reduce player resources
      updatedPlayerData[`players.${currentPlayer}.brick`] = playerData.brick - 1 // Reduce 1 brick
      updatedPlayerData[`players.${currentPlayer}.wood`] = playerData.wood - 1 // Reduce 1 brick
      game.update(updatedPlayerData)
    })
}

/* BUILD SETTLEMENT FROM BUY PAGE
*/
export const buildSettlementResource = (currentPlayer, gameId) => {
  let playerData
  const game = db.collection('games').doc(gameId)
  game
    .get()
    .then(doc => {
      playerData = doc.data().players[currentPlayer]
    })
    .then(() => {
      let updatedPlayerData = {}
      // Reduce player resources
      updatedPlayerData[`players.${currentPlayer}.brick`] = playerData.brick - 1
      updatedPlayerData[`players.${currentPlayer}.wood`] = playerData.wood - 1
      updatedPlayerData[`players.${currentPlayer}.wheat`] = playerData.wheat - 1
      updatedPlayerData[`players.${currentPlayer}.sheep`] = playerData.sheep - 1
      updatedPlayerData[`players.${currentPlayer}.score`] = playerData.score + 1
      game.update(updatedPlayerData)
    })
}

/* BUILD CITY FROM BUY PAGE */
export const buildCityResource = (currentPlayer, gameId) => {
  let playerData
  const game = db.collection('games').doc(gameId)
  game
    .get()
    .then(doc => {
      playerData = doc.data().players[currentPlayer]
    })
    .then(() => {
      let updatedPlayerData = {}
      // Reduce player resources
      updatedPlayerData[`players.${currentPlayer}.wheat`] = playerData.wheat - 2
      updatedPlayerData[`players.${currentPlayer}.ore`] = playerData.ore - 3
      updatedPlayerData[`players.${currentPlayer}.score`] = playerData.score + 1
      // Update Firebase
      game.update(updatedPlayerData)
    })
}

// /* INITIATE TRADE
//   Parameters types:
//     initiator & receiver: integers
//     offer & exchange: objects containing card types and quantity
// */
// export const initiateTrade = (initiator, receiver, offer, exchange) => {
//   let initiatorPlayer = 'player' + initiator
//   let receiverPlayer = 'player' + receiver
//   let initiatorData,
//     receiverData,
//     updatedInitiatorData = {},
//     updatedReceiverData = {}
//   const game = db.collection(testCollection).doc(testDoc)
//   return function() {
//     game
//       .get()
//       .then(function(doc) {
//         initiatorData = doc.data().players[initiatorPlayer]
//         receiverData = doc.data().players[receiverPlayer]
//       })
//       .then(() => {
//         console.log('initiatorData', initiatorData)
//         console.log('receiverData', receiverData)
//       })
//       .then(() => {
//         let offerKey = Object.keys(offer)
//         offerKey.forEach(function(type) {
//           updatedInitiatorData[`players.${initiatorPlayer}.${type}`] =
//             initiatorData[type] - offer[type] + exchange[type]
//           updatedReceiverData[`players.${receiverPlayer}.${type}`] =
//             receiverData[type] + offer[type] - exchange[type]
//         })
//       })
//       .then(() =>
//         Promise.all([
//           game.update(updatedInitiatorData),
//           game.update(updatedReceiverData)
//         ])
//       )
//   }
// }

export const purchaseDevCard = (player, gameId) => {
  const game = db.collection('games').doc(gameId)
  let resourceUpdate = {}
  game.get().then(doc => {
    let prevOre = doc.data().players[player].ore,
      prevWheat = doc.data().players[player].wheat,
      prevSheep = doc.data().players[player].sheep
    resourceUpdate[`players.${player}.ore`] = prevOre - 1
    resourceUpdate[`players.${player}.sheep`] = prevSheep - 1
    resourceUpdate[`players.${player}.wheat`] = prevWheat - 1
    game.update(resourceUpdate)
  })
}

export const deleteSpecificDevCard = (cardId, player, gameId) => {
  const game = db.collection('games').doc(gameId)
  let deleteDevCard = {}
  game.get().then(doc => {
    let devCards = doc.data().players[player].devCards,
      count = 0,
      newDevCards = []
    devCards.forEach(card => {
      if (count === 0 && card === cardId) {
        count++
      } else newDevCards.push(card)
    })
    deleteDevCard[`players.${player}.devCards`] = newDevCards
    game.update(deleteDevCard)
  })
}

export const shuffle = arr => {
  return arr.sort(function(a, b) {
    return 0.5 - Math.random()
  })
}

export const useKnightTakeCard = (gameId, taker, victim) => {
  const game = db.collection('games').doc(gameId)
  game.get().then(doc => {
    let cards = ['ore', 'sheep', 'wheat', 'wood', 'brick'],
      shuffled = shuffle(cards),
      check = true,
      i = 0
    while (check) {
      if (doc.data().players[`player${victim}`][cards[i]] > 0) {
        check = false
      } else {
        i++
      }
      if (i === shuffled.length) check = false
    }
    if (i !== shuffled.length) {
      let victimLoseCard = doc.data().players[`player${victim}`][cards[i]] - 1,
        takerGetCard = doc.data().players[`player${taker}`][cards[i]] + 1,
        victimLoseCardUpdate = {}
      victimLoseCardUpdate[
        `players.player${victim}.${cards[i]}`
      ] = victimLoseCard
      let takerGetCardUpdate = {}
      takerGetCardUpdate[`players.player${taker}.${cards[i]}`] = takerGetCard
      game.update(victimLoseCardUpdate)
      game.update(takerGetCardUpdate)
    }
  })
}

export const getOptions = (game, currentPlayerId) => {
  var intersections = game.intersectionNodes
  var tiles = game.tileNodes
  var intersectionKeyPlayerValue = {}
  for (let intersection in intersections) {
    if (intersections[intersection].player !== '0') {
      intersectionKeyPlayerValue[intersection] =
        intersections[intersection].player
    }
  }
  //checkForTileWithIntersectionKey
  var options = [],
    tileObj = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
      16: [],
      17: [],
      18: [],
      19: []
    },
    option = {},
    tempTile = '',
    tempPlayer = ''
  for (let tile in tiles) {
    tiles[tile].children.forEach(child => {
      for (let intersection in intersectionKeyPlayerValue) {
        if (child === intersection) {
          option = {}
          option[intersectionKeyPlayerValue[intersection]] = intersection
          tileObj[tile].push(option)
        }
      }
    })
  }
  for (let tile in tileObj) {
    let playerKey = []
    option = {}
    option.value = {}
    option.value.tile = tile
    option.value.players = tileObj[tile]
    if (tileObj[tile].length > 1) {
      option.text = 'Tile: ' + tile + ' ' + 'Players: '
      tileObj[tile].forEach(player => {
        playerKey = Object.keys(player)
        option.text += playerKey[0] + ' '
      })
    } else if (tileObj[tile].length === 1) {
      playerKey = Object.keys(tileObj[tile][0])
      option.text = 'Tile: ' + tile + ' ' + 'Players: ' + playerKey[0]
    } else {
      option.text = 'Tile: ' + tile + ' ' + 'No players'
    }
    options.push(option)
  }
  return options
}
//updates message start property - used so as to have only 13 messages at a time
export const updateMessageStart = () => {
  const gameId = window.location.href.slice(-20)
  const game = db.collection('games').doc(gameId)
  let updateMessageStartData = {}
  game.get().then(doc => {
    let messageStart = doc.data().game.messageStart
    messageStart = messageStart + 1
    updateMessageStartData[`game.messageStart`] = messageStart
    game.update(updateMessageStartData)
  })
}
