import { mix, darken } from 'polished'
import {
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

const MUSTARD_SPILL = {
  name: 'Reptile',
  primary: sickLizard,
  secondary: resilientGray,
  tertiary: chemicalSpill,
  quaternary: c29x3
}

const BONE_MUSCLE_CHEMICALS = {
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
  tertiary: '#222',
  quaternary: '#392516'
}
export const PALETTES = [
  WINTER_HIMBEER,
  BW,
  ARMY_BONE,
  ORIGINAL_PALETTE,
  MUSTARD_SPILL,
  CREAMSICLE,
  BONE_MUSCLE_CHEMICALS
]
export default PALETTES
