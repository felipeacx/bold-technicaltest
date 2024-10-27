import { getActualMonth, getDay, getMonth, getWeek, monthNames, toDateTime } from "../utils/utils"

describe("Utils", () => {
  it("Debe retornar la fecha y hora", () => {
    const result = toDateTime(1729982686)
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}$/)
  })

  it("Debe retornar el mes actual", () => {
    expect(getActualMonth()).toBe(monthNames[new Date().getMonth()])
  })

  it("Debe retornar la fecha actual", () => {
    const date = new Date()
    expect(getDay()).toBe(`${date.getDate()} de ${getActualMonth()} ${date.getFullYear()}`)
  })

  it("Debe retornar mes y año actual", () => {
    const date = new Date()
    expect(getMonth()).toBe(`${getActualMonth()}, ${date.getFullYear()}`)
  })

  it("Debe retornar la semana actual", () => {
    expect(getWeek()).toBe(getWeek())
  })
})
