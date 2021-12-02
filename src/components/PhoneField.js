import React from "react";
import { useRecordContext, sanitizeFieldRestProps } from "react-admin";

import Typography from '@material-ui/core/Typography';
import get from "lodash/get";

import { formatPhone } from "../misc/formaters/phone";

const PhoneField = props => {
    const { className, source, emptyText, ...rest } = props;
    const record = useRecordContext(props);
    const value = get(record, source);

    return (
        <Typography
            component="span"
            variant="body2"
            className={className}
            {...sanitizeFieldRestProps(rest)}
        >
            {value != null && typeof value !== 'string'
                ? JSON.stringify(value)
                : formatPhone(value) || emptyText}
        </Typography>
    );
};

PhoneField.displayName = 'PhoneField';

PhoneField.defaultProps = {
    addLabel: true,
};

export default PhoneField;
