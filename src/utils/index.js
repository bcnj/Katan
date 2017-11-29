import { db } from '../firebase'
import { createDevCards, shuffle } from '../helpers.js'

export const turnRoadsOff = gameId => {
  const roadUpdate = {}
  for (let i = 1; i <= 72; i++) {
    roadUpdate[`roadNodes.${i}.active`] = false
  }
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(roadUpdate)
    .catch(err=>console.log('Did not turn roads off', err))
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
    .catch(err=>console.log('Did not turn roads on', err))
}

export const turnRoadsOnInit = (
  currentPlayer,
  gameId,
  roadNodes,
  intersectionNodes
) => {
  const roadUpdate = {}
  for (let i = 1; i <= 54; i++) {
    // find all intersection with settlement
    if (intersectionNodes[i].player === currentPlayer) {
      intersectionNodes[i].roadNeighbors.forEach(n => {
        if (roadNodes[n].player === '0') {
          roadUpdate[`roadNodes.${n}.active`] = true
        }
      })
    }
  }
  roadUpdate[`players.${currentPlayer}.trade`] = false
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(roadUpdate)
    .catch(err=>console.log('Did not turn roads on in initial phase', err))
}

export const buildRoad = (currentPlayer, gameId, roadId, turn, currentGame) => {
  const roadUpdate = {}
  roadUpdate[`roadNodes.${roadId}.player`] = currentPlayer
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(roadUpdate)
    .catch(err=>console.log('Road was not build', err))
  turnRoadsOff(gameId)
  if (turn >= 8) {
    buildRoadResource(currentPlayer, gameId)
  } else {
    endTurn(turn, currentPlayer, gameId)
    if (turn === 7) {
      distributeResourcesInit(
        gameId,
        currentGame.tileNodes,
        currentGame.intersectionNodes,
        currentGame.players
      )
    }
  }
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
    .catch(err=>console.log('Intersections were not turned off', err))
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
    .catch(err=>console.log('Settlements were not turned on', err))
}

export const turnSettlementOnInit = (
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
      )
    ) {
      settlementUpdate[`intersectionNodes.${i}.active`] = true
    }
  }
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(settlementUpdate)
    .catch(err=>console.log('Initial settlement was not built', err))
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
    .catch(err=>console.log('City was not turned on', err))
}

export const buildSettlement = (
  currentPlayer,
  gameId,
  intersectionId,
  turn
) => {
  const settlementUpdate = {}
  settlementUpdate[`intersectionNodes.${intersectionId}.player`] = currentPlayer
  settlementUpdate[`intersectionNodes.${intersectionId}.settlement`] = true
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(settlementUpdate)
    .catch(err=>console.log('Did not build settlement', err))
  turnIntersectionOff(gameId)
  if (turn >= 8) {
    buildSettlementResource(currentPlayer, gameId)
    //trigger nextTurn button
  } else {
    let playerData
    const game = db.collection('games').doc(gameId)
    game
      .get()
      .then(doc => {
        playerData = doc.data().players[currentPlayer]
      })
      .then(() => {
        let updatedPlayerData = {}
        updatedPlayerData[`players.${currentPlayer}.score`] =
          playerData.score + 1
        game.update(updatedPlayerData)
        .catch(err=>console.log('Did not build settlement', err))
      })
  }
}

export const buildCity = (currentPlayer, gameId, intersectionId) => {
  const cityUpdate = {}
  cityUpdate[`intersectionNodes.${intersectionId}.city`] = true
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(cityUpdate)
    .catch(err=>console.log('City not built', err))
  turnIntersectionOff(gameId)
  buildCityResource(currentPlayer, gameId)
}

export const rollDice = (diceSum, gameId) => {
  const diceRoll = {}
  diceRoll[`game.diceRoll`] = diceSum
  db
    .collection('games')
    .doc(`${gameId}`)
    .update(diceRoll)
    .then(() => console.log('Dice has been rolled'))
    .catch(err => console.log('Error has occured for rolling dice: ', err))

  //I need to work here to update for close modal with robber
  if (diceSum === 7) {
    const game = db.collection('games').doc(gameId)
    let player1UpdateModalOpen = {},
      player2UpdateModalOpen = {},
      player3UpdateModalOpen = {},
      player4UpdateModalOpen = {}

    player1UpdateModalOpen[`players.player1.modalOpen`] = true
    player2UpdateModalOpen[`players.player2.modalOpen`] = true
    player3UpdateModalOpen[`players.player3.modalOpen`] = true
    player4UpdateModalOpen[`players.player4.modalOpen`] = true
    game.update(player1UpdateModalOpen).catch(err=>console.log('Modal close error, robber', err))
    game.update(player2UpdateModalOpen).catch(err=>console.log('Modal close error, robber', err))
    game.update(player3UpdateModalOpen).catch(err=>console.log('Modal close error, robber', err))
    game.update(player4UpdateModalOpen).catch(err=>console.log('Modal close error, robber', err))
  }
}

export const distributeResources = (
  diceCount,
  gameId,
  tileNodes,
  intersectionNodes
) => {
  // const resourceUpdate = {}
  let playerData
  for (let i = 1; i <= 19; i++) {
    if (
      tileNodes[i].rollNumber === diceCount &&
      tileNodes[i].resource !== 'dessert'
    ) {
      tileNodes[i].children.forEach(n => {
        let intersection = intersectionNodes[n]
        let currentTile = tileNodes[i]
        // has a city
        if (intersection.city) {
          let game = db.collection('games').doc(gameId)
          game
            .get()
            .then(doc => {
              playerData = doc.data().players[intersection.player]
            })
            .then(() => {
              let updateResourceForCity = {}
              updateResourceForCity[
                `players.${intersection.player}.${currentTile.resource}`
              ] =
                playerData[`${currentTile.resource}`] + 2 // Add 2 resources
              game.update(updateResourceForCity).catch(err=>console.log('Player did not recieve the two resources specified', 'resource: ', currentTile.resource, 'intersection.player: ', intersection.player, err))
            })
        } else if (intersection.settlement) {
          // has a settlement
          let game = db.collection('games').doc(gameId)
          game
            .get()
            .then(doc => {
              playerData = doc.data().players[intersection.player]
            })
            .then(() => {
              let updateResourceForSet = {}
              updateResourceForSet[
                `players.${intersection.player}.${currentTile.resource}`
              ] =
                playerData[currentTile.resource] + 1 // Add 1 resource
              game.update(updateResourceForSet)
              .catch(err=>console.log('Player did not recieve the two resources specified', 'resource: ', currentTile.resource, 'intersection.player: ', intersection.player, err))
            })
        }
      })
    }
  }
}

export const distributeResourcesInit = (
  gameId,
  tileNodes,
  intersectionNodes,
  players
) => {
  let resourceUpdate = {}
  // let game = db.collection('games').doc(gameId)
  for (let i = 1; i <= 19; i++) {
    tileNodes[i].children.forEach(n => {
      let intersection = intersectionNodes[n]
      let currentTile = tileNodes[i]
      if (intersection.settlement && currentTile.resource !== 'desert') {
        if (
          resourceUpdate[
            `players.${intersection.player}.${currentTile.resource}`
          ]
        ) {
          resourceUpdate[
            `players.${intersection.player}.${currentTile.resource}`
          ]++
        } else {
          resourceUpdate[
            `players.${intersection.player}.${currentTile.resource}`
          ] =
            +players[intersection.player][currentTile.resource] + 1
        }
      }
    })
  }
  db
    .collection('games')
    .doc(gameId)
    .update(resourceUpdate)
    .catch(err=>console.log('Player did not recieve correct initial resources', err))
}

export const endTurn = (currentTurn, currentPlayer, gameId) => {
  let endTurn = {}
  let playerNum = +currentPlayer[6]
  endTurn[`game.turn`] = currentTurn + 1
  endTurn[`game.diceRollCount`] = currentTurn + 1
  if (currentTurn === 2) {
    endTurn[`game.currentPlayer`] = 'player4'
  } else if (currentTurn === 3) {
    endTurn[`game.currentPlayer`] = 'player4'
  } else if (currentTurn === 4) {
    endTurn[`game.currentPlayer`] = 'player3'
  } else if (currentTurn === 5) {
    endTurn[`game.currentPlayer`] = 'player2'
  } else if (currentTurn === 6) {
    endTurn[`game.currentPlayer`] = 'player1'
  } else if (currentTurn === 7) {
    endTurn[`game.currentPlayer`] = 'player1'
  } else {
    endTurn[`game.currentPlayer`] =
      playerNum < 4 ? `player${playerNum + 1}` : `player${playerNum - 3}`
  }

  db
    .collection('games')
    .doc(`${gameId}`)
    .update(endTurn)
    .catch(err=>console.log('error in endTurn', err))
}

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
      game.update(updatedPlayerData).catch(err=>console.log('error in decrementing resources in creation of road: ', err))
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
      game.update(updatedPlayerData).catch(err=>console.log('error in decrementing resources in creation of settlment: ', err))
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
      game.update(updatedPlayerData).catch(err=>console.log('error in decrementing resources in creation of city: ', err))
    })
}

export const turnTradeOn = (currentPlayer, gameId) => {
  const tradeUpdate = {}
  const playerArr = ['player1', 'player2', 'player3', 'player4']
  playerArr.filter(player => player !== currentPlayer).forEach(player => {
    tradeUpdate[`players.${player}.trade`] = true
  })
  db
    .collection('games')
    .doc(gameId)
    .update(tradeUpdate).catch(err=>console.log('error in turning trade on for all players: ', err))
}

export const turnTradeOff = gameId => {
  const tradeUpdate = {}
  const playerArr = ['player1', 'player2', 'player3', 'player4']
  playerArr.forEach(player => {
    tradeUpdate[`players.${player}.trade`] = false
  })
  db
    .collection('games')
    .doc(gameId)
    .update(tradeUpdate)
    .catch(err=>console.log('error in turning trade off for all players: ', err))
}

export const turnSingleTradeOff = (gameId, player) => {
  const tradeUpdate = {}
  tradeUpdate[`players.${player}.trade`] = false
  db
    .collection('games')
    .doc(gameId)
    .update(tradeUpdate)
    .catch(err=>console.log('error in turning single trade off for: ', player, err))
}

export const tradeInfo = (offer, exchange, gameId) => {
  const tradeUpdate = {}
  tradeUpdate['trade'] = { offer, exchange }
  db
    .collection('games')
    .doc(gameId)
    .update(tradeUpdate)
    .catch(err=>console.log('error in getting trade info for: offer',offer,'exchange: ',exchange, err))
}

/* INITIATE TRADE
  Parameters types:
    initiator & receiver: 'player1'
    offer & exchange: objects containing card types and quantity;{ore: 2}
*/
export const initiateTrade = (
  initiatorPlayer,
  receiverPlayer,
  offer,
  exchange,
  gameId
) => {
  let initiatorData,
    receiverData,
    updatedInitiatorData = {},
    updatedReceiverData = {}
  turnTradeOff(gameId)
  const game = db.collection('games').doc(gameId)
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
      let exchangeKey = Object.keys(exchange)
      let resources = offerKey.concat(exchangeKey)
      console.log('keys', resources)
      resources.forEach(function(type) {
        offer[type] = offer[type] ? offer[type] : 0
        exchange[type] = exchange[type] ? exchange[type] : 0
        updatedInitiatorData[`players.${initiatorPlayer}.${type}`] =
          +initiatorData[type] - +offer[type] + +exchange[type]
        updatedReceiverData[`players.${receiverPlayer}.${type}`] =
          +receiverData[type] + +offer[type] - +exchange[type]
      })
    })
    .then(() => {
      game.update(updatedInitiatorData).catch(err=>console.log('error in updating initiator data: ', initiatorPlayer, err))
      game.update(updatedReceiverData).catch(err=>console.log('error in updating receiver data: ', receiverPlayer, err))
    })
}

export const purchaseDevCard = (player, gameId) => {
  const game = db.collection('games').doc(gameId)
  let resourceUpdate = {}

  let devCards = createDevCards(),
    shuffledDevCards = shuffle(devCards)

  game.get().then(doc => {
    let prevOre = doc.data().players[player].ore,
      prevWheat = doc.data().players[player].wheat,
      prevSheep = doc.data().players[player].sheep
    resourceUpdate[`players.${player}.ore`] = prevOre - 1
    resourceUpdate[`players.${player}.sheep`] = prevSheep - 1
    resourceUpdate[`players.${player}.wheat`] = prevWheat - 1
    game.update(resourceUpdate).catch(err=>console.log('error resource update, player: ', player, 'error: ', err))

    let prevDevCards = doc.data().players[player].devCards,
      newDevCards = [shuffledDevCards[0], ...prevDevCards]

    let devCardUpdate = {}
    devCardUpdate[`players.${player}.devCards`] = newDevCards
    game.update(devCardUpdate).catch(err=>console.log('error in adding dev card, player: ', player, 'err: ', err))
  })
  return shuffledDevCards[0]
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
    game.update(deleteDevCard).catch(err=>console.log('error in decrementing dev card, player: ', player, 'err: ', err))
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
      if (doc.data().players[`${victim}`][cards[i]] > 0) {
        check = false
      } else {
        i++
      }
      if (i === shuffled.length) check = false
    }
    if (i !== shuffled.length) {
      let victimLoseCard = doc.data().players[`${victim}`][cards[i]] - 1,
        takerGetCard = doc.data().players[`${taker}`][cards[i]] + 1,
        victimLoseCardUpdate = {}
      victimLoseCardUpdate[
        `players.${victim}.${cards[i]}`
      ] = victimLoseCard
      let takerGetCardUpdate = {}
      takerGetCardUpdate[`players.${taker}.${cards[i]}`] = takerGetCard
      game.update(victimLoseCardUpdate).catch(err=>console.log('knight dev card: error in deleting card in player who loses card: ', victim, 'err: ', err))
      game.update(takerGetCardUpdate).catch(err=>console.log('knight dev card: error in deleting card in player who gains card: ', taker, 'err: ', err))
    }
  })
}

export const getOptions = (game, currentPlayerId) => {
  var intersectionWithExtra = game.intersectionNodes
  var tiles = game.tileNodes
  var intersectionKeyPlayerValue = {}
  let intersections = {}
  for(let i = 1; i < 55; i++) {
    intersections[String(i)]= intersectionWithExtra[String(i)]
  }
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
    option = {}

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
      option.text = 'Tile: ' + tile + ' Players: '
      tileObj[tile].forEach(player => {
        playerKey = Object.keys(player)
        option.text += playerKey[0] + ' '
      })
    } else if (tileObj[tile].length === 1) {
      playerKey = Object.keys(tileObj[tile][0])
      option.text = 'Tile: ' + tile + ' Players: ' + playerKey[0]
    } else {
      option.text = 'Tile: ' + tile + ' No players'
    }
    options.push(option)
  }
  return options
}
export const checkForWinner = currentGame => {
  console.log(currentGame)
  let score1 = currentGame.players.player1.score,
    score2 = currentGame.players.player2.score,
    score3 = currentGame.players.player3.score,
    score4 = currentGame.players.player4.score
  let name1 = currentGame.players.player1.name,
   name2 = currentGame.players.player2.name,
   name3 = currentGame.players.player3.name,
   name4 = currentGame.players.player4.name
  if (score1 >= 10) {
    return [true, name1]
  }
  if (score2 >= 10) {
    return [true, name2]
  }
  if (score3 >= 10) {
    return [true, name3]
  }
  if(score4>=10) {
    return [true, name4]
  }
  return [false]
}

export const updateScoreToCloseModal = (e, winner) => {
  e.preventDefault()
  let currentGameId = window.location.href.slice(-20) //or -20
  const game = db.collection('games').doc(currentGameId)
  let player = winner

  game.get().then(() => {
    let updateGameToInactive = {}
    let updateScoreToCloseModal = {}
    updateGameToInactive[`game.active`] = false
    updateScoreToCloseModal[`players.${player}.score`] = 0
    game.update(updateScoreToCloseModal).catch((err) => console.log('winning component: error in updating score to close end game modal: ', err))
    game.update(updateGameToInactive).catch((err) => console.log('winning component: error in updating game to inactive: ', err))
  })
}

export const setRobberBuild = (currentGameId, setTrueFalse) => {
  if (setTrueFalse === true) {
    let robberBuildUpdate = {}
    robberBuildUpdate[`game.robberBuild`] = true
    db
      .collection('games')
      .doc(currentGameId)
      .update(robberBuildUpdate)
  } else {
    let robberBuildUpdate = {}
    robberBuildUpdate[`game.robberBuild`] = false
    db
      .collection('games')
      .doc(currentGameId)
      .update(robberBuildUpdate)
      .catch((err) => console.log('set robber: error in setting robber to build: ', err))
  }
}

export const setRobberOnTile = (currentGame, tileId) => {
  let setRobberOnTileUpdate = {}
  setRobberOnTileUpdate[`game.robber`] = String(tileId)
  db
    .collection('games')
    .doc(currentGame)
    .update(setRobberOnTileUpdate)
    .catch((err) => console.log('set robber: error in setting robber on tile: ', err))
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
    game.update(updateMessageStartData).catch((err) => console.log('messages: error in incrementing message start: ', err))
  })
}

//convoluted grabbing all resources of other player and giving them to the right player
export const monopolize = (gameId, resource, player) => {
  const game = db.collection('games').doc(gameId)
  game.get().then(doc => {
    let player1Resource = doc.data().players.player1[resource],
      player2Resource = doc.data().players.player2[resource],
      player3Resource = doc.data().players.player3[resource],
      player4Resource = doc.data().players.player4[resource]
    if (player === 'player1') {
      player1Resource += player2Resource + player3Resource + player4Resource
      player2Resource = 0
      player3Resource = 0
      player4Resource = 0
    }
    if (player === 'player2') {
      player2Resource += player1Resource + player3Resource + player4Resource
      player1Resource = 0
      player3Resource = 0
      player4Resource = 0
    }
    if (player === 'player3') {
      player3Resource += player2Resource + player1Resource + player4Resource
      player2Resource = 0
      player1Resource = 0
      player4Resource = 0
    }
    if (player === 'player4') {
      player4Resource += player2Resource + player3Resource + player1Resource
      player2Resource = 0
      player3Resource = 0
      player1Resource = 0
    }
    let player1Update = {},
      player2Update = {},
      player3Update = {},
      player4Update = {}

    player1Update[`players.player1.${resource}`] = player1Resource
    player2Update[`players.player2.${resource}`] = player2Resource
    player3Update[`players.player3.${resource}`] = player3Resource
    player4Update[`players.player4.${resource}`] = player4Resource
    game.update(player1Update).catch((err) => console.log('monopoly card: error in updating player 1 resource ', err))
    game.update(player2Update).catch((err) => console.log('monopoly card: error in updating player 2 resource: ', err))
    game.update(player3Update).catch((err) => console.log('monopoly card: error in updating player 3 resource: ', err))
    game.update(player4Update).catch((err) => console.log('monopoly card: error in updating player 4 resource: ', err))
  })
}

export const addTwoSelectedResources = (gameId, resources, player) => {
  const game = db.collection('games').doc(gameId)
  game.get().then(doc => {
    let firstResource = resources[0]
    let currentFirstResource = doc.data().players[`${player}`][
      firstResource
    ]

    if (resources[0] === resources[1]) {
      let firstResourceUpdate = {}
      firstResourceUpdate[`players.${player}.${firstResource}`] =
        currentFirstResource + 2

      game.update(firstResourceUpdate).catch(err=>console.log('land of plenty card: error in updating the first resource: ', firstResource, err))
    } else {
      let firstResourceUpdate = {}
      firstResourceUpdate[`players.${player}.${firstResource}`] =
        currentFirstResource + 1

      game.update(firstResourceUpdate).catch(err=>console.log('land of plenty card: error in updating the first resource: ', firstResource, err))

      let secondResource = resources[1],
        currentSecondResource = doc.data().players[`${player}`][
          secondResource
        ],
        secondResourceUpdate = {}
      secondResourceUpdate[`players.${player}.${secondResource}`] =
        currentSecondResource + 1

      game.update(secondResourceUpdate).catch(err=>console.log('land of plenty card: error in updating the second resource: ', secondResource, err))
    }
  })
}

export const victoryPointCard = (player, gameId) => {
  const game = db.collection('games').doc(gameId)
  game.get().then(doc => {
    let incrementedPlayerScore = doc.data().players[`${player}`].score + 1
    let updateScore = {}
    updateScore[`players.${player}.score`] = incrementedPlayerScore
    game.update(updateScore).catch(err=> console.log('victory point card: error in incrementing player score: ', err))
  })
}

export const robberDivideCardsInHalf = (gameId, player, resources) => {
  const game = db.collection('games').doc(gameId)

  game.get().then(() => {
    let updateSheep = {},
      updateBrick = {},
      updateWood = {},
      updateOre = {},
      updateWheat = {}

    updateBrick[`players.${player}.brick`] = resources.brick
    updateWood[`players.${player}.wood`] = resources.wood
    updateOre[`players.${player}.ore`] = resources.ore
    updateSheep[`players.${player}.sheep`] = resources.sheep
    updateWheat[`players.${player}.wheat`] = resources.wheat

    game.update(updateBrick).catch(err=>console.log('robber: error in updating brick for player: ', player, 'error: ', err))
    game.update(updateOre).catch(err=>console.log('robber: error in updating ore for player: ', player, 'error: ', err))
    game.update(updateSheep).catch(err=>console.log('robber: error in updating sheep for player: ', player, 'error: ', err))
    game.update(updateWheat).catch(err=>console.log('robber: error in updating wheat for player: ', player, 'error: ', err))
    game.update(updateWood).catch(err=>console.log('robber: error in updating wood for player: ', player, 'error: ', err))
  })
}

export const updateCloseModalForPlayer = (gameId, player) => {
  const game = db.collection('games').doc(gameId)
  let updatePlayerCloseModal = {}
  updatePlayerCloseModal[`players.${player}.modalOpen`] = false
  game.update(updatePlayerCloseModal).catch(err=>console.log('robber: error in closing modal: ', player, 'error: ', err))
}
