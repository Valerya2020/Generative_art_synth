import React, { Component } from 'react'

import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
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

    return (
      <div className="ToneSynth">
        <SC_Slider
          name="интенсивность воздействия"
          min={-60}
          max={10}
          step={1}
          value={settings.channel.volume}
          property="channelVolume"
          handleChange={this.handleValueChange}
        />

        <SC_ToggleButton
          text="вкл/выкл"
          isOn={settings.channel.mute}
          handleClick={() =>
            this.handleValueChange('channelMute', !settings.channel.mute)
          }
        />
      </div>
    )
  }
}
