const channel = {
  volume: 0,
  mute: false
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
    type: 'sawtooth',
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

const tremolo = {
  wet: 0.3,
  frequency: 5,
  type: 'sine',
  depth: 0.8,
  spread: 300
}

const sequence = {
  steps: [
    {
      time: '0:0:0',
      noteName: 'A2',
      duration: '2n',
      velocity: 0.1
    },
    {
      time: '1:0:0',
      noteName: 'F2',
      duration: '2n',
      velocity: 0.1
    },
    {
      time: '2:0:0',
      noteName: 'F2',
      duration: '2n',
      velocity: 0.1
    },
    {
      time: '3:0:0',
      noteName: 'B2',
      duration: '2n',
      velocity: 0.1
    }
  ],
  duration: '4m'
}

export { channel, synth, chorus, pingPongDelay, tremolo, sequence }
