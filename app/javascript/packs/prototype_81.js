import p5 from 'p5'
import { sample, getRandomArbitrary } from '../prototypes/utilities'

const cells = 4
const canvasWidth = 150
const canvasHeight = 600
const cellSize = canvasHeight / cells
const types = ['none', 'left-to-right', 'right-to-left', 'cross']
// const types = ['left-to-right', 'right-to-left', 'cross']

const color = false

let r = 0
let g = 0
let b = 0

function drawTile(p, xMin, xMax, yMin, yMax) {
  const type = sample(types)

  if (color) {
    r = getRandomArbitrary(0, 255)
    g = getRandomArbitrary(0, 255)
    b = getRandomArbitrary(0, 255)

    p.stroke(r, g, b)
  }

  switch (type) {
    case 'left-to-right':
      p.line(xMin, yMin, xMax, yMax)
      break
    case 'right-to-left':
      p.line(xMax, yMin, xMin, yMax)
      break
    case 'cross':
      p.line(xMin, yMin, xMax, yMax)
      p.line(xMax, yMin, xMin, yMax)
      break
    default:
      break
  }
}

function drawTiles(p) {
  p.background(81)

  let column = 1

  for (let row = 0; row < cells; row++) {
    drawTile(p, column, column * cellSize, row * cellSize, (row + 1) * cellSize)
  }
}

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight)
    canvas.parent('prototype_81')
    p.frameRate(6)
    p.stroke(121, 255, 57)
  }

  p.draw = () => {
    drawTiles(p)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})