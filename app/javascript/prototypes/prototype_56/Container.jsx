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
import DistortionEffect from './modules/DistortionEffect.jsx'
import ChorusEffect from './modules/ChorusEffect.jsx'
import TremoloEffect from './modules/TremoloEffect.jsx'

import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'
import Surface from './components/Surface'
import SC_ToggleButtonSet from './components/SC_ToggleButtonSet.jsx'
import SC_ToggleButton from './components/SC_ToggleButton'
import Select from './components/Select'

let bassSynth
let bassChorus
let bassPingPongDelay
let bassTremolo
let bassDistortion
let bassPart

let radiationSynth
let radiationChorus
let radiationPingPongDelay
let radiationTremolo
let radiationDistortion
let radiationPart

let environmentSynth
let environmentChorus
let environmentPingPongDelay
let environmentJcReverb
let environmentTremolo
let environmentAutoWah
let environmentCheby
let environmentDistortion

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
      bpm: 80,
      radiationChangeMeasureSelect: false,
      radiationChangeMeasure: 8,
      radiationChangeRandom: false,
      radiationChange: false,
      random: false,
      bassSettings,
      radiationSettings,
      voiceSettings,
      environmentSettings
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener(
      'click',
      this.handleRadiationChangeMeasureSelectClose
    )
  }

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      // prettier-ignore
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ]
    }

    return array
  }

  handleRadiationChangeMeasureSelectClose = (e) => {
    console.log('close', e.target.classList[0])

    if (e.target.classList[0] != 'currentValue') {
      this.setState({
        radiationChangeMeasureSelect: false
      })
    }
  }

  handleRadiationChangeMeasureSelectOpen = () => {
    console.log('click')

    this.setState({
      radiationChangeMeasureSelect: true
    })
  }

  handleRadiationChangeMeasure = (property, value) => {
    this.setState({
      radiationChangeMeasureSelect: false,
      radiationChangeMeasure: value
    })
  }

  handleRadiationChange = () => {
    const { radiationChange } = this.state

    this.setState({
      radiationChange: !radiationChange
    })
  }

  handleRadiationChangeRandom = () => {
    const { radiationChangeRandom } = this.state

    this.setState({
      radiationChangeRandom: !radiationChangeRandom
    })
  }

  handleKeydown = (e) => {
    console.log(e.key, e.code, e.keyCode)

    switch (e.keyCode) {
      case 78:
        this.handleRadiationSequenceChange('', 'steps2')
        break
      case 77:
        this.handleRadiationSequenceChange('', 'steps1')
        break
    }

    switch (e.keyCode) {
      case 90:
        this.handleBassSequenceChange('', 'steps2')
        break
      case 88:
        this.handleBassSequenceChange('', 'steps1')
        break
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
    bassDistortion = new Tone.Distortion(bassSettings.distortion)

    bassChannel = new Tone.Channel(bassSettings.channel).toDestination()
    bassSynth.chain(
      bassChorus,
      bassPingPongDelay,
      bassTremolo,
      bassDistortion,
      bassChannel
    )

    bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps1).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = true

    //СИНТЕЗАТОР-ИЗЛУЧЕНИЕ
    //
    radiationSynth = new Tone.Synth(radiationSettings.synth)

    radiationChorus = new Tone.Chorus(radiationSettings.chorus).start()
    radiationDistortion = new Tone.Distortion(radiationSettings.distortion)
    radiationPingPongDelay = new Tone.PingPongDelay(
      radiationSettings.pingPongDelay
    )
    radiationTremolo = new Tone.Tremolo(radiationSettings.tremolo)

    radiationChannel = new Tone.Channel(
      radiationSettings.channel
    ).toDestination()
    radiationSynth.chain(
      radiationChorus,
      radiationDistortion,
      radiationPingPongDelay,
      radiationTremolo,
      radiationChannel
    )

    radiationPart = new Tone.Part((time, note) => {
      radiationSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, radiationSettings.sequence[radiationSettings.sequence.current]).start(0)

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
    environmentDistortion = new Tone.Distortion(environmentSettings.distortion)

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
      environmentDistortion,
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

    this.handleTransportChange('play', true)
  }

  nextMeasure = () => {
    const {
      radiationChangeMeasure,
      radiationChangeRandom,
      radiationChange
    } = this.state

    if (radiationChange) {
      const position = Tone.Transport.position
      const regexBefore = /([\w]+)/
      let measure = parseInt(position.match(regexBefore)[1]) + 1
      console.log('next measure', measure)

      const squaresPassed = Math.floor(measure / radiationChangeMeasure)

      if (
        measure == radiationChangeMeasure ||
        measure - squaresPassed * radiationChangeMeasure == 0
      ) {
        console.log('change')
        radiationPart.clear()

        if (radiationChangeRandom) {
          console.log('random')

          let notes = []

          radiationSettings.sequence.steps2.forEach((item, i) => {
            notes.push(item.noteName)
          })

          notes = this.shuffle(notes)

          let randomizedSequence = [...radiationSettings.sequence.steps2]

          randomizedSequence.forEach((step, i) => {
            let newStep = Object.assign({}, step)
            newStep.noteName = notes[i]
            radiationPart.add(newStep)
          })
        } else {
          radiationSettings.sequence.steps2.forEach((step, i) => {
            radiationPart.add(step)
          })
        }
      } else if (
        measure == radiationChangeMeasure + 1 ||
        measure - squaresPassed * radiationChangeMeasure == 1
      ) {
        console.log('change back')
        radiationPart.clear()

        radiationSettings.sequence.steps1.forEach((step, i) => {
          radiationPart.add(step)
        })
      }
    }
  }

  handleTransportChange = (property, value) => {
    const { bpm } = this.state

    switch (property) {
      case 'play':
        Tone.Transport.start()
        Tone.Transport.scheduleRepeat(this.nextMeasure, '1m')

        this.setState({
          isStarted: true
        })
        break
      case 'bpm':
        Tone.Transport.bpm.value = value

        this.setState({
          bpm: value
        })
        break
    }
  }

  //ОБЩАЯ ФУНКЦИЯ
  handleValueChange = (instrumentName, property, value) => {
    const { bassSettings, radiationSettings, environmentSettings } = this.state

    let instrument
    let pingPongDelay
    let chorus
    let distortion
    let tremolo
    let channel
    let settings

    if (instrumentName === 'bass') {
      instrument = bassSynth
      pingPongDelay = bassPingPongDelay
      chorus = bassChorus
      distortion = bassDistortion
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
      distortion = radiationDistortion
    } else if (instrumentName === 'environment') {
      instrument = environmentSynth
      pingPongDelay = environmentPingPongDelay
      chorus = environmentChorus
      tremolo = environmentTremolo
      distortion = environmentDistortion
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
      case 'distortionWet':
        distortion.wet.value = value
        settings.distortion.wet = value
        break
      case 'distortionDistortion':
        distortion.distortion = value
        settings.distortion.distortion = value
        break
      case 'distortionOversample':
        distortion.oversample = value
        settings.distortion.oversample = value
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

  handleRadiationSequenceChange = (property, value) => {
    const { radiationSettings } = this.state
    const steps = radiationSettings.sequence[value]

    radiationSettings.sequence.current = value

    radiationPart.clear()

    steps.forEach((step, i) => {
      radiationPart.add(step)
    })
    this.setState({
      radiationSettings
    })
  }

  handleBassSequenceChange = (property, value) => {
    let steps

    if (value == 'steps1') {
      steps = bassSettings.sequence.steps1
    } else if (value == 'steps2') {
      steps = bassSettings.sequence.steps2
    }

    bassPart.clear()

    steps.forEach((step, i) => {
      bassPart.add(step)
    })
  }

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
      bpm,
      radiationChangeMeasureSelect,
      radiationChangeMeasure,
      radiationChangeRandom,
      radiationChange,
      bassSettings,
      radiationSettings,
      voiceSettings,
      environmentSettings
    } = this.state

    const radiationChangeButtonText = radiationChange ? 'On' : 'Off'

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
              <div className="New_Features">
                <SC_ToggleButtonSet
                  name="фазы облучения"
                  options={['steps1', 'steps2']}
                  value={radiationSettings.sequence.current}
                  property="radiationSequence"
                  handleChange={this.handleRadiationSequenceChange}
                />

                <Select
                  name="Change melody on measure"
                  options={[2, 4, 8, 16, 32]}
                  isOpened={radiationChangeMeasureSelect}
                  value={radiationChangeMeasure}
                  property=""
                  handleRadiationChangeMeasureSelectOpen={
                    this.handleRadiationChangeMeasureSelectOpen
                  }
                  handleChange={this.handleRadiationChangeMeasure}
                />

                <SC_ToggleButton
                  text={radiationChangeButtonText}
                  isOn={radiationChange}
                  handleClick={this.handleRadiationChange}
                />

                <SC_ToggleButton
                  text="Random"
                  isOn={radiationChangeRandom}
                  handleClick={this.handleRadiationChangeRandom}
                />

                <DistortionEffect
                  title="Distortion"
                  instrumentName="radiation"
                  settings={radiationSettings}
                  handleValueChange={this.handleValueChange}
                />

                <DistortionEffect
                  title="Distortion"
                  instrumentName="bass"
                  settings={bassSettings}
                  handleValueChange={this.handleValueChange}
                />

                <DistortionEffect
                  title="Distortion"
                  instrumentName="environment"
                  settings={environmentSettings}
                  handleValueChange={this.handleValueChange}
                />

                <SC_Slider
                  name="период полураспада"
                  min={0}
                  max={300}
                  step={1}
                  value={bpm}
                  property="bpm"
                  handleChange={(property, value) => {
                    this.handleTransportChange(property, value)
                  }}
                />
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
