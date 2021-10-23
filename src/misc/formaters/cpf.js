export const formatCpf = (value) => {
    let valueUnformated = value || '';
    let valueFormated = '';
    if (isNaN(Number(value))) {
        valueUnformated = valueUnformated.slice(0, valueUnformated.length - 1);
    }

    if (valueUnformated.length >= 1) {
        valueFormated = valueUnformated.slice(0, 3)
    }
    if (valueUnformated.length >= 4) {
        valueFormated += "." + valueUnformated.slice(3, 6);
    }
    if (valueUnformated.length >= 7) {
        valueFormated += "." + valueUnformated.slice(6, 9);
    }
    if (valueUnformated.length >= 10) {
        valueFormated += "-" + valueUnformated.slice(9, 11);
    }
    
    return valueFormated;
};

export const parseCpf = (value) => value.replaceAll('.', '').replace('-', '');
