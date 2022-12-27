import React, { PureComponent } from 'react'

import SelectItem from './SelectItem'

export default class Select extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleChange = (value) => {
    const { property, handleChange } = this.props
    handleChange(property, value)
  }

  renderSelectItems = () => {
    const { options, value } = this.props
    const selectItems = []

    options.forEach((option, i) => {
      selectItems.push(
        <SelectItem
          text={option}
          isOn={option === value}
          handleClick={() => this.handleChange(option)}
          key={i}
        />
      )
    })

    return <div className="options">{selectItems}</div>
  }

  render() {
    const {
      name,
      isOpened,
      value,
      handleRadiationChangeMeasureSelectOpen
    } = this.props

    return (
      <div className="Select">
        <div
          className="currentValue"
          onClick={handleRadiationChangeMeasureSelectOpen}
        >
          {name}: {value}
        </div>

        {isOpened ? this.renderSelectItems() : ''}
      </div>
    )
  }
}
