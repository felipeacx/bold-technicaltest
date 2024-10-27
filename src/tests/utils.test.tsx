import { getActualMonth, getDay, getMonth, getWeek, monthNames, toDateTime } from "../utils/utils"

describe("Utils", () => {
  it("Debe retornar la fecha y hora", () => {
    expect(toDateTime(1729982686)).toBe("20/01/1970 - 19:33:02")
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
