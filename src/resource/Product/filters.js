import { TextInput } from 'react-admin';

import SelectResourceArrayInput from '../../components/SelectResourceArrayInput';


const ProductFilters = [
    <SelectResourceArrayInput source='product_type' reference="product_type" />,
    <TextInput source='description' />,
    <TextInput source='full_description' />,
];

export default ProductFilters;
