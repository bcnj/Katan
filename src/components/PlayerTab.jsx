import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react'

const PlayerTab = ({currentGame}) => {

  return (
    <Segment style={{ height: '90%' }}>
      <Card.Group>
          { currentGame && currentGame.game && [1,2,3,4].map(num => (
            <Card fluid
              header={currentGame.players[`player${num}`].name}
              meta={(currentGame.game.currentPlayer === num) ? 'playing' : '' }
              description={`${currentGame.players[`player${num}`].score} VP Points`}
              color={currentGame.players[`player${num}`].color}
              />
          ))}
      </Card.Group>
    </Segment>
  );
};

// const mapState = (state) => {
//     return {
//     };
// };

// const mapDispatch = (dispatch) => {
//     return {
//     };
// };

// export default connect(mapState, mapDispatch)(PlayerTab);
export default connect()(PlayerTab);

