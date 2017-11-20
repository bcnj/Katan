import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

const TradeBtn = (props) => {

    return (
        <Button style={{width: '48%', height: '85%'}}>
            Trade
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

// export default connect(mapState, mapDispatch)(TradeBtn);
export default (TradeBtn);

