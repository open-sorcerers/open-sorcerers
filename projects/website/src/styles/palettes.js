import { mix, darken } from 'polished'
import {
  futurePink,
  royalPurp,
  c204,
  chiquita,
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
  name: 'gray mustard spill',
  primary: resilientGray,
  secondary: chemicalSpill,
  tertiary: mutedMustard,
  quaternary: c29x3
}

const BONE_MUSCLE_CHEMICALS = {
  name: 'bone muscle chemicals',
  primary: muscle,
  secondary: bone,
  tertiary: chemicalSpill,
  quaternary: resilientGray
}
const ARMY_BONE = {
  name: 'army bone',
  secondary: futurePink,
  primary: armyGreen,
  quaternary: royalPurp,
  tertiary: chiquita
}
const BW = {
  name: 'b&w',
  primary: '#ddd',
  secondary: '#222',
  tertiary: '#f60',
  quaternary: '#444'
}
export const PALETTES = [
  WINTER_HIMBEER,
  BW,
  ARMY_BONE,
  ORIGINAL_PALETTE,
  MUSTARD_SPILL,
  BONE_MUSCLE_CHEMICALS
]
export default PALETTES
