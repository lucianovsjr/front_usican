import React from 'react';
import { TopToolbar, ListButton } from 'react-admin';

const DefaultActions = ({ basePath }) => (
    <TopToolbar>
        <ListButton label="ra.action.back" basePath={basePath} />
    </TopToolbar>
);

export default DefaultActions;
