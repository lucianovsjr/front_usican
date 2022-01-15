import { TextInput, BooleanInput } from 'react-admin';


const ProductTypeFilters = [
    <TextInput source='name' />,
    <TextInput source='description' />,
    <BooleanInput source='active' />
];

export default ProductTypeFilters;
