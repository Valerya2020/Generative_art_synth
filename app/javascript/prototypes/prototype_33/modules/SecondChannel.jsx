import React, { Component } from 'react'

import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { settings, handleValueChange } = this.props

    return (
      <SC_ToggleButton
        text="Mute"
        isOn={settings.channel.mute}
        handleClick={() =>
          handleValueChange('channelMute', !settings.channel.mute)
        }
      />
    )
  }
}
