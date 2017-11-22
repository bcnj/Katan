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
        if(roadNodes[i].player === '0'){
          roadUpdate[`roadNodes.${int}.active`] = true
        }
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



