const dummyData = {
  game: {
    diceRoll: 'Initial Setup Phase',
    currentPlayer: 'player1',
    diceRollCount: 0,
    active: false,
    playerCount: 0,
    setup: true, // Setup will remain true until turn > totalPlayerCount * 2
    messageCount: 2,
    messageStart: 1,
    turn: 0, // Add for each turn
    robber: '10',
    robberBuild: false
  },
  "trade": {
    "offer" : {
      "wood": 0,
      "ore": 0,
      "sheep": 0,
      "wheat": 0,
      "brick":0,
    },
    "exchange": {
      "wood": 0,
      "ore": 0,
      "sheep": 0,
      "wheat": 0,
      "brick":0,
    }
  },
  "messages": {
    "1": {
      "player": "admin",
      "time": "the past",
      "content": "Welcome to the game!!!!"
    }
  },
  "players": {
    "player1": {
      "id": 1,
      "name": "",
      "score": 0,
      "wood": 0,
      "brick": 0,
      "wheat": 0,
      "sheep": 0,
      "ore": 0,
      "devCards": [],
      "color": 'red',
      "build": true,
      "trade": false
      },
    "player2": {
      "id": 2,
      "name": "",
      "score": 0,
      "wood": 0,
      "brick": 0,
      "wheat": 0,
      "sheep": 0,
      "ore": 0,
      "devCards": [],
      "color": 'white',
      "build": true,
      "trade": false
    },
    "player3": {
      "id": 3,
      "name": "",
      "score": 0,
      "wood": 0,
      "brick": 0,
      "wheat": 0,
      "sheep": 0,
      "ore": 0,
      "devCards": [],
      "color": "green",
      "build": true,
      "trade": false
    },
    "player4": {
      "id": 4,
      "name": "",
      "score": 0,
      "wood": 0,
      "brick": 0,
      "wheat": 0,
      "sheep": 0,
      "ore": 0,
      "devCards": [],
      "color": "blue",
      "build": true,
      "trade": false
    }
  },
  devCards: {
    '1': {
      name: 'Knight'
    },
    '2': {
      name: 'Knight'
    },
    '3': {
      name: 'Knight'
    },
    '4': {
      name: 'Knight'
    },
    '5': {
      name: 'Knight'
    },
    '6': {
      name: 'Knight'
    },
    '7': {
      name: 'Knight'
    },
    '8': {
      name: 'Knight'
    },
    '9': {
      name: 'Knight'
    },
    '10': {
      name: 'Knight'
    },
    '11': {
      name: 'Knight'
    },
    '12': {
      name: 'Knight'
    },
    '13': {
      name: 'Knight'
    },
    '14': {
      name: 'Knight'
    },
    '15': {
      name: 'Victory Point'
    },
    '16': {
      name: 'Victory Point'
    },
    '17': {
      name: 'Victory Point'
    },
    '18': {
      name: 'Victory Point'
    },
    '19': {
      name: 'Victory Point'
    },
    '20': {
      name: 'Year of Plenty'
    },
    '21': {
      name: 'Year of Plenty'
    },
    '22': {
      name: 'Monopoly'
    },
    '23': {
      name: 'Monopoly'
    },
    '24': {
      name: 'Road Building'
    },
    '25': {
      name: 'Road Building'
    }
  },
  tileNodes: {
    '1': {
      children: ['1', '4', '5', '8', '9', '13'],
      resource: 'ore',
      rollNumber: 10
    },
    '2': {
      children: ['2', '5', '6', '9', '10', '14'],
      resource: 'sheep',
      rollNumber: 2
    },
    '3': {
      children: ['3', '6', '7', '10', '11', '15'],
      resource: 'wood',
      rollNumber: 9
    },
    '4': {
      children: ['12', '8', '13', '17', '18', '23'],
      resource: 'wheat',
      rollNumber: 12
    },
    '5': {
      children: ['13', '9', '14', '18', '19', '24'],
      resource: 'brick',
      rollNumber: 6
    },
    '6': {
      children: ['14', '10', '15', '19', '20', '25'],
      resource: 'sheep',
      rollNumber: 4
    },
    '7': {
      children: ['15', '11', '16', '20', '21', '26'],
      resource: 'brick',
      rollNumber: 10
    },
    '8': {
      children: ['22', '17', '23', '28', '29', '34'],
      resource: 'wheat',
      rollNumber: 9
    },
    '9': {
      children: ['23', '18', '24', '29', '30', '35'],
      resource: 'wood',
      rollNumber: 11
    },
    '10': {
      children: ['24', '19', '25', '30', '31', '36'],
      resource: 'desert',
      rollNumber: 0
    },
    '11': {
      children: ['25', '20', '26', '31', '32', '37'],
      resource: 'wood',
      rollNumber: 3
    },
    '12': {
      children: ['26', '21', '27', '32', '33', '38'],
      resource: 'ore',
      rollNumber: 8
    },
    '13': {
      children: ['34', '29', '35', '39', '40', '44'],
      resource: 'wood',
      rollNumber: 8
    },
    '14': {
      children: ['35', '30', '36', '40', '41', '45'],
      resource: 'ore',
      rollNumber: 3
    },
    '15': {
      children: ['36', '31', '37', '41', '42', '46'],
      resource: 'wheat',
      rollNumber: 4
    },
    '16': {
      children: ['37', '32', '38', '42', '43', '47'],
      resource: 'sheep',
      rollNumber: 5
    },
    '17': {
      children: ['44', '40', '45', '48', '49', '52'],
      resource: 'brick',
      rollNumber: 5
    },
    '18': {
      children: ['45', '41', '46', '49', '50', '53'],
      resource: 'wheat',
      rollNumber: 6
    },
    '19': {
      children: ['46', '42', '47', '48', '59', '54'],
      resource: 'sheep',
      rollNumber: 11
    }
  },
  roadNodes: {
    '1': {
      player: '0',
      roadNeighbors: ['2', '7'],
      active: false
    },
    '2': {
      player: '0',
      roadNeighbors: ['1', '3', '8'],
      active: false
    },
    '3': {
      player: '0',
      roadNeighbors: ['2', '4', '8'],
      active: false
    },
    '4': {
      player: '0',
      roadNeighbors: ['3', '5', '9'],
      active: false
    },
    '5': {
      player: '0',
      roadNeighbors: ['4', '6', '9'],
      active: false
    },
    '6': {
      player: '0',
      roadNeighbors: ['5', '10'],
      active: false
    },
    '7': {
      player: '0',
      roadNeighbors: ['1', '11', '12'],
      active: false
    },
    '8': {
      player: '0',
      roadNeighbors: ['2', '3', '13', '14'],
      active: false
    },
    '9': {
      player: '0',
      roadNeighbors: ['4', '5', '15', '16'],
      active: false
    },
    '10': {
      player: '0',
      roadNeighbors: ['6', '17', '18'],
      active: false
    },
    '11': {
      player: '0',
      roadNeighbors: ['7', '12', '19'],
      active: false
    },
    '12': {
      player: '0',
      roadNeighbors: ['7', '11', '13', '20'],
      active: false
    },
    '13': {
      player: '0',
      roadNeighbors: ['8', '12', '14', '20'],
      active: false
    },
    '14': {
      player: '0',
      roadNeighbors: ['8', '13', '15', '21'],
      active: false
    },
    '15': {
      player: '0',
      roadNeighbors: ['9', '14', '16', '21'],
      active: false
    },
    '16': {
      player: '0',
      roadNeighbors: ['9', '15', '17', '22'],
      active: false
    },
    '17': {
      player: '0',
      roadNeighbors: ['10', '16', '18', '22'],
      active: false
    },
    '18': {
      player: '0',
      roadNeighbors: ['10', '17', '23'],
      active: false
    },
    '19': {
      player: '0',
      roadNeighbors: ['11', '24', '25'],
      active: false
    },
    '20': {
      player: '0',
      roadNeighbors: ['12', '13', '26', '27'],
      active: false
    },
    '21': {
      player: '0',
      roadNeighbors: ['14', '15', '28', '29'],
      active: false
    },
    '22': {
      player: '0',
      roadNeighbors: ['16', '17', '30', '31'],
      active: false
    },
    '23': {
      player: '0',
      roadNeighbors: ['18', '32', '33'],
      active: false
    },
    '24': {
      player: '0',
      roadNeighbors: ['19', '25', '34'],
      active: false
    },
    '25': {
      player: '0',
      roadNeighbors: ['19', '24', '26', '35'],
      active: false
    },
    '26': {
      player: '0',
      roadNeighbors: ['20', '25', '27', '35'],
      active: false
    },
    '27': {
      player: '0',
      roadNeighbors: ['20', '26', '28', '36'],
      active: false
    },
    '28': {
      player: '0',
      roadNeighbors: ['21', '27', '29', '36'],
      active: false
    },
    '29': {
      player: '0',
      roadNeighbors: ['21', '28', '30', '37'],
      active: false
    },
    '30': {
      player: '0',
      roadNeighbors: ['22', '29', '31', '37'],
      active: false
    },
    '31': {
      player: '0',
      roadNeighbors: ['22', '30', '32', '38'],
      active: false
    },
    '32': {
      player: '0',
      roadNeighbors: ['23', '31', '33', '38'],
      active: false
    },
    '33': {
      player: '0',
      roadNeighbors: ['23', '32', '39'],
      active: false
    },
    '34': {
      player: '0',
      roadNeighbors: ['24', '40'],
      active: false
    },
    '35': {
      player: '0',
      roadNeighbors: ['25', '26', '41', '42'],
      active: false
    },
    '36': {
      player: '0',
      roadNeighbors: ['27', '28', '43', '44'],
      active: false
    },
    '37': {
      player: '0',
      roadNeighbors: ['29', '30', '45', '46'],
      active: false
    },
    '38': {
      player: '0',
      roadNeighbors: ['31', '32', '47', '48'],
      active: false
    },
    '39': {
      player: '0',
      roadNeighbors: ['33', '49'],
      active: false
    },
    '40': {
      player: '0',
      roadNeighbors: ['34', '41', '50'],
      active: false
    },
    '41': {
      player: '0',
      roadNeighbors: ['35', '40', '42', '50'],
      active: false
    },
    '42': {
      player: '0',
      roadNeighbors: ['35', '41', '43', '51'],
      active: false
    },
    '43': {
      player: '0',
      roadNeighbors: ['36', '42', '44', '51'],
      active: false
    },
    '44': {
      player: '0',
      roadNeighbors: ['36', '43', '45', '52'],
      active: false
    },
    '45': {
      player: '0',
      roadNeighbors: ['37', '44', '46', '52'],
      active: false
    },
    '46': {
      player: '0',
      roadNeighbors: ['37', '45', '47', '53'],
      active: false
    },
    '47': {
      player: '0',
      roadNeighbors: ['38', '46', '48', '53'],
      active: false
    },
    '48': {
      player: '0',
      roadNeighbors: ['38', '47', '49', '54'],
      active: false
    },
    '49': {
      player: '0',
      roadNeighbors: ['39', '48', '54'],
      active: false
    },
    '50': {
      player: '0',
      roadNeighbors: ['40', '41', '55'],
      active: false
    },
    '51': {
      player: '0',
      roadNeighbors: ['42', '43', '56', '57'],
      active: false
    },
    '52': {
      player: '0',
      roadNeighbors: ['44', '45', '58', '59'],
      active: false
    },
    '53': {
      player: '0',
      roadNeighbors: ['46', '47', '60', '61'],
      active: false
    },
    '54': {
      player: '0',
      roadNeighbors: ['48', '49', '62'],
      active: false
    },
    '55': {
      player: '0',
      roadNeighbors: ['50', '56', '63'],
      active: false
    },
    '56': {
      player: '0',
      roadNeighbors: ['51', '55', '57', '63'],
      active: false
    },
    '57': {
      player: '0',
      roadNeighbors: ['51', '56', '58', '64'],
      active: false
    },
    '58': {
      player: '0',
      roadNeighbors: ['52', '57', '59', '64'],
      active: false
    },
    '59': {
      player: '0',
      roadNeighbors: ['52', '58', '60', '65'],
      active: false
    },
    '60': {
      player: '0',
      roadNeighbors: ['53', '59', '61', '65'],
      active: false
    },
    '61': {
      player: '0',
      roadNeighbors: ['53', '60', '62', '66'],
      active: false
    },
    '62': {
      player: '0',
      roadNeighbors: ['54', '61', '66'],
      active: false
    },
    '63': {
      player: '0',
      roadNeighbors: ['55', '56', '67'],
      active: false
    },
    '64': {
      player: '0',
      roadNeighbors: ['57', '58', '68', '69'],
      active: false
    },
    '65': {
      player: '0',
      roadNeighbors: ['59', '60', '70', '71'],
      active: false
    },
    '66': {
      player: '0',
      roadNeighbors: ['61', '62', '72'],
      active: false
    },
    '67': {
      player: '0',
      roadNeighbors: ['63', '68'],
      active: false
    },
    '68': {
      player: '0',
      roadNeighbors: ['64', '67', '69'],
      active: false
    },
    '69': {
      player: '0',
      roadNeighbors: ['64', '68', '70'],
      active: false
    },
    '70': {
      player: '0',
      roadNeighbors: ['65', '69', '71'],
      active: false
    },
    '71': {
      player: '0',
      roadNeighbors: ['65', '70', '72'],
      active: false
    },
    '72': {
      player: '0',
      roadNeighbors: ['66', '71'],
      active: false
    }
  },
  intersectionNodes: {
    '1': {
      neighbors: ['4', '5'],
      roadNeighbors: ['1', '2'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '2': {
      neighbors: ['5', '6'],
      roadNeighbors: ['3', '4'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '3': {
      neighbors: ['6', '7'],
      roadNeighbors: ['5', '6'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '4': {
      neighbors: ['1', '8'],
      roadNeighbors: ['1', '7'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '5': {
      neighbors: ['1', '2', '9'],
      roadNeighbors: ['2', '3', '8'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '6': {
      neighbors: ['2', '3', '10'],
      roadNeighbors: ['4', '5', '9'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '7': {
      neighbors: ['3', '11'],
      roadNeighbors: ['6', '10'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '8': {
      neighbors: ['4', '12', '13'],
      roadNeighbors: ['7', '11', '12'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '9': {
      neighbors: ['5', '13', '14'],
      roadNeighbors: ['8', '13', '14'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '10': {
      neighbors: ['6', '14', '15'],
      roadNeighbors: ['9', '15', '16'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '11': {
      neighbors: ['7', '15', '16'],
      roadNeighbors: ['10', '17', '18'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '12': {
      neighbors: ['8', '17'],
      roadNeighbors: ['11', '19'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '13': {
      neighbors: ['8', '9', '18'],
      roadNeighbors: ['12', '13', '20'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '14': {
      neighbors: ['9', '10', '19'],
      roadNeighbors: ['14', '15', '21'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '15': {
      neighbors: ['10', '11', '20'],
      roadNeighbors: ['16', '17', '22'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '16': {
      neighbors: ['11', '21'],
      roadNeighbors: ['18', '23'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '17': {
      neighbors: ['12', '22', '23'],
      roadNeighbors: ['19', '24', '25'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '18': {
      neighbors: ['13', '23', '24'],
      roadNeighbors: ['20', '26', '27'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '19': {
      neighbors: ['14', '24', '25'],
      roadNeighbors: ['21', '28', '29'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '20': {
      neighbors: ['15', '25', '26'],
      roadNeighbors: ['22', '30', '31'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '21': {
      neighbors: ['16', '26', '27'],
      roadNeighbors: ['23', '32', '33'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '22': {
      neighbors: ['17', '28'],
      roadNeighbors: ['24', '34'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '23': {
      neighbors: ['17', '18', '29'],
      roadNeighbors: ['25', '26', '35'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '24': {
      neighbors: ['18', '19', '30'],
      roadNeighbors: ['27', '28', '36'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '25': {
      neighbors: ['19', '20', '31'],
      roadNeighbors: ['29', '30', '37'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '26': {
      neighbors: ['20', '21', '32'],
      roadNeighbors: ['31', '32', '38'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '27': {
      neighbors: ['21', '33'],
      roadNeighbors: ['33', '39'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '28': {
      neighbors: ['22', '34'],
      roadNeighbors: ['34', '40'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '29': {
      neighbors: ['23', '34', '35'],
      roadNeighbors: ['35', '41', '42'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '30': {
      neighbors: ['24', '35', '36'],
      roadNeighbors: ['36', '43', '44'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '31': {
      neighbors: ['25', '36', '37'],
      roadNeighbors: ['37', '45', '46'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '32': {
      neighbors: ['26', '37', '38'],
      roadNeighbors: ['38', '47', '48'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '33': {
      neighbors: ['27', '38'],
      roadNeighbors: ['39', '49'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '34': {
      neighbors: ['28', '29', '39'],
      roadNeighbors: ['40', '41', '50'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '35': {
      neighbors: ['29', '20', '40'],
      roadNeighbors: ['42', '43', '51'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '36': {
      neighbors: ['30', '31', '41'],
      roadNeighbors: ['44', '45', '52'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '37': {
      neighbors: ['31', '32', '42'],
      roadNeighbors: ['46', '47', '53'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '38': {
      neighbors: ['32', '33', '43'],
      roadNeighbors: ['48', '49', '54'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '39': {
      neighbors: ['34', '44'],
      roadNeighbors: ['50', '55'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '40': {
      neighbors: ['35', '44', '45'],
      roadNeighbors: ['51', '56', '57'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '41': {
      neighbors: ['36', '45', '46'],
      roadNeighbors: ['52', '58', '59'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '42': {
      neighbors: ['37', '46', '47'],
      roadNeighbors: ['53', '60', '61'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '43': {
      neighbors: ['38', '47'],
      roadNeighbors: ['54', '62'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '44': {
      neighbors: ['39', '40', '48'],
      roadNeighbors: ['55', '56', '63'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '45': {
      neighbors: ['40', '41', '49'],
      roadNeighbors: ['57', '58', '64'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '46': {
      neighbors: ['41', '42', '50'],
      roadNeighbors: ['59', '60', '65'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '47': {
      neighbors: ['42', '43', '51'],
      roadNeighbors: ['61', '62', '66'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '48': {
      neighbors: ['44', '52'],
      roadNeighbors: ['63', '67'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '49': {
      neighbors: ['45', '52', '53'],
      roadNeighbors: ['64', '68', '69'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '50': {
      neighbors: ['46', '53', '54'],
      roadNeighbors: ['65', '70', '71'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '51': {
      neighbors: ['47', '54'],
      roadNeighbors: ['66', '72'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '52': {
      neighbors: ['48', '49'],
      roadNeighbors: ['67', '68'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '53': {
      neighbors: ['49', '50'],
      roadNeighbors: ['69', '70'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    },
    '54': {
      neighbors: ['50', '51'],
      roadNeighbors: ['71', '72'],
      player: '0',
      city: false,
      settlement: false,
      active: false
    }
  }
}

export default dummyData
