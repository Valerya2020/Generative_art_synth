const channel = {
  volume: 0,
  mute: true
}

const jcReverb = {
  wet: 1,
  roomSize: 0.5
}

const chorus = {
  wet: 1,
  type: 'sawtooth',
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  spread: 180
}

const pingPongDelay = { wet: 1, delayTime: 0.25, maxDelayTime: 1 }

const sequence = {
  steps: [
    {
      time: '0:0:0',
      noteName: 'A1',
      duration: '4m',
      velocity: 1
    }
    // {
    //   time: '0:1:0',
    //   noteName: 'A2',
    //   duration: '4n',
    //   velocity: 0.2
    // },
    // {
    //   time: '0:2:0',
    //   noteName: 'A1',
    //   duration: '4n',
    //   velocity: 0.6
    // },
    // {
    //   time: '0:3:0',
    //   noteName: 'A2',
    //   duration: '4n',
    //   velocity: 0.2
    // }
  ],
  duration: '2m'
}

export { channel, jcReverb, chorus, pingPongDelay, sequence }
