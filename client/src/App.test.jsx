import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import App from "./App"

describe("App Component", () => {
  it("renders app heading", () => {
    render(<App />)
    const heading = screen.getByText(/Search & Book/i)
    expect(heading).toBeInTheDocument()
  })
})
