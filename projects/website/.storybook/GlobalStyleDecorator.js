import React from 'react'

import { Theme } from '@domain/Theme'

export const GlobalStyleDecorator = storyFn => <Theme>{storyFn()}</Theme>
