import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

const PlayerTab = (props) => {

    return (
        <Segment style={{ height: '90%', color: 'black' }}>
            <h1>This is PlayerTab</h1>
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
export default (PlayerTab);

