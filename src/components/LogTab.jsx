import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

const LogTab = (props) => {

    return (
        <Segment style={{ height: '90%', color: 'black' }}>
            <h1>This is LogTab</h1>
            {/* this segment usable for players and log */}
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

// export default connect(mapState, mapDispatch)(LogTab);
export default (LogTab);
