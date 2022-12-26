import React, { Component } from 'react'

import SC_TogglePosterButton from '../components/SC_TogglePosterButton.jsx'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { settings, handleValueChange } = this.props

    return (
      <SC_TogglePosterButton
        className="PosterSampler"
        text=""
        isOn={settings.channel.mute}
        handleClick={() =>
          handleValueChange('channelMute', !settings.channel.mute)
        }
      />
    )
  }
}
