import { memoizeWith, identity as I, map } from 'ramda'
import { lighten as ll, mix as mm } from 'polished'
import { colorable } from '@styles/utils'
import { hotMustard, $, cyan, lime, offBlack, debug, transparent } from '@styles/colors'

const lighten = memoizeWith(I, ll)
const mix = memoizeWith(I, mm)

export const cs = memoizeWith(I, (primary, secondary, tertiary, quaternary) =>
  Object.freeze(
    map(colorable)({
      picker: [$, 'rgba(0,0,0,0.2)'],
      nav: [secondary, primary],
      navInactive: [primary],
      menu: [$, quaternary],
      menuProfile: [$, tertiary],
      h3d: [lighten(1 / 12, primary), $],
      h3dShadow: [tertiary, mix(6 / 10, secondary, '#000')],
      footer: [primary, quaternary],
      footerHiddenDate: [hotMustard],
      footerHiddenEnv: [cyan],
      footerHiddenBrain: ['magenta', 'yellow'],
      badge: [tertiary, mix(1 / 2, tertiary, secondary)],
      post: [secondary, primary],
      postAltVariant: [
        `linear-gradient(0.25turn, ${secondary}, ${mix(1 / 2, secondary, cyan)})`,
        `linear-gradient(0.25turn, ${secondary}, ${mix(1 / 2, secondary, lime)})`
      ],
      postFooter: [primary, secondary],
      breakpoint: [offBlack, debug],
      contributor: [mix(1 / 2, tertiary, secondary), '#3c053a'],
      contributorImg: [tertiary, secondary],
      pkg: [mix(1 / 2, hotMustard, secondary), mix(1 / 5, secondary, quaternary)],
      profile: [$, primary],
      profileImg: [$, secondary],
      colophon: [primary, quaternary],
      colophonAlt: [primary, transparent],
      colophonOverTablet: [primary, mix(3 / 10, secondary, quaternary)],
      comingSoon: [mix(1 / 2, primary, secondary)]
    })
  )
)
export default cs
