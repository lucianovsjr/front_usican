export const formatPhone = (value) => {
    let valueUnformated = value || '';
    let valueFormated = '';
    if (isNaN(Number(value))) {
        valueUnformated = valueUnformated.slice(0, valueUnformated.length - 1);
    }
    
    if (valueUnformated.length >= 1) {
        valueFormated = "(" + valueUnformated.slice(0, 2)
    }
    if (valueUnformated.length >= 3) {
        valueFormated += ") " + valueUnformated.slice(2, 7);
    }
    if (valueUnformated.length >= 8) {
        valueFormated += "-" + valueUnformated.slice(7, 12);
    }
    
    return valueFormated;
};

export const parsePhone = (value) => value.replace('(', '').replace(') ', '').replace('-', '');
