//3 ore, 3 brick, 4 wheat, 4 sheep, 4 lumber, 1 desert = 19
export const randomizeTiles = () => {
  let randomizedTiles = {},
    resources = [
      'ORE',
      'ORE',
      'ORE',
      'BRICK',
      'BRICK',
      'BRICK',
      'WHEAT',
      'WHEAT',
      'WHEAT',
      'WHEAT',
      'SHEEP',
      'SHEEP',
      'SHEEP',
      'SHEEP',
      'LUMBER',
      'LUMBER',
      'LUMBER',
      'LUMBER',
      'DESERT'
    ],
    rollNumbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12],
    tileIds = [
      'T18',
      'T17',
      'T16',
      'T15',
      'T14',
      'T13',
      'T12',
      'T11',
      'T10',
      'T9',
      'T8',
      'T7',
      'T6',
      'T5',
      'T4',
      'T3',
      'T2',
      'T1'
    ]

  rollNumbers = rollNumbers.sort(function(a, b) {
    return 0.5 - Math.random()
  })

  resources = resources.sort(function(a, b) {
    return 0.5 - Math.random()
  })

  for (let i = 0; i < 19; i++) {
    let randomTileId = tileIds.pop()
    let resource = resources.pop()
    if (resource !== 'DESERT') {
      let rollNumber = rollNumbers.pop()
      randomizedTiles[randomTileId] = {}
      randomizedTiles[randomTileId].id = randomTileId
      randomizedTiles[randomTileId].rollNumber = rollNumber
      randomizedTiles[randomTileId].resource = resource
      randomizedTiles[randomTileId].robber = false
      randomizedTiles[randomTileId].players = {}
    } else {
      randomizedTiles[randomTileId] = {}
      randomizedTiles[randomTileId].id = randomTileId
      randomizedTiles[randomTileId].resource = resource
      randomizedTiles[randomTileId].robber = true
      randomizedTiles[randomTileId].players = {}
    }
  }
  return randomizedTiles
}

export const createCards = () => {
  let bricks = new Array(19)
  bricks.fill('BRICK')
  let wheats = new Array(19)
  wheats.fill('WHEAT')
  let ores = new Array(19)
  ores.fill('ORE')
  let sheeps = new Array(19)
  sheeps.fill('SHEEP')
  let lumber = new Array(19)
  lumber.fill('LUMBER')
  let arr = [...wheats, ...ores, ...sheeps, ...lumber, ...bricks]

  return arr
}

export const createDevCards = () => {
  let soldiers = new Array(14)
  //the values being filled are what is checked before development cards are used, 1 is soldier, 2 is monopoly, etc.
  soldiers.fill(1)
  let vPoint = new Array(5)
  vPoint.fill(5)
  let monopoly = [2, 2],
    roadBuild = [3, 3],
    plenty = [4, 4]

  return [...soldiers, ...vPoint, ...monopoly, ...roadBuild, ...plenty]
}

export const shuffle = arr => {
  return arr.sort(function(a, b) {
    return 0.5 - Math.random()
  })
}
