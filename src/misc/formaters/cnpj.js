export const formatCnpj = (value) => {
    let valueUnformated = value || '';
    let valueFormated = '';
    if (isNaN(Number(value))) {
        valueUnformated = valueUnformated.slice(0, valueUnformated.length - 1);
    }

    if (valueUnformated.length >= 1) {
        valueFormated = valueUnformated.slice(0, 3)
    }
    if (valueUnformated.length >= 3) {
        valueFormated += "." + valueUnformated.slice(3, 6);
    }
    if (valueUnformated.length >= 6) {
        valueFormated += "." + valueUnformated.slice(6, 9);
    }
    if (valueUnformated.length >= 9) {
        valueFormated += "/" + valueUnformated.slice(9, 13);
    }
    if (valueUnformated.length >= 13) {
        valueFormated += "-" + valueUnformated.slice(13, 15);
    }
    
    return valueFormated;
};

export const parseCnpj = (value) => value.replaceAll('.', '').replace('/', '').replace('-', '');
