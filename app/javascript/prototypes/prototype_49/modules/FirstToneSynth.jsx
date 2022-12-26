import React, { Component } from 'react'

import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { settings } = this.props
    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="ToneSynth">
        <h1>вибрация</h1>
        <SC_ToggleButtonSet
          name="тип волны"
          options={options}
          value={settings.synth.oscillator.type}
          property="synthType"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="attack"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.attack}
          property="synthEnvelopeAttack"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="decay"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.decay}
          property="synthEnvelopeDecay"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="sustain"
          min={0}
          max={1}
          step={0.01}
          value={settings.synth.envelope.sustain}
          property="synthEnvelopeSustain"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="release"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.release}
          property="synthEnvelopeRelease"
          handleChange={this.handleValueChange}
        />
      </div>
    )
  }
}
