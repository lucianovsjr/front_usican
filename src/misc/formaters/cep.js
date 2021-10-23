export const formatCep = (value) => {
    let valueFormated = value || '';
    if (isNaN(Number(value))) {
        valueFormated = valueFormated.slice(0, valueFormated.length - 1);
    }
    
    if (valueFormated.length > 5) {
        return valueFormated.slice(0, 2) + "." + valueFormated.slice(2, 5) + "-" + valueFormated.slice(5, 8);
    } else if (valueFormated.length > 2) {
        return valueFormated.slice(0, 2) + "." + valueFormated.slice(2, 5);
    }
    return valueFormated
};

export const parseCep = (value) => value.replace('.', '').replace('-', '');
