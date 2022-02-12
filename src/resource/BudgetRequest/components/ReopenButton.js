import React from 'react';
import { Button, useUpdateMany, useRefresh, useNotify, useUnselectAll, useListContext } from 'react-admin';

import CheckIcon from '@material-ui/icons/Check'

const dataUpdate = { status: 4 };

const ReopenButton = ({ selectedIds, ...rest }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselecteAll = useUnselectAll();
    const { data } = useListContext();
    const [updateMany, { loading }] = useUpdateMany(
        'budget_request',
        selectedIds,
        dataUpdate,
        {
            onSuccess: () => {
                refresh();
                notify('resources.budget_request.messages.reopenSuccess', 'success', { smart_count: selectedIds.length });
                unselecteAll();
            },
            onFailure: () => notify('resources.budget_request.messages.reopenFailure', 'warning', { smart_count: selectedIds.length }),
        },
    );

    const handleClick = () => {
        const budgetRequest = selectedIds.map(id => data[id]);
        const isValid = budgetRequest.every(v => v.status === 6 || v.status === 7);
        if (isValid) {
            updateMany() 
        } else {
            notify('resources.budget_request.messages.reopenInvalid', 'warning', { smart_count: selectedIds.length })
        }
    }

    return (
        <Button
            {...rest}
            label="resources.budget_request.buttons.reopen"
            disabled={loading}
            onClick={handleClick}
        >
            <CheckIcon />
        </Button>
    );
};

export default ReopenButton;
