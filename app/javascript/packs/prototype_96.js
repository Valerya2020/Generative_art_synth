import html2canvas from 'html2canvas'
import {
  getRandomArbitrary,
  sample,
  generateHash
} from '../prototypes/utilities'

// Array structure
// [class-name, min-diameter, max-diameter, min-layer, max-layer]
//
// prettier-ignore
const graphemTypes = [
  ['sign1',                   100,  120,  2, 4],
  ['sign2',                   100,  120,  2, 4],
  ['sign3',                   100,  120,  2, 4],
  ['sign4',                   100,  120,  2, 4],
  ['sign5',                   100,  120,  2, 4],
  ['sign6',                   100,  120,  1, 1],
  ['sign7',                   100,  120,  1, 1],
  ['sign8',                   100,  120,  1, 1],
  ['sign10',                  100,  120,  1, 1],
  ['sign12',                  100,  120,  1, 1],
  ['sign13',                  100,  120,  1, 1],
  ['sign14',                  100,  120,  1, 1],
  ['sign15',                  100,  120,  1, 1],
  ['sign16',                  100,  120,  1, 1],
  ['sign17',                  100,  120,  1, 1],
  ['sign18',                  100,  120,  1, 1],
  ['sign19',                  100,  120,  1, 1],
  ['sign20',                  100,  120,  1, 1],
  ['sign21',                  100,  120,  1, 1],
  ['sign22',                  100,  120,  1, 1],
  ['sign23',                  100,  120,  1, 1],
  ['sign24',                  100,  120,  1, 1],
  ['sign25',                  100,  120,  1, 1],
  ['sign26',                  100,  120,  1, 1],
  ['sign27',                  100,  120,  1, 1],
  ['sign28',                  100,  120,  1, 1],
  ['sign29',                  100,  120,  1, 1],
  ['sign30',                  100,  120,  1, 1],
  ['sign31',                  100,  120,  2, 4],
  ['sign31',                  100,  120,  2, 4],
  ['sign32',                  100,  120,  2, 4],
  ['sign33',                  100,  120,  2, 4],
  ['sign34',                  100,  120,  2, 4],
  ['sign35',                  100,  120,  2, 4],
  ['sign36',                  100,  120,  2, 4],
  ['sign37',                  100,  120,  2, 4],
  ['sign38',                  100,  120,  2, 4],
  ['sign39',                  100,  120,  2, 4],
  ['sign40',                  100,  120,  2, 4],
  ['sign41',                  100,  120,  2, 4],
  ['sign42',                  100,  120,  2, 4],
  ['sign43',                  100,  120,  2, 4],
  ['sign44',                  100,  120,  2, 4],
  ['sign45',                  100,  120,  2, 4],
  ['sign46',                  100,  120,  2, 4],
  ['sign47',                  100,  120,  2, 4],
  ['sign48',                  100,  120,  2, 4],
  ['sign49',                  100,  120,  2, 4],
  ['sign50',                  100,  120,  2, 4],
  ['sign51',                  100,  120,  2, 4],
  ['sign52',                  100,  120,  2, 4],
  ['sign53',                  100,  120,  2, 4],
  ['sign54',                  100,  120,  2, 4],
  ['sign55',                  100,  120,  2, 4],
  ['sign56',                  100,  120,  2, 4],
  ['sign57',                  100,  120,  2, 4],
  ['sign58',                  100,  120,  2, 4],
  ['sign59',                  100,  120,  2, 4],
  ['sign60',                  100,  120,  2, 4],
  ['sign61',                  100,  120,  2, 4],
  ['sign62',                  100,  120,  2, 4],
  ['sign63',                  100,  120,  2, 4],
  ['sign64',                  100,  120,  2, 4],
  ['sign65',                  100,  120,  2, 4],
  ['sign66',                  100,  120,  2, 4],
  ['sign67',                  100,  120,  2, 4],
  ['sign68',                  100,  120,  2, 4],
  ['sign69',                  100,  120,  2, 4],
  ['sign70',                  100,  120,  2, 4],
  ['sign71',                  100,  120,  2, 4],
  ['sign72',                  100,  120,  2, 4],
  ['sign73',                  100,  120,  2, 4],
  ['sign74',                  100,  120,  2, 4],
  ['sign75',                  100,  120,  2, 4],
  ['sign76',                  100,  120,  2, 4],
  ['sign77',                  100,  120,  2, 4],
  ['sign78',                  100,  120,  2, 4],
  ['sign79',                  100,  120,  2, 4],
  ['sign80',                  100,  120,  2, 4],
  ['sign81',                  100,  120,  2, 4],
  ['sign82',                  100,  120,  2, 4],
  ['sign83',                  100,  120,  2, 4],
  ['sign84',                  100,  120,  2, 4],
  ['sign85',                  100,  120,  2, 4],
  ['sign86',                  100,  120,  2, 4],
  ['sign87',                  100,  120,  2, 4],
  ['sign88',                  100,  120,  2, 4],
  ['sign89',                  100,  120,  2, 4],
  ['sign90',                  100,  120,  2, 4],
  ['sign91',                  100,  120,  2, 4],
  ['sign92',                  100,  120,  2, 4],
  ['sign93',                  100,  120,  2, 4],
  ['sign94',                  100,  120,  2, 4],
  ['sign95',                  100,  120,  2, 4],
  ['sign96',                  100,  120,  2, 4],
  ['sign97',                  100,  120,  2, 4],
  ['sign98',                  100,  120,  2, 4],
  ['sign99',                  100,  120,  2, 4],
  ['sign100',                 100,  120,  2, 4],
  ['sign101',                 100,  120,  2, 4],
  ['sign102',                 100,  120,  2, 4],
  ['sign103',                 100,  120,  2, 4],
  ['sign104',                 100,  120,  2, 4],
  ['sign105',                 100,  120,  2, 4],
  ['sign106',                 100,  120,  2, 4],
  ['sign107',                 100,  120,  2, 4],
  ['sign108',                 100,  120,  2, 4],
  ['sign109',                 100,  120,  2, 4],
  ['sign110',                 100,  120,  2, 4],
  ['sign111',                 100,  120,  2, 4],
  ['sign112',                 100,  120,  2, 4],
  ['sign113',                 100,  120,  2, 4],
  ['sign114',                 100,  120,  2, 4],
  ['sign115',                 100,  120,  2, 4],
  ['sign116',                 100,  120,  2, 4],
  ['sign117',                 100,  120,  2, 4],
  ['sign118',                 100,  120,  2, 4],
  ['sign119',                 100,  120,  2, 4],
  ['sign120',                 100,  120,  2, 4],
  ['sign121',                 100,  120,  2, 4],
  ['sign122',                 100,  120,  2, 4],
  ['sign123',                 100,  120,  2, 4],
  ['sign124',                 100,  120,  2, 4],
  ['spot1',                   100,  120,  2, 4],
  ['spot2',                   100,  120,  2, 4],
  ['spot3',                   100,  120,  2, 4],
  ['spot4',                   100,  120,  2, 4],
  ['spot5',                   100,  120,  2, 4],
  ['spot6',                   100,  120,  1, 1],
  ['spot7',                   100,  120,  1, 1],
  ['spot8',                   100,  120,  1, 1],
  ['spot9',                   100,  120,  1, 1],
  ['spot10',                  100,  120,  1, 1],
  ['spot11',                  100,  120,  1, 1],
  ['spot12',                  100,  120,  1, 1],
  ['spot13',                  100,  120,  1, 1],
  ['spot14',                  100,  120,  1, 1],
  ['spot15',                  100,  120,  1, 1],
  ['spot16',                  100,  120,  1, 1],
  ['spot17',                  100,  120,  1, 1],
  ['spot18',                  100,  120,  1, 1],
  ['spot19',                  100,  120,  1, 1],
  ['spot20',                  100,  120,  1, 1],
  ['spot21',                  100,  120,  1, 1],
  ['spot22',                  100,  120,  1, 1],
  ['spot23',                  100,  120,  1, 1],
  ['spot24',                  100,  120,  1, 1],
  ['spot25',                  100,  120,  1, 1],
  ['spot26',                  100,  120,  1, 1],
  ['spot27',                  100,  120,  1, 1],
  ['spot28',                  100,  120,  1, 1],
  ['spot29',                  100,  120,  2, 4],
  ['spot30',                  100,  120,  2, 4],
  ['spot31',                  100,  120,  2, 4],
  ['spot32',                  100,  120,  2, 4],
  ['spot33',                  100,  120,  2, 4],
  ['spot34',                  100,  120,  2, 4],
  ['spot35',                  100,  120,  2, 4],
  ['spot36',                  100,  120,  2, 4],
  ['spot37',                  100,  120,  2, 4],
  ['spot38',                  100,  120,  2, 4],
  ['spot39',                  100,  120,  2, 4],
  ['spot40',                  100,  120,  2, 4],
  ['spot41',                  100,  120,  2, 4],
  ['spot42',                  100,  120,  2, 4],
  ['spot43',                  100,  120,  2, 4],
  ['spot44',                  100,  120,  2, 4],
  ['spot45',                  100,  120,  2, 4],
  ['spot46',                  100,  120,  2, 4],
  ['spot47',                  100,  120,  2, 4],
  ['spot48',                  100,  120,  2, 4],
  ['spot49',                  100,  120,  2, 4],
  ['spot50',                  100,  120,  2, 4],
  ['spot51',                  100,  120,  2, 4],
  ['spot52',                  100,  120,  2, 4],
  ['spot53',                  100,  120,  2, 4],
  ['symbol1',                 100,  120,  2, 4],
  ['symbol2',                 100,  120,  2, 4],
  ['symbol3',                 100,  120,  2, 4],
  ['symbol4',                 100,  120,  2, 4],
  ['symbol5',                 100,  120,  2, 4],
  ['symbol6',                 100,  120,  2, 4],
  ['symbol7',                 100,  120,  2, 4],
  ['symbol8',                 100,  120,  2, 4],
  ['symbol9',                 100,  120,  2, 4],
  ['symbol10',                100,  120,  2, 4],
  ['symbol11',                100,  120,  2, 4],
  ['symbol12',                100,  120,  2, 4],
  ['symbol13',                100,  120,  2, 4],
  ['symbol14',                100,  120,  2, 4],
  ['symbol15',                100,  120,  2, 4],
  ['symbol16',                100,  120,  2, 4],
  ['symbol17',                100,  120,  2, 4],
  ['symbol18',                100,  120,  2, 4],
  ['symbol19',                100,  120,  2, 4],
  ['symbol20',                100,  120,  2, 4],
  ['symbol21',                100,  120,  2, 4],
  ['symbol22',                100,  120,  2, 4],
  ['symbol23',                100,  120,  2, 4],
  ['symbol24',                100,  120,  2, 4],
  ['symbol25',                100,  120,  2, 4],
  ['symbol26',                100,  120,  2, 4],
  ['symbol27',                100,  120,  2, 4],
  ['symbol28',                100,  120,  2, 4],
  ['symbol29',                100,  120,  2, 4],
  ['symbol30',                100,  120,  2, 4],
  ['symbol31',                100,  120,  2, 4],
  ['symbol32',                100,  120,  2, 4],
  ['symbol33',                100,  120,  2, 4],
  ['symbol34',                100,  120,  2, 4],
  ['symbol35',                100,  120,  2, 4],
  ['symbol36',                100,  120,  2, 4],
  ['symbol37',                100,  120,  2, 4],
  ['symbol38',                100,  120,  2, 4],
  ['symbol39',                100,  120,  2, 4],
  ['symbol40',                100,  120,  2, 4],
  ['symbol41',                100,  120,  2, 4],
  ['symbol41-1',              100,  120,  2, 4],
  ['symbol42',                100,  120,  2, 4],
  ['symbol43',                100,  120,  2, 4],
  ['symbol44',                100,  120,  2, 4],
  ['symbol45',                100,  120,  2, 4],
  ['symbol46',                100,  120,  2, 4],
  ['symbol47',                100,  120,  2, 4],
  ['symbol48',                100,  120,  2, 4],
  ['symbol49',                100,  120,  2, 4],
  ['symbol50',                100,  120,  2, 4],
  ['symbol51',                100,  120,  2, 4],
  ['symbol52',                100,  120,  2, 4],
  ['symbol53',                100,  120,  2, 4],
  ['symbol54',                100,  120,  2, 4],
  ['symbol55',                100,  120,  2, 4],
  ['symbol56',                100,  120,  2, 4],
  ['symbol57',                100,  120,  2, 4],
  ['symbol58',                100,  120,  2, 4],
  ['symbol59',                100,  120,  2, 4],
  ['symbol60',                100,  120,  2, 4],
  ['symbol60-1',              100,  120,  2, 4],
  ['symbol61',                100,  120,  2, 4],
  ['symbol62',                100,  120,  2, 4],
  ['symbol63',                100,  120,  2, 4],
  ['symbol64',                100,  120,  2, 4],
  ['symbol65',                100,  120,  2, 4],
  ['symbol66',                100,  120,  2, 4],
  ['symbol67',                100,  120,  2, 4],
  ['symbol68',                100,  120,  2, 4],
  ['symbol69',                100,  120,  2, 4],
  ['symbol70',                100,  120,  2, 4],
  ['symbol71',                100,  120,  2, 4],
  ['symbol72',                100,  120,  2, 4],
  ['symbol73',                100,  120,  2, 4],
  ['symbol74',                100,  120,  2, 4],
  ['symbol75',                100,  120,  2, 4],
  ['symbol76',                100,  120,  2, 4],
  ['symbol77',                100,  120,  2, 4],
  ['symbol78',                100,  120,  2, 4],
  ['symbol79',                100,  120,  2, 4],
  ['symbol80',                100,  120,  2, 4],
  ['symbol81',                100,  120,  2, 4],
  ['symbol82',                100,  120,  2, 4],
  ['symbol83',                100,  120,  2, 4],
  ['symbol84',                100,  120,  2, 4],
  ['symbol85',                100,  120,  2, 4],
  ['symbol86',                100,  120,  2, 4],
  ['symbol87',                100,  120,  2, 4],
  ['symbol88',                100,  120,  2, 4],
  ['symbol89',                100,  120,  2, 4],
  ['symbol90',                100,  120,  2, 4],
  ['symbol91',                100,  120,  2, 4],
  ['symbol92',                100,  120,  2, 4],
  ['symbol93',                100,  120,  2, 4],
  ['symbol94',                100,  120,  2, 4],
  ['symbol95',                100,  120,  2, 4],
  ['symbol96',                100,  120,  2, 4],
  ['symbol97',                100,  120,  2, 4],
  ['symbol98',                100,  120,  2, 4],
  ['symbol99',                100,  120,  2, 4],
  ['vertical_line1',          550,  570,  2, 4],
  ['vertical_line2',          550,  570,  2, 4],
  ['vertical_line3',          550,  570,  2, 4],
  ['vertical_line4',          550,  570,  2, 4],
  ['vertical_line5',          550,  570,  2, 4],
  ['vertical_line6',          550,  570,  2, 4],
  ['vertical_line7',          550,  570,  2, 4],
  ['vertical_line8',          550,  570,  2, 4],
  ['vertical_line9',          550,  570,  2, 4],
  ['vertical_line10',         550,  570,  2, 4],
  ['vertical_line11',         550,  570,  2, 4],
  ['vertical_line12',         550,  570,  2, 4],
  ['vertical_line15',         550,  570,  2, 4],
  ['vertical_line16',         550,  570,  2, 4],
  ['vertical_line17',         550,  570,  2, 4],
  ['vertical_line18',         550,  570,  2, 4],
  ['vertical_line20',         550,  570,  2, 4],
  ['vertical_line22',         550,  570,  2, 4],
  ['vertical_line23',         550,  570,  2, 4],
  ['vertical_line24',         550,  570,  2, 4],
  ['vertical_line25',         550,  570,  2, 4],
  ['vertical_line26',         550,  570,  2, 4],
  ['vertical_line27',         550,  570,  2, 4],
  ['vertical_line28',         550,  570,  2, 4],
  ['vertical_line29',         550,  570,  2, 4],
  ['horisontal_line1',        100,  120,  2, 4],
  ['horisontal_line2',        100,  120,  2, 4],
  ['horisontal_line3',        100,  120,  2, 4],
  ['horisontal_line4',        100,  120,  2, 4],
  ['horisontal_line5',        100,  120,  2, 4],
  ['horisontal_line6',        100,  120,  2, 4],
  ['horisontal_line7',        100,  120,  2, 4],
  ['horisontal_line8',        100,  120,  2, 4],
  ['horisontal_line9',        100,  120,  2, 4],
  ['horisontal_line10',       100,  120,  2, 4],
  ['horisontal_line11',       100,  120,  2, 4],
  ['horisontal_line12',       100,  120,  2, 4],
  ['horisontal_line13',       100,  120,  2, 4],
  ['horisontal_line14',       100,  120,  2, 4],
  ['horisontal_line15',       100,  120,  2, 4],
  ['horisontal_line16',       100,  120,  2, 4],
  ['horisontal_line17',       100,  120,  2, 4],
  ['horisontal_line18',       100,  120,  2, 4],
  ['horisontal_line19',       100,  120,  2, 4],
]

function createGlyph() {
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
}

function createPaper(container) {
  /* paper.parent('prototype_85') */
  const paper = document.createElement('div')
  paper.classList.add('paper')

  container.appendChild(paper)
  createGlyphs(paper)
}

function createGlyphs(paper) {
  const particlesQuantity = Math.floor(getRandomArbitrary(10, 20))

  for (var i = 0; i < particlesQuantity; i++) {
    paper.appendChild(createGlyph(paper))
  }
}

function renderUI() {
  const wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')

  const resetButton = document.createElement('div')
  resetButton.classList.add('resetButton')
  resetButton.innerText = 'Generate conlang writing system'
  resetButton.href = 'http://localhost:3000/prototypes/96'

  resetButton.addEventListener('click', () => {
    window.location.reload()
  })

  const saveButton = document.createElement('div')
  saveButton.classList.add('saveButton')
  saveButton.innerText = 'Save'

  saveButton.addEventListener('click', () => {
    generateImage().then(downloadImage)
  })

  wrapper.appendChild(resetButton)
  wrapper.appendChild(saveButton)
  document.body.appendChild(wrapper)
}

function generateImage() {
  return new Promise((resolve, reject) => {
    const container = document.getElementById('prototype_96')

    html2canvas(container).then((canvas) => {
      canvas.style.position = 'absolute'
      canvas.style.left = '-99999px'
      document.body.appendChild(canvas)

      resolve()
    })
  })
}

function downloadImage() {
  const canvas = document.getElementsByTagName('canvas')[0]
  const imageData = canvas.toDataURL('image/png')

  const link = document.createElement('a')
  link.download = `Prototype-96-${generateHash()}.png`
  link.href = imageData
  link.click()
  link.remove()

  canvas.remove()
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_96')
  const paperQuantity = Math.floor(getRandomArbitrary(1, 28))

  for (var i = 0; i < paperQuantity; i++) {
    createPaper(container)
  }
  renderUI()
})
