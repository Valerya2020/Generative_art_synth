import { getRandomArbitrary, sample } from '../prototypes/utilities'

// Array structure
// [class-name, min-diameter, max-diameter, min-layer, max-layer]
//
// prettier-ignore
const circleTypes = [
  ['sign1',      100,  120,  2, 4],
  ['sign2',      100,  120,  2, 4],
  ['sign3',      100,  120,  2, 4],
  ['sign4',      100,  120,  2, 4],
  ['sign5',      100,  120,  2, 4],
  ['sign6',      100,  120,  1, 1],
  ['sign7',      100,  120,  1, 1],
  ['sign8',      100,  120,  1, 1],
]

function createCircle(container) {
  const circleElement = document.createElement('div')
  const circleType = sample(circleTypes)
  circleElement.classList.add('graphem')

  const top = getRandomArbitrary(0, 470)
  const left = getRandomArbitrary(0, 30)
  const size = getRandomArbitrary(circleType[1], circleType[2])

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [size, 'px'].join('')
  circleElement.style.height = [size, 'px'].join('')

  circleElement.style.zIndex = Math.floor(
    getRandomArbitrary(circleType[3], circleType[4])
  )

  /* circleElement.style.transform = `rotate(${getRandomArbitrary(10, 350)}deg)` */
  circleElement.classList.add(circleType[0])

  container.appendChild(circleElement)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_84')
  const particlesQuantity = Math.floor(getRandomArbitrary(10, 20))

  for (var i = 0; i < particlesQuantity; i++) {
    createCircle(container)
  }
})
