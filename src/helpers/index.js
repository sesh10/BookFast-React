import titleize from 'titleize';
import * as moment from 'moment';

export const rentalType = (isShared) => {
    return isShared ? 'shared' : 'whole';
}

export const toUpperCase = value => value ? titleize(value) : '';

export const modifyDate = date => moment(date).format('Do MMM YY');

export const getRangeOfDates = (startAt, endAt, dateFormat='Y/MM/DD') => {
    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
        tempDates.push(mStartAt.format(dateFormat));
        mStartAt = mStartAt.add(1, 'day');
    }
    tempDates.push(mEndAt.format(dateFormat));
    return tempDates;
}