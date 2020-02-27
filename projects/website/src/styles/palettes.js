import { mix, darken } from 'polished'
import {
  foundation,
  techForest,
  neonPurp,
  c2ax3,
  sickLizard,
  cyan,
  c2ex3,
  futurePink,
  magicMagenta,
  royalPurp,
  c204,
  c3dx3,
  seriousBlue,
  aliceblue,
  hotpink,
  darkGray,
  berlinWinter,
  laserPink,
  hotMustard,
  armyGreen,
  resilientGray,
  chemicalSpill,
  mutedMustard,
  c29x3,
  bone,
  muscle
} from '@styles/colors'

const evenMix = mix(1 / 2)
const ORIGINAL_PALETTE = {
  name: 'original',
  primary: aliceblue,
  secondary: c204,
  tertiary: hotpink,
  quaternary: darkGray
}
const WINTER_HIMBEER = {
  name: 'winter himbeer',
  primary: berlinWinter,
  secondary: darken(3 / 10, laserPink), // composedBlue, // armyGreen,
  tertiary: evenMix(hotMustard, armyGreen),
  quaternary: '#1b202b' // winterMud
}

const REPTILE = {
  name: 'Reptile',
  primary: sickLizard,
  secondary: resilientGray,
  tertiary: chemicalSpill,
  quaternary: c29x3
}

const SINEW = {
  name: 'sinew',
  primary: bone,
  secondary: muscle,
  tertiary: `#208e8e`,
  quaternary: c2ex3
}
const ARMY_BONE = {
  name: 'pink army',
  primary: futurePink,
  secondary: armyGreen,
  tertiary: magicMagenta,
  quaternary: c3dx3
}
const yarp = {
  name: 'mascara',
  primary: futurePink,
  secondary: c3dx3,
  tertiary: '#998a4b',
  quaternary: c2ex3
}
const BW = {
  name: 'Giants',
  primary: '#ddd',
  secondary: '#222',
  tertiary: '#f60',
  quaternary: '#444'
}
const CREAMSICLE = {
  name: 'Creamsicle',
  primary: '#f60',
  secondary: '#ddd',
  tertiary: '#0e2f40', // '#222',
  quaternary: '#080108' // '#8a1b40'
}

const LAKERS = {
  name: 'Lakers',
  primary: '#f60',
  secondary: '#ddd',
  tertiary: '#1a3940',
  quaternary: '#5e3275'
}
export const PALETTES = [
  WINTER_HIMBEER,
  REPTILE,
  CREAMSICLE,
  {
    name: 'peach buzz',
    secondary: foundation,
    primary: techForest,
    quaternary: '#112337', // '#623030', // '#452c62',
    tertiary: c2ax3
  },
  yarp
]
export default PALETTES
