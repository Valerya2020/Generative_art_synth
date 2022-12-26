const channel = {
  volume: 0,
  mute: true
}

const synth = {
  volume: 20,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 0.2,
    decayCurve: 'exponential',
    sustain: 0.2,
    release: 1.5,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'triangle',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

const chorus = {
  wet: 0.3,
  type: 'sine',
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  spread: 180
}

const pingPongDelay = { wet: 0.2, delayTime: 0.25, maxDelayTime: 1 }

const jcReverb = {
  wet: 0.3,
  roomSize: 0.3
}

const tremolo = {
  wet: 0.2,
  frequency: 10,
  type: 'sawtooth',
  depth: 1,
  spread: 360
}

const autoWah = {
  wet: 0.5,
  baseFrequency: 140,
  octaves: 4,
  sensitivity: 1,
  Q: 3,
  gain: 2,
  follower: 0.1
}

const cheby = {
  wet: 0,
  order: 50,
  oversample: 'none'
}

const sequence = {
  steps: [
    {
      time: '0:0:0',
      noteName: 'C5',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:1:0',
      noteName: 'B5',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:2:0',
      noteName: 'B4',
      duration: '2n',
      velocity: 1
    },
    {
      time: '1:0:0',
      noteName: 'F4',
      duration: '2n',
      velocity: 1
    },
    {
      time: '2:0:0',
      noteName: 'B3',
      duration: '2n',
      velocity: 1
    },
    {
      time: '2:2:0',
      noteName: 'F7',
      duration: '2n',
      velocity: 1
    },
    {
      time: '3:0:0',
      noteName: 'C5',
      duration: '2n',
      velocity: 1
    }
  ],
  duration: '2m'
}

export {
  channel,
  synth,
  chorus,
  pingPongDelay,
  jcReverb,
  tremolo,
  autoWah,
  cheby,
  sequence
}
