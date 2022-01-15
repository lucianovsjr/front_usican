import { ReferenceArrayInput, SelectArrayInput } from 'react-admin';

const SelectResourceArrayInput = ({optionText='name', optionValue='id', ...props}) => (
    <ReferenceArrayInput {...props}>
        <SelectArrayInput optionText={optionText} optionValue={optionValue} />
    </ReferenceArrayInput>
);

export default SelectResourceArrayInput;
