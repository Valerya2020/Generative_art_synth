import React, { Component } from 'react'

import SC_Slider from '../components/SC_Slider.jsx'

export default class TremoloEffect extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { name, instrumentName, settings } = this.props
    const { wet } = settings.tremolo

    return (
      <div className="TremoloEffect Effect">
        <h3>{name}</h3>
        <SC_Slider
          property="tremoloWet"
          min={0}
          max={1}
          step={0.01}
          value={wet}
          handleChange={this.handleValueChange}
        />
      </div>
    )
  }
}
