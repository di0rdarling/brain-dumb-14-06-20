import moment from 'moment';

export function convertToReadableDateTime(dateTime: string) {
    return moment(dateTime).format('LL');
}