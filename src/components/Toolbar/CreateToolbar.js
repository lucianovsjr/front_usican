import React from "react";

import BaseToolbar from "./BaseToolbar";

const CreateToolbar = (props) => {
    return (
        <BaseToolbar
            {...props}
            record={{ ...props.record, link_redirect: props.linkRedirect }}
        />
    )
};

export default CreateToolbar;
