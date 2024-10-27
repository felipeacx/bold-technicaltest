import "@testing-library/dom"
import Home, { apiurl } from "../pages/Home"
import { screen, fireEvent, render, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("API", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const mockResponseAPI = {
    data: [
      {
        id: "GZENR2GEWMQRV",
        status: "SUCCESSFUL",
        paymentMethod: "PSE",
        salesType: "TERMINAL",
        createdAt: 1729984185355,
        transactionReference: 9785,
        amount: 5209726,
      },
      {
        id: "GZEN5R0MJWUH9",
        status: "SUCCESSFUL",
        paymentMethod: "PSE",
        salesType: "TERMINAL",
        createdAt: 1729468800000,
        transactionReference: 4497,
        amount: 1541088,
      },
    ],
  }

  it("debe retornar datos al consultar la api", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseAPI),
      })
    ) as jest.Mock

    const response = await fetch(apiurl)
    if (!response.ok) throw new Error("La respuesta de la api no fue exitosa")
    const result = await response.json()

    expect(result).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            status: expect.any(String),
            paymentMethod: expect.any(String),
            salesType: expect.any(String),
            createdAt: expect.any(Number),
            transactionReference: expect.any(Number),
            amount: expect.any(Number),
          }),
        ]),
      })
    )
    expect(fetch).toHaveBeenCalledWith("https://bold-fe-api.vercel.app/api")
  })

  it("debería lanzar un error si la api responde con un error", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock

    await expect(async () => {
      const response = await fetch(apiurl)
      if (!response.ok) throw new Error("La respuesta de la api no fue exitosa")
    }).rejects.toThrow("La respuesta de la api no fue exitosa")
  })

  it("debe llamar a la API al ingresar información en el input", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseAPI),
      })
    ) as jest.Mock

    render(<Home />)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(apiurl)
    })
    const input = screen.getByPlaceholderText("Buscar")

    fireEvent.change(input, { target: { value: "test" } })

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(apiurl)
    })
  })

  it("debe mostrar el mensaje: No se encontraron transacciones. si la api falla", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock

    render(<Home />)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(apiurl)
      expect(screen.getByText(/No se encontraron transacciones./)).toBeInTheDocument()
    })
  })

  it("debe encontrar el valor total de las transacciones", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseAPI),
      })
    ) as jest.Mock

    render(<Home />)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(apiurl)
    })
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(apiurl)
    })

    expect(screen.getByText("$ 6.750.814")).toBeInTheDocument()
  })
})
