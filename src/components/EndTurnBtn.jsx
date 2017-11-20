import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

const EndTurnBtn = (props) => {

    return (
        <Button style={{width: '49%', height: '75%'}}>
            End Turn
        </Button>
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

// export default connect(mapState, mapDispatch)(EndTurnBtn);
export default (EndTurnBtn);

