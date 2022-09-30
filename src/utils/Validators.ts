export const isValidNumericString = (
    numericString: string,
    separator: string
): boolean => {
    const numericValues = numericString
        .split(separator)
        .map((value) => parseInt(value));

    for (const value of numericValues) {
        if (isNaN(value)) {
            console.log('Invalid numeric value.');
            return false;
        }
    }

    return true;
};

export const isValidHeadingValue = (headingValue: string) => {
    const isValid = ['N', 'E', 'S', 'W'].includes(headingValue);
    if (!isValid) console.log(`Invalid Heading Value: ${headingValue}`);
    return isValid;
};

export const isValidCommandValue = (commandValue: string) => {
    const validValues = ['L', 'R', 'M'];
    const isValid = validValues.includes(commandValue);
    if (!isValid) console.log(`Invalid Command Value: ${commandValue}`);
    return isValid;
};
