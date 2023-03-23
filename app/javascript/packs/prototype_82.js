import p5 from 'p5'
import { sample, getRandomArbitrary } from '../prototypes/utilities'

const cells = 4
const canvasWidth = 150
const canvasHeight = 600
const cellSize = canvasHeight / cells
const types = ['none', 'left-to-right', 'right-to-left', 'cross']
// const types = ['left-to-right', 'right-to-left', 'cross']

const color = false

let weight = 0
let r = 0
let g = 0
let b = 0

function drawTile(p, xMin, xMax, yMin, yMax) {
  const type = sample(types)
  const xCenter = xMax - cellSize / 2
  const yCenter = yMax - cellSize / 2

  weight = getRandomArbitrary(0, 40)

  if (color) {
    r = getRandomArbitrary(0, 255)
    g = getRandomArbitrary(0, 255)
    b = getRandomArbitrary(0, 255)

    p.stroke(r, g, b)
  }

  p.strokeWeight(weight)
  p.point(xCenter, yCenter)
}

function drawTiles(p) {
  p.background(0)

  let column = 1

  for (let row = 0; row < cells; row++) {
    drawTile(p, column, column * cellSize, row * cellSize, (row + 1) * cellSize)
  }
}

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight)
    canvas.parent('prototype_82')
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
