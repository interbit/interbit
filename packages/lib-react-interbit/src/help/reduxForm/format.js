import moment from 'moment'

/**
 * Create a date-only string for display purposes
 * @param {*} dateStr - an ISO8601 formatted datetime string, unknown, null, or ''
 */
export const formatDate = dateStr => {
  if (dateStr) {
    const date = moment(dateStr)
    if (date.isValid()) {
      // TODO: Consider using the built in locale string function
      const dateFormat = 'YYYY-MM-DD'
      return date.format(dateFormat)
    }
  }
  return null
}

/**
 * Create a date-only string for display purposes
 * @param {*} dateStr - an ISO8601 formatted datetime string, unknown, null, or ''
 */
export const formatDateTime = dateStr => {
  if (dateStr) {
    const date = moment(dateStr)
    if (date.isValid()) {
      // TODO: Consider using the built in locale string function
      const dateTimeFormat = 'YYYY-MM-DD LTS'
      return date.format(dateTimeFormat)
    }
  }
  return null
}
