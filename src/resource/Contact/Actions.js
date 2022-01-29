import React from 'react';
import { TopToolbar } from 'react-admin';

import get from 'lodash/get';

import BackButton from '../../components/BackButton';

const Actions = (props) => {
    const linkRedirect = get(props, 'data.link_redirect', props.linkRedirect);
    return (
        <TopToolbar>
            <BackButton
                {...props}
                pathRedirect={linkRedirect}
                key={linkRedirect}
            />
        </TopToolbar>
    );
}

export default Actions;
