import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

const BuildBtn = (props) => {

    return (
        <Button style={{width: '48%', height: '85%'}}>
            Build
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

// export default connect(mapState, mapDispatch)(BuildBtn);
export default (BuildBtn);

