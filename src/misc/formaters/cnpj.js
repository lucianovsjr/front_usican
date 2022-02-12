export const formatCnpj = (value) => {
    let valueUnformated = value || '';
    let valueFormated = '';
    if (isNaN(Number(value))) {
        valueUnformated = valueUnformated.slice(0, valueUnformated.length - 1);
    }

    if (valueUnformated.length >= 1) {
        valueFormated = valueUnformated.slice(0, 2)
    }
    if (valueUnformated.length >= 2) {
        valueFormated += "." + valueUnformated.slice(2, 5);
    }
    if (valueUnformated.length >= 5) {
        valueFormated += "." + valueUnformated.slice(5, 8);
    }
    if (valueUnformated.length >= 8) {
        valueFormated += "/" + valueUnformated.slice(8, 12);
    }
    if (valueUnformated.length >= 12) {
        valueFormated += "-" + valueUnformated.slice(12, 14);
    }
    
    return valueFormated;
};

export const parseCnpj = (value) => value.replaceAll('.', '').replace('/', '').replace('-', '').slice(0, 14);
