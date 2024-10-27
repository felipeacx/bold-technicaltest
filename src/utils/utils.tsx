export const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

export function toDateTime(timestamp: EpochTimeStamp): string {
  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
}

export function getActualMonth() {
  return monthNames[new Date().getMonth()]
}

export function getDay() {
  const date = new Date()

  return `${date.getDate()} de ${getActualMonth()} ${date.getFullYear()}`
}

export function getMonth() {
  const date = new Date()

  return `${getActualMonth()}, ${date.getFullYear()}`
}

export function getWeek() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  const endOfWeek = new Date(today)

  startOfWeek.setDate(today.getDate() - dayOfWeek + 1)
  endOfWeek.setDate(today.getDate() + (7 - dayOfWeek))

  const startDay = startOfWeek.getDate()
  const startMonth = monthNames[startOfWeek.getMonth()]
  const startYear = startOfWeek.getFullYear()

  const endDay = endOfWeek.getDate()
  const endMonth = monthNames[endOfWeek.getMonth()]
  const endYear = endOfWeek.getFullYear()

  return `${startDay} de ${startMonth} ${startYear} - ${endDay} de ${endMonth} ${endYear}`
}
