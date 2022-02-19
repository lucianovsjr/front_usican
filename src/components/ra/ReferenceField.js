import React from 'react';

import { ReferenceField } from 'react-admin';

const CustomReferenceField = (props) => (<ReferenceField {...props} link={false} />)

export default CustomReferenceField;
