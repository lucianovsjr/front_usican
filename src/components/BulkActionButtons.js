import React from 'react';
import { BulkDeleteButton } from 'react-admin';

const BulkActionButtons = props => (<BulkDeleteButton {...props} undoable={false} />);

export default BulkActionButtons;
