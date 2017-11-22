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
    if(roadNodes[i].player === currentPlayer[6]){
      roadNodes[i].roadNeighbors.forEach( int => {
        roadUpdate[`roadNodes.${int}.active`] = true
      })
    }
  }
  db.collection('games').doc(`${gameId}`)
  .update(roadUpdate)
}

export const buildRoad = (currentPlayer, gameId, roadId) => {
  const roadUpdate = {}
  roadUpdate[`roadNodes.${roadId}.player`] = currentPlayer
  db.collection('games').doc(`${gameId}`)
  .update(roadUpdate)
  turnRoadsOff(gameId)
}



