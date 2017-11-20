import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

const DevCardBtn = (props) => {

    return (
        <Button style={{width: '49%', height: '75%'}}>
            Dev Card
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

// export default connect(mapState, mapDispatch)(DevCardBtn);
export default DevCardBtn;

