import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as radiationSettings from './tunes/radiation.js'
import * as voiceSettings from './tunes/voice.js'
import * as environmentSettings from './tunes/environment.js'

import FirstToneSynth from './modules/FirstToneSynth.jsx'
import SecondToneSynth from './modules/SecondToneSynth.jsx'
import Channel from './modules/Channel.jsx'
import SecondChannel from './modules/SecondChannel.jsx'
import PingPongDelayEffect from './modules/PingPongDelayEffect.jsx'
import ChorusEffect from './modules/ChorusEffect.jsx'
import TremoloEffect from './modules/TremoloEffect.jsx'

import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'
import Surface from './components/Surface'

let bassSynth
let bassChorus
let bassPingPongDelay
let bassTremolo

let radiationSynth
let radiationChorus
let radiationPingPongDelay
let radiationTremolo

let environmentSynth
let environmentChorus
let environmentPingPongDelay
let environmentJcReverb
let environmentTremolo
let environmentAutoWah
let environmentCheby

let samplerChannel
let bassChannel
let radiationChannel
let environmentChannel

let voiceJcReverb
let voiceChorus
let voicePingPongDelay

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isStarted: false,
      bassSettings,
      radiationSettings,
      voiceSettings,
      environmentSettings
    }
  }

  handleStart = () => {
    const {
      bassSettings,
      radiationSettings,
      voiceSettings,
      environmentSettings
    } = this.state

    //СИНТЕЗАТОР-ВИБРАЦИЯ
    //
    bassSynth = new Tone.Synth(bassSettings.synth)
    bassChorus = new Tone.Chorus(bassSettings.chorus).start()
    bassPingPongDelay = new Tone.PingPongDelay(bassSettings.pingPongDelay)
    bassTremolo = new Tone.Tremolo(bassSettings.tremolo)

    bassChannel = new Tone.Channel(bassSettings.channel).toDestination()
    bassSynth.chain(bassChorus, bassPingPongDelay, bassTremolo, bassChannel)

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
    radiationTremolo = new Tone.Tremolo(radiationSettings.tremolo)

    radiationChannel = new Tone.Channel(
      radiationSettings.channel
    ).toDestination()
    radiationSynth.chain(
      radiationChorus,
      radiationPingPongDelay,
      radiationTremolo,
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
    environmentTremolo = new Tone.Tremolo(environmentSettings.tremolo)
    environmentAutoWah = new Tone.AutoWah(environmentSettings.autoWah)
    environmentCheby = new Tone.Chebyshev(environmentSettings.cheby)

    environmentChannel = new Tone.Channel(
      environmentSettings.channel
    ).toDestination()
    environmentSynth.chain(
      environmentChorus,
      environmentPingPongDelay,
      environmentJcReverb,
      environmentTremolo,
      environmentAutoWah,
      environmentCheby,
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
    //
    //СЭМПЛЕР (ГОЛОС)

    const sampler = new Tone.Sampler({
      urls: {
        A1: 'voice_0.mp3',
        A2: 'voice_5.mp3'
      },
      baseUrl: 'http://localhost:3000/samples/'
      // onload: () => {
      //   sampler.triggerAttackRelease(['A1', 'A2', 'A1', 'A2'], 0.5)
      // }
    })

    voiceJcReverb = new Tone.JCReverb(voiceSettings.jcReverb)
    voiceChorus = new Tone.Chorus(voiceSettings.chorus).start()
    voicePingPongDelay = new Tone.PingPongDelay(voiceSettings.pingPongDelay)

    samplerChannel = new Tone.Channel(voiceSettings.channel).toDestination()

    sampler.chain(
      voicePingPongDelay,
      voiceChorus,
      voiceJcReverb,
      samplerChannel
    )

    const voicePart = new Tone.Part((time, note) => {
      sampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, voiceSettings.sequence.steps).start(0)

    voicePart.loopEnd = voiceSettings.sequence.duration
    voicePart.loop = true

    Tone.Transport.start()
    this.setState({
      isStarted: true
    })
  }

  //ОБЩАЯ ФУНКЦИЯ
  handleValueChange = (instrumentName, property, value) => {
    const { bassSettings, radiationSettings, environmentSettings } = this.state

    let instrument
    let pingPongDelay
    let chorus
    let tremolo
    let channel
    let settings

    if (instrumentName === 'bass') {
      instrument = bassSynth
      pingPongDelay = bassPingPongDelay
      chorus = bassChorus
      tremolo = bassTremolo
      settings = bassSettings
      channel = bassChannel
    } else if (instrumentName === 'radiation') {
      instrument = radiationSynth
      pingPongDelay = radiationPingPongDelay
      chorus = radiationChorus
      tremolo = radiationTremolo
      settings = radiationSettings
      channel = radiationChannel
    } else if (instrumentName === 'environment') {
      instrument = environmentSynth
      pingPongDelay = environmentPingPongDelay
      chorus = environmentChorus
      tremolo = environmentTremolo
      settings = environmentSettings
      channel = environmentChannel
    }

    switch (property) {
      case 'synthType':
        instrument.oscillator.type = value
        settings.synth.oscillator.type = value
        break
      case 'synthEnvelopeAttack':
        instrument.envelope.attack = value
        settings.synth.envelope.attack = value
        break
      case 'synthEnvelopeDecay':
        instrument.envelope.decay = value
        settings.synth.envelope.decay = value
        break
      case 'synthEnvelopeSustain':
        instrument.envelope.sustain = value
        settings.synth.envelope.sustain = value
        break
      case 'synthEnvelopeRelease':
        instrument.envelope.release = value
        settings.synth.envelope.release = value
        break
      case 'pingPongDelayWet':
        pingPongDelay.wet.value = value
        settings.pingPongDelay.wet = value
        break
      case 'chorusWet':
        chorus.wet.value = value
        settings.chorus.wet = value
        break
      case 'tremoloWet':
        tremolo.wet.value = value
        settings.tremolo.wet = value
        break
    }

    switch (property) {
      case 'channelVolume':
        channel.volume.value = value
        settings.channel.volume = value
        break
      case 'channelMute':
        channel.mute = value
        settings.channel.mute = value
        break
    }

    this.setState({
      bassSettings,
      radiationSettings,
      environmentSettings
    })
  }
  //

  handleVoiceValueChange = (property, value) => {
    const { voiceSettings } = this.state

    if (property === 'channelVolume') {
      samplerChannel.volume.value = value
      voiceSettings.channel.volume = value
    } else if (property === 'channelMute') {
      samplerChannel.mute = value
      voiceSettings.channel.mute = value
    }

    this.setState({
      voiceSettings
    })
  }

  handleEnvironmentValueChange = (property, value) => {
    const { environmentSettings } = this.state

    if (property === 'pingPongDelayWet') {
      environmentPingPongDelay.wet.value = value
      environmentSettings.pingPongDelay.wet = value
    } else if (property === 'environmentPingPongDelayDelayTime') {
      environmentPingPongDelay.delayTime.value = value
      environmentSettings.pingPongDelay.delayTime = value
    } else if (property === 'environmentPingPongDelayMaxDelayTime') {
      environmentPingPongDelay.maxDelayTime = value
      environmentSettings.pingPongDelay.maxDelayTime = value
    } else if (property === 'chorusWet') {
      environmentChorus.wet.value = value
      environmentSettings.chorus.wet = value
    } else if (property === 'jcReverbWet') {
      environmentJcReverb.wet.value = value
      environmentSettings.jcReverb.wet = value
    } else if (property === 'tremoloWet') {
      environmentTremolo.wet.value = value
      environmentSettings.tremolo.wet = value
    } else if (property === 'autoWahWet') {
      environmentAutoWah.wet.value = value
      environmentSettings.autoWah.wet = value
    } else if (property === 'chebyWet') {
      environmentCheby.wet.value = value
      environmentSettings.cheby.wet = value
    }

    this.setState({
      environmentSettings
    })
  }

  renderStartButton = () => {
    return <SC_Button text="послушать слизь" handleClick={this.handleStart} />
  }

  renderUI = () => {
    const {
      bassSettings,
      radiationSettings,
      voiceSettings,
      environmentSettings
    } = this.state

    return (
      <div className="All">
        <div className="Container">
          <div className="Section">
            <div className="SynthContainer">
              <FirstToneSynth
                instrumentName="bass"
                settings={bassSettings}
                handleValueChange={this.handleValueChange}
              />
              <Channel
                instrumentName="bass"
                settings={bassSettings}
                handleValueChange={this.handleValueChange}
              />
            </div>
            <div className="SynthContainerBigger">
              <h1 className="Tittle">дешифровка</h1>
              <div className="BigPoster"></div>
            </div>

            <div className="SynthContainer">
              <SecondToneSynth
                instrumentName="radiation"
                settings={radiationSettings}
                handleValueChange={this.handleValueChange}
              />
              <Channel
                instrumentName="radiation"
                settings={radiationSettings}
                handleValueChange={this.handleValueChange}
              />
            </div>
          </div>

          <div className="Section SecondSection">
            <div className="LeftSection">
              <div className="EffectSection">
                <div className="AdditionalEffects">
                  <PingPongDelayEffect
                    name="задержка вибрации"
                    instrumentName="bass"
                    settings={bassSettings}
                    handleValueChange={this.handleValueChange}
                  />
                  <PingPongDelayEffect
                    name="задержка радиации"
                    instrumentName="radiation"
                    settings={radiationSettings}
                    handleValueChange={this.handleValueChange}
                  />
                </div>
                <div className="AdditionalEffects">
                  <ChorusEffect
                    name="полярицация вибрации"
                    instrumentName="bass"
                    settings={bassSettings}
                    handleValueChange={this.handleValueChange}
                  />
                  <ChorusEffect
                    name="полярицация радиации"
                    instrumentName="radiation"
                    settings={radiationSettings}
                    handleValueChange={this.handleValueChange}
                  />
                </div>
                <div className="AdditionalEffects">
                  <TremoloEffect
                    name="фильтр для вибрации"
                    instrumentName="bass"
                    settings={bassSettings}
                    handleValueChange={this.handleValueChange}
                  />
                  <TremoloEffect
                    name="фильр для радиации"
                    instrumentName="radiation"
                    settings={radiationSettings}
                    handleValueChange={this.handleValueChange}
                  />
                </div>
              </div>
              <div className="PosterWall">
                <div className="Wall Wall_1">
                  <div className="SmallPoster Poster_1">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_2">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_3">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_4">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_5">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                </div>
                <div className="Wall Wall_2">
                  <div className="SmallPoster Poster_6">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_7">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_8">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_9">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_10">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                </div>
                <div className="Wall Wall_2">
                  <div className="SmallPoster Poster_11">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_12">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_13">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_14">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                  <div className="SmallPoster Poster_15">
                    <SecondChannel
                      settings={voiceSettings}
                      handleValueChange={this.handleVoiceValueChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="RightSection">
              <div className="SynthContainer">
                <div className="third_EffectSynthContaniier">
                  <h1>Среда</h1>
                  <SC_Slider
                    name="температура"
                    min={0}
                    max={1}
                    step={0.01}
                    value={environmentSettings.pingPongDelay.wet}
                    property="pingPongDelayWet"
                    handleChange={this.handleEnvironmentValueChange}
                  />

                  <SC_Slider
                    name="давление"
                    min={0}
                    max={1}
                    step={0.01}
                    value={environmentSettings.chorus.wet}
                    property="chorusWet"
                    handleChange={this.handleEnvironmentValueChange}
                  />

                  <SC_Slider
                    name="освещение"
                    min={0}
                    max={1}
                    step={0.01}
                    value={environmentSettings.jcReverb.wet}
                    property="jcReverbWet"
                    handleChange={this.handleEnvironmentValueChange}
                  />

                  <SC_Slider
                    name="кислород"
                    min={0}
                    max={1}
                    step={0.01}
                    value={environmentSettings.tremolo.wet}
                    property="tremoloWet"
                    handleChange={this.handleEnvironmentValueChange}
                  />

                  <SC_Slider
                    name="углекислый газ"
                    min={0}
                    max={1}
                    step={0.01}
                    value={environmentSettings.autoWah.wet}
                    property="autoWahWet"
                    handleChange={this.handleEnvironmentValueChange}
                  />

                  <SC_Slider
                    name="смесь инертных газов"
                    min={0}
                    max={1}
                    step={0.01}
                    value={environmentSettings.cheby.wet}
                    property="chebyWet"
                    handleChange={this.handleEnvironmentValueChange}
                  />
                </div>

                <Channel
                  instrumentName="environment"
                  settings={environmentSettings}
                  handleValueChange={this.handleValueChange}
                />
              </div>
              <div className="Thing">
                // SURFACE НАХОДИТСЯ ТУТ
                <Surface
                  minX="0"
                  maxX="1"
                  stepX="0.01"
                  valueX={environmentSettings.pingPongDelay.delayTime}
                  propertyX="environmentPingPongDelayDelayTime"
                  minY="0"
                  maxY="1"
                  stepY="0.01"
                  valueY={environmentSettings.pingPongDelay.maxDelayTime}
                  propertyY="environmentPingPongDelayMaxDelayTime"
                  handleValueChange={this.handleEnvironmentValueChange}
                />
                // SURFACE НАХОДИТСЯ ТУТ
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { isStarted, isUIShown } = this.state

    return (
      <div className="Container">
        {isStarted ? this.renderUI() : this.renderStartButton()}
      </div>
    )
  }
}
