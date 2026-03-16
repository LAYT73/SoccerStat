import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ru')

const DEFAULT_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm'

const toUserTimezone = (utcDate: string) => {
  const parsed = dayjs.utc(utcDate)

  if (!parsed.isValid()) {
    return null
  }

  return parsed.tz(dayjs.tz.guess())
}

/**
 * Конвертирует UTC дату из API в локальное время пользователя
 */
export const convertUTCToLocal = (utcDate: string): string => {
  return formatMatchDate(utcDate)
}

/**
 * Форматирует дату для отображения в интерфейсе
 */
export const formatMatchDate = (
  utcDate: string,
  format = DEFAULT_DATE_TIME_FORMAT,
): string => {
  const localDate = toUserTimezone(utcDate)

  return localDate ? localDate.format(format) : '-'
}

/**
 * Проверяет, попадает ли дата в указанный диапазон
 */
export const isDateInRange = (
  date: string,
  range: { from?: string; to?: string },
): boolean => {
  const target = dayjs.utc(date)
  if (range.from && target.isBefore(dayjs.utc(range.from))) return false
  if (range.to && target.isAfter(dayjs.utc(range.to).endOf('day'))) return false
  return true
}
