import React from 'react';
import { Button, useUpdateMany, useRefresh, useNotify, useUnselectAll, useListContext } from 'react-admin';

import ClearIcon from '@material-ui/icons/Clear'

const dataUpdate = { status: 7 };

const CancelButton = ({ selectedIds, ...rest }) => {
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
                notify('resources.budget_request.messages.cancelSuccess', 'success', { smart_count: selectedIds.length });
                unselecteAll();
            },
            onFailure: () => notify('resources.budget_request.messages.cancelFailure', 'warning', { smart_count: selectedIds.length }),
        },
    );

    const handleClick = () => {
        const budgetRequest = selectedIds.map(id => data[id]);
        const isValid = budgetRequest.every(v => v.status === 4);
        if (isValid) {
            updateMany() 
        } else {
            notify('resources.budget_request.messages.cancelInvalid', 'warning', { smart_count: selectedIds.length })
        }
    }

    return (
        <Button
            {...rest}
            label="resources.budget_request.buttons.cancel"
            disabled={loading}
            onClick={handleClick}
        >
            <ClearIcon />
        </Button>
    );
};

export default CancelButton;
