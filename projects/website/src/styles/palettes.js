import { mix, darken } from 'polished'
import {
  c204,
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
  primary: bone,
  secondary: muscle,
  tertiary: resilientGray,
  quaternary: chemicalSpill
}
export const PALETTES = [WINTER_HIMBEER, ORIGINAL_PALETTE, MUSTARD_SPILL, BONE_MUSCLE_CHEMICALS]
export default PALETTES
