export const formatPhone = (value) => {
    let valueUnformated = value || '';
    let valueFormated = '';
    if (isNaN(Number(value))) {
        valueUnformated = valueUnformated.slice(0, valueUnformated.length - 1);
    }
    
    if (valueUnformated.length >= 1) {
        valueFormated = "(" + valueUnformated.slice(0, 3)
    }
    if (valueUnformated.length >= 4) {
        valueFormated += ") " + valueUnformated.slice(3, 8);
    }
    if (valueUnformated.length >= 9) {
        valueFormated += "-" + valueUnformated.slice(8, 12);
    }
    
    return valueFormated;
};

export const parsePhone = (value) => value.replace('(', '').replace(') ', '').replace('-', '');
