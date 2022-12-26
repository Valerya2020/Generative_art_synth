import React, { Component } from 'react'

import SC_Slider from '../components/SC_Slider.jsx'
import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'

export default class ChorusEffect extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { name, instrumentName, settings } = this.props
    const { wet } = settings.chorus
    const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

    return (
      <div className="ChorusEffect Effect">
        <h3>{name}</h3>

        <SC_Slider
          property="chorusWet"
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
