import titleize from 'titleize';

export const rentalType = (isShared) => {
    return isShared ? 'shared' : 'whole';
}

export const toUpperCase = value => value ? titleize(value) : '';