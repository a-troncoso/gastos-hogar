import React from "react"
import { render, fireEvent } from "@testing-library/react-native"

import Feature from "../../../src/components/atoms/Feature"

test("Render Feature component with any name", () => {
  const props = { name: "Característica" }
  const { getByTestId } = render(<Feature {...props} />)

  const featureNameText = getByTestId("feature-name-text")

  const expected = "Característica"

  expect(featureNameText.props.children).toBe(expected)
})

test("Call onPressFeature event when press component", () => {
  const props = { name: "Característica", onPressFeature: jest.fn() }
  const { getByTestId } = render(<Feature {...props} />)

  const touchable = getByTestId("touchable")
  fireEvent.press(touchable)
  expect(props.onPressFeature).toBeCalledTimes(1)
})

test("Render voidValue props if value isn't set", () => {
  const props = { name: "Característica", voidValue: "Sin Valor" }
  const { debug, getByTestId } = render(<Feature {...props} />)
  debug()
  const featureValueText = getByTestId("feature-value-text")
  expect(featureValueText.props.children).toBe("Sin Valor")
})
