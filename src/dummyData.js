const dummyData = {
  "game": {
    "diceRoll": 2,
    "currentPlayer": "player1",
    "active": false,
    "playerCount": 0,
    "setup": true, // Setup will remain true until turn > totalPlayerCount * 2
    "turn": 0, // Add for each turn
    "robber": '10',
    "robberBuild": false
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
      "color": "blue",
      "build": true,
      "trade": false
    }
  },
  "devCards": {
    '1': {
      "name": "Knight"
    },
    '2': {
      "name": "Knight"
    },
    '3': {
      "name": "Knight"
    },
    '4': {
      "name": "Knight"
    },
    '5': {
      "name": "Knight"
    },
    '6': {
      "name": "Knight"
    },
    '7': {
      "name": "Knight"
    },
    '8': {
      "name": "Knight"
    },
    '9': {
      "name": "Knight"
    },
    '10': {
      "name": "Knight"
    },
    '11': {
      "name": "Knight"
    },
    '12': {
      "name": "Knight"
    },
    '13': {
      "name": "Knight"
    },
    '14': {
      "name": "Knight"
    },
    '15': {
      "name": "Victory Point"
    },
    '16': {
      "name": "Victory Point"
    },
    '17': {
      "name": "Victory Point"
    },
    '18': {
      "name": "Victory Point"
    },
    '19': {
      "name": "Victory Point"
    },
    '20': {
      "name": "Year of Plenty"
    },
    '21': {
      "name": "Year of Plenty"
    },
    '22': {
      "name": "Monopoly"
    },
    '23': {
      "name": "Monopoly"
    },
    '24': {
      "name": "Road Building"
    },
    '25': {
      "name": "Road Building"
    }
  },
  "tileNodes": {
   '1': {
      "children": ['1', '4', '5', '8', '9', '13'],
      "resource": "ORE",
      "rollNumber": 10
    },
   '2': {
      "children": ['2', '5', '6', '9', '10', '14'],
      "resource": "SHEEP",
      "rollNumber": 2
    },
   '3': {
      "children": ['3', '6', '7', '10', '11', '15'],
      "resource": "WOOD",
      "rollNumber": 9
    },
   '4': {
      "children": ['12', '8', '13', '17', '18', '23'],
      "resource": "WHEAT",
      "rollNumber": 12
    },
   '5': {
      "children": ['13', '9', '14', '18', '19', '24'],
      "resource": "BRICK",
      "rollNumber": 6
    },
   '6': {
      "children": ['14', '10', '15', '19', '20', '25'],
      "resource": "SHEEP",
      "rollNumber": 4
    },
   '7': {
      "children": ['15', '11', '16', '20', '21', '26'],
      "resource": "BRICK",
      "rollNumber": 10
    },
   '8': {
      "children": ['22', '17', '23', '28', '29', '34'],
      "resource": "WHEAT",
      "rollNumber": 9
    },
   '9': {
      "children": ['23', '18', '24', '29', '30', '35'],
      "resource": "WOOD",
      "rollNumber": 11
    },
    '10': {
      "children": ['24', '19', '25', '30', '31', '36'],
      "resource": "DESERT",
      "rollNumber": 0
    },
    '11': {
      "children": ['25', '20', '26', '31', '32', '37'],
      "resource": "WOOD",
      "rollNumber": 3
    },
    '12': {
      "children": ['26', '21', '27', '32', '33', '38'],
      "resource": "ORE",
      "rollNumber": 8
    },
    '13': {
      "children": ['34', '29', '35', '39', '40', '44'],
      "resource": "WOOD",
      "rollNumber": 8
    },
    '14': {
      "children": ['35', '30', '36', '40', '41', '45'],
      "resource": "ORE",
      "rollNumber": 3
    },
    '15': {
      "children": ['36', '31', '37', '41', '42', '46'],
      "resource": "WHEAT",
      "rollNumber": 4
    },
    '16': {
      "children": ['37', '32', '38', '42', '43', '47'],
      "resource": "SHEEP",
      "rollNumber": 5
    },
    '17': {
      "children": ['44', '40', '45', '48', '49', '52'],
      "resource": "BRICK",
      "rollNumber": 5
    },
    '18': {
      "children": ['45', '41', '46', '49', '50', '53'],
      "resource": "WHEAT",
      "rollNumber": 6
    },
    '19': {
      "children": ['46', '42', '47', '48', '59', '54'],
      "resource": "SHEEP",
      "rollNumber": 11
    }
  },
  "roadNodes": {
   '1': {
      "player": '0'
    },
   '2': {
      "player": '0'
    },
   '3': {
      "player": '0'
    },
   '4': {
      "player": '0'
    },
   '5': {
      "player": '0'
    },
   '6': {
      "player": '0'
    },
   '7': {
      "player": '0'
    },
   '8': {
      "player": '0'
    },
   '9': {
      "player": '0'
    },
    '10': {
      "player": '0'
    },
    '11': {
      "player": '0'
    },
    '12': {
      "player": '0'
    },
    '13': {
      "player": '0'
    },
    '14': {
      "player": '0'
    },
    '15': {
      "player": '0'
    },
    '16': {
      "player": '0'
    },
    '17': {
      "player": '0'
    },
    '18': {
      "player": '0'
    },
    '19': {
      "player": '0'
    },
    '20': {
      "player": '0'
    },
    '21': {
      "player": '0'
    },
    '22': {
      "player": '0'
    },
    '23': {
      "player": '0'
    },
    '34': {
      "player": '0'
    },
    '35': {
      "player": '0'
    },
    '36': {
      "player": '0'
    },
    '37': {
      "player": '0'
    },
    '38': {
      "player": '0'
    },
    '39': {
      "player": '0'
    },
    '40': {
      "player": '0'
    },
    '41': {
      "player": '0'
    },
    '42': {
      "player": '0'
    },
    '43': {
      "player": '0'
    },
    '44': {
      "player": '0'
    },
    '45': {
      "player": '0'
    },
    '46': {
      "player": '0'
    },
    '47': {
      "player": '0'
    },
    '48': {
      "player": '0'
    },
    '49': {
      "player": '0'
    },
    '50': {
      "player": '0'
    },
    '51': {
      "player": '0'
    },
    '52': {
      "player": '0'
    },
    '53': {
      "player": '0'
    },
    '54': {
      "player": '0'
    },
    '55': {
      "player": '0'
    },
    '56': {
      "player": '0'
    },
    '57': {
      "player": '0'
    },
    '58': {
      "player": '0'
    },
    '59': {
      "player": '0'
    },
    '60': {
      "player": '0'
    },
    '61': {
      "player": '0'
    },
    '62': {
      "player": '0'
    },
    '63': {
      "player": '0'
    },
    '64': {
      "player": '0'
    },
    '65': {
      "player": '0'
    },
    '66': {
      "player": '0'
    },
    '67': {
      "player": '0'
    },
    '68': {
      "player": '0'
    },
    '69': {
      "player": '0'
    },
    '70': {
      "player": '0'
    },
    '71': {
      "player": '0'
    },
    '72': {
      "player": '0'
    },
    '73': {
      "player": '0'
    },
    '74': {
      "player": '0'
    },
    '75': {
      "player": '0'
    },
    '76': {
      "player": '0'
    },
    '77': {
      "player": '0'
    },
    '78': {
      "player": '0'
    },
    '79': {
      "player": '0'
    },
    '80': {
      "player": '0'
    },
    '81': {
      "player": '0'
    },
    '82': {
      "player": '0'
    },
    '83': {
      "player": '0'
    },
    '84': {
      "player": '0'
    }
  },
  "intersectionNodes": {
   '1': {
      "neighbors": ['4', '5'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '2': {
      "neighbors": ['5', '6'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '3': {
      "neighbors": ['6', '7'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '4': {
      "neighbors": ['1', '8'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '5': {
      "neighbors": ['1', '2', '9'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '6': {
      "neighbors": ['2', '3', '10'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '7': {
      "neighbors": ['3', '11'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '8': {
      "neighbors": ['4', '12', '13'],
      "player": '0',
      "city": false,
      "settlement": false
    },
   '9': {
      "neighbors": ['5', '13', '14'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '10': {
      "neighbors": ['6', '14', '15'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '11': {
      "neighbors": ['7', '15', '16'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '12': {
      "neighbors": ['8', '17'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '13': {
      "neighbors": ['8', '9', '18'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '14': {
      "neighbors": ['9', '10', '19'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '15': {
      "neighbors": ['10', '11', '20'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '16': {
      "neighbors": ['11', '21'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '17': {
      "neighbors": ['12', '22', '23'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '18': {
      "neighbors": ['13', '23', '24'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '19': {
      "neighbors": ['14', '24', '25'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '20': {
      "neighbors": ['15', '25', '26'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '21': {
      "neighbors": ['16', '26', '27'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '22': {
      "neighbors": ['17', '28'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '23': {
      "neighbors": ['17', '18', '29'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '24': {
      "neighbors": ['18', '19', '30'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '25': {
      "neighbors": ['19', '20', '31'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '26': {
      "neighbors": ['20', '21', '32'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '27': {
      "neighbors": ['21', '33'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '28': {
      "neighbors": ['22', '34'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '29': {
      "neighbors": ['23', '34', '35'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '30': {
      "neighbors": ['24', '35', '36'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '31': {
      "neighbors": ['25', '36', '37'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '32': {
      "neighbors": ['26', '37', '38'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '33': {
      "neighbors": ['27', '38'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '34': {
      "neighbors": ['28', '29', '39'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '35': {
      "neighbors": ['29', '20', '40'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '36': {
      "neighbors": ['30', '31', '41'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '37': {
      "neighbors": ['31', '32', '42'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '38': {
      "neighbors": ['32', '33', '43'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '39': {
      "neighbors": ['34', '44'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '40': {
      "neighbors": ['35', '44', '45'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '41': {
      "neighbors": ['36', '45', '46'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '42': {
      "neighbors": ['37', '46', '47'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '43': {
      "neighbors": ['38', '47'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '44': {
      "neighbors": ['39', '40', '48'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '45': {
      "neighbors": ['40', '41', '49'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '46': {
      "neighbors": ['41', '42', '50'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '47': {
      "neighbors": ['42', '43', '51'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '48': {
      "neighbors": ['44', '52'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '49': {
      "neighbors": ['45', '52', '53'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '50': {
      "neighbors": ['46', '53', '54'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '51': {
      "neighbors": ['47', '54'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '52': {
      "neighbors": ['48', '49'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '53': {
      "neighbors": ['49', '50'],
      "player": '0',
      "city": false,
      "settlement": false
    },
    '54': {
      "neighbors": ['50', '51'],
      "player": '0',
      "city": false,
      "settlement": false
    }
  }
}

export default dummyData
