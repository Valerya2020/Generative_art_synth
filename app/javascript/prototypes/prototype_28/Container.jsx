import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as radiationSettings from './tunes/radiation.js'
import * as drumsSettings from './tunes/drums.js'
import * as environmentSettings from './tunes/environment.js'

import ToneSynth from './modules/ToneSynth.jsx'
import Channel from './modules/Channel.jsx'

import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'

let bassSynth
let bassChorus
let bassPingPongDelay

let radiationSynth
let radiationChorus
let radiationPingPongDelay

let environmentSynth
let environmentChorus
let environmentPingPongDelay
let environmentJcReverb

let samplerChannel
let bassChannel
let radiationChannel
let environmentChannel

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bassSettings,
      radiationSettings,
      drumsSettings,
      environmentSettings
    }
  }

  handleStart = () => {
    const {
      bassSettings,
      radiationSettings,
      drumsSettings,
      environmentSettings
    } = this.state

    //СИНТЕЗАТОР-ВИБРАЦИЯ
    //
    bassSynth = new Tone.Synth(bassSettings.synth)
    bassChorus = new Tone.Chorus(bassSettings.chorus).start()

    bassPingPongDelay = new Tone.PingPongDelay(bassSettings.pingPongDelay)

    bassChannel = new Tone.Channel(bassSettings.channel).toDestination()
    bassSynth.chain(bassChorus, bassPingPongDelay, bassChannel)

    const bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = true

    //СИНТЕЗАТОР-ИЗЛУЧЕНИЕ
    //
    radiationSynth = new Tone.Synth(radiationSettings.synth)
    radiationChorus = new Tone.Chorus(radiationSettings.chorus).start()

    radiationPingPongDelay = new Tone.PingPongDelay(
      radiationSettings.pingPongDelay
    )

    radiationChannel = new Tone.Channel(
      radiationSettings.channel
    ).toDestination()
    radiationSynth.chain(
      radiationChorus,
      radiationPingPongDelay,
      radiationChannel
    )

    const radiationPart = new Tone.Part((time, note) => {
      radiationSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, radiationSettings.sequence.steps).start(0)

    radiationPart.loopEnd = radiationSettings.sequence.duration
    radiationPart.loop = true

    //СИНТЕЗАТОР-СРЕДА
    //
    environmentSynth = new Tone.Synth(environmentSettings.synth)
    environmentChorus = new Tone.Chorus(environmentSettings.chorus).start()
    environmentJcReverb = new Tone.JCReverb(environmentSettings.jcReverb)
    environmentPingPongDelay = new Tone.PingPongDelay(
      environmentSettings.pingPongDelay
    )

    environmentChannel = new Tone.Channel(
      environmentSettings.channel
    ).toDestination()
    environmentSynth.chain(
      environmentChorus,
      environmentPingPongDelay,
      environmentJcReverb,
      environmentChannel
    )

    const environmentPart = new Tone.Part((time, note) => {
      environmentSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, environmentSettings.sequence.steps).start(0)

    environmentPart.loopEnd = environmentSettings.sequence.duration
    environmentPart.loop = true
    //
    //

    const sampler = new Tone.Sampler({
      urls: {
        A1: '00001-Linn-9000-BassDrumrum1.mp3',
        A2: '00017-Linn-9000-Snare.mp3'
      },
      baseUrl: 'http://localhost:3000/samples/'
      // onload: () => {
      //   sampler.triggerAttackRelease(['A1', 'A2', 'A1', 'A2'], 0.5)
      // }
    })

    const drumsPart = new Tone.Part((time, note) => {
      sampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, drumsSettings.sequence.steps).start(0)

    drumsPart.loopEnd = drumsSettings.sequence.duration
    drumsPart.loop = true

    Tone.Transport.start()
  }

  handleBassValueChange = (property, value) => {
    const { bassSettings } = this.state

    if (property === 'synthType') {
      bassSynth.oscillator.type = value
      bassSettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      bassSynth.envelope.attack = value
      bassSettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      bassSynth.envelope.decay = value
      bassSettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      bassSynth.envelope.sustain = value
      bassSettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      bassSynth.envelope.release = value
      bassSettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      bassPingPongDelay.wet.value = value
      bassSettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      bassChorus.wet.value = value
      bassSettings.chorus.wet = value
    }
    if (property === 'channelVolume') {
      bassChannel.volume.value = value
      bassSettings.channel.volume = value
    } else if (property === 'channelMute') {
      bassChannel.mute = value
      bassSettings.channel.mute = value
    }

    this.setState({
      bassSettings
    })
  }

  handleRadiationValueChange = (property, value) => {
    const { radiationSettings } = this.state

    if (property === 'synthType') {
      radiationSynth.oscillator.type = value
      radiationSettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      radiationSynth.envelope.attack = value
      radiationSettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      radiationSynth.envelope.decay = value
      radiationSettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      radiationSynth.envelope.sustain = value
      radiationSettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      radiationSynth.envelope.release = value
      radiationSettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      radiationPingPongDelay.wet.value = value
      radiationSettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      radiationChorus.wet.value = value
      radiationSettings.chorus.wet = value
    }
    if (property === 'channelVolume') {
      radiationChannel.volume.value = value
      radiationSettings.channel.volume = value
    } else if (property === 'channelMute') {
      radiationChannel.mute = value
      radiationSettings.channel.mute = value
    }

    this.setState({
      radiationSettings
    })
  }

  handleDrumsValueChange = (property, value) => {
    const { drumsSettings } = this.state

    if (property === 'channelVolume') {
      samplerChannel.volume.value = value
      drumsSettings.channel.volume = value
    } else if (property === 'channelMute') {
      samplerChannel.mute = value
      drumsSettings.channel.mute = value
    }

    this.setState({
      drumsSettings
    })
  }

  handleEnvironmentValueChange = (property, value) => {
    const { environmentSettings } = this.state

    if (property === 'pingPongDelayWet') {
      environmentPingPongDelay.wet.value = value
      environmentSettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      environmentChorus.wet.value = value
      environmentSettings.chorus.wet = value
    } else if (property === 'jcReverbWet') {
      environmentJcReverb.wet.value = value
      environmentSettings.jcReverb.wet = value
    }
    if (property === 'channelVolume') {
      environmentChannel.volume.value = value
      environmentSettings.channel.volume = value
    } else if (property === 'channelMute') {
      environmentChannel.mute = value
      environmentSettings.channel.mute = value
    }

    this.setState({
      environmentSettings
    })
  }

  render() {
    const {
      bassSettings,
      radiationSettings,
      drumsSettings,
      environmentSettings
    } = this.state

    return (
      <div className="Container">
        <div className="Section">
          <div className="SynthContaniier">
            <ToneSynth
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <Channel
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
          </div>
          <div className="SynthContainerBigger">
            <SC_Button text="Дешифровка" handleClick={this.handleStart} />
            <div className="BigPoster"></div>
          </div>

          <div className="SynthContaniier">
            <ToneSynth
              settings={radiationSettings}
              handleValueChange={this.handleRadiationValueChange}
            />
            <Channel
              settings={radiationSettings}
              handleValueChange={this.handleRadiationValueChange}
            />
          </div>
        </div>

        <div className="Section">
          <div className="LeftSection">
            <div className="EffectSection">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="PosterWall"></div>
          </div>
          <div className="SynthContaniier">
            <SC_Slider
              name="Delay Wet"
              min={0}
              max={1}
              step={0.01}
              value={environmentSettings.pingPongDelay.wet}
              property="pingPongDelayWet"
              handleChange={this.handleEnvironmentValueChange}
            />

            <SC_Slider
              name="Chorus Wet"
              min={0}
              max={1}
              step={0.01}
              value={environmentSettings.chorus.wet}
              property="chorusWet"
              handleChange={this.handleEnvironmentValueChange}
            />

            <SC_Slider
              name="JcReverb Wet"
              min={0}
              max={1}
              step={0.01}
              value={environmentSettings.jcReverb.wet}
              property="jcReverbWet"
              handleChange={this.handleEnvironmentValueChange}
            />

            <Channel
              settings={environmentSettings}
              handleValueChange={this.handleEnvironmentValueChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
