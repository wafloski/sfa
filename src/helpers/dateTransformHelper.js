const languageChangerHelper = (dateString) => {
    const monthString = (dateString).replace(/[^a-z]/gi, '');
    switch (monthString) {
        case 'januar':
            return 'jan';
        case 'februar':
            return 'feb';
        case 'mars':
            return 'mar';
        case 'april':
            return 'apr';
        case 'mai':
            return 'may';
        case 'juni':
            return 'jun';
        case 'juli':
            return 'jul';
        case 'august':
            return 'aug';
        case 'september':
            return 'sep';
        case 'oktober':
            return 'oct';
        case 'november':
            return 'nov';
        case 'desember':
            return 'dec';
        default:
            console.log('wrong date');
    }
};

const dateTransformer = (dateString) => {
    const monthShort = languageChangerHelper(dateString);
    const splittedDate = dateString.split(' ');
    splittedDate[1] = monthShort;
    return splittedDate.join(' ');
};

export default dateTransformer;