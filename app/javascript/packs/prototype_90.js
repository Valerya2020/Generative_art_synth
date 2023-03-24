import { getRandomArbitrary, sample } from '../prototypes/utilities'

// Array structure
// [class-name, min-diameter, max-diameter, min-layer, max-layer]
//
// prettier-ignore
const graphemTypes = [
  ['sign1',      100,  120,  2, 4],
  ['sign2',      100,  120,  2, 4],
  ['sign3',      100,  120,  2, 4],
  ['sign4',      100,  120,  2, 4],
  ['sign5',      100,  120,  2, 4],
  ['sign6',      100,  120,  1, 1],
  ['sign7',      100,  120,  1, 1],
  ['sign8',      100,  120,  1, 1],
]

/* function createGlyph() {
  
  const graphemElement = document.createElement('div')
  const graphemType = sample(graphemTypes)
  graphemElement.classList.add('graphem')

  const top = getRandomArbitrary(0, 470)
  const left = getRandomArbitrary(0, 30)
  const size = getRandomArbitrary(graphemType[1], graphemType[2])

  graphemElement.style.top = [top, 'px'].join('')
  graphemElement.style.left = [left, 'px'].join('')
  graphemElement.style.width = [size, 'px'].join('')
  graphemElement.style.height = [size, 'px'].join('')

  graphemElement.style.zIndex = Math.floor(
    getRandomArbitrary(graphemType[3], graphemType[4])
  )

  
  graphemElement.classList.add(graphemType[0])

  return graphemElement
  
} */

function createPaper(container) {
  /* paper.parent('prototype_85') */
  const paper = document.createElement('div')
  paper.classList.add('paper')

  container.appendChild(paper)
}

/* function createGlyphs() {
  const particlesQuantity = Math.floor(getRandomArbitrary(10, 20))

  for (var i = 0; i < particlesQuantity; i++) {
    createGlyph(paper)
    paper.appendChild(graphemElement)
  }
} */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_90')
  const paperQuantity = Math.floor(getRandomArbitrary(2, 6))

  for (var i = 0; i < paperQuantity; i++) {
    createPaper(container)
  }
})
