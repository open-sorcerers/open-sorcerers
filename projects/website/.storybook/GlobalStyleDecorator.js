import React from 'react'

import { Theme } from '../src/components/Theme'

export const GlobalStyleDecorator = storyFn => <Theme>{storyFn()}</Theme>
