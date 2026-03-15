import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Конвертирует UTC дату из API в локальное время пользователя
 */
export const convertUTCToLocal = (utcDate: string): string => {
  return dayjs.utc(utcDate).local().format('DD.MM.YYYY HH:mm')
}

/**
 * Форматирует дату для отображения в интерфейсе
 */
export const formatMatchDate = (utcDate: string, format = 'DD.MM.YYYY HH:mm'): string => {
  return dayjs.utc(utcDate).local().format(format)
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
