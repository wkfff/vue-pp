import moment from 'moment'

let formatDate = time => {
    return moment(time).format('YYYY-MM-DD')
}
let timestamp = time => {
    return moment(time).valueOf()
}
export {
    formatDate,
    timestamp
}