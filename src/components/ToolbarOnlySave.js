import React from 'react';
import { Toolbar, SaveButton } from 'react-admin';

const ToolbarOnlySave = props => (
    <Toolbar {...props}>
        <SaveButton disabled={props.pristine} />
    </Toolbar>
);

export default ToolbarOnlySave;
