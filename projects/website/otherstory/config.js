import { addParameters, configure } from '@storybook/react';
import campfire from './campfire-theme';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    theme: campfire,
  },
});

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /stories\.js$/);
function loadStories() {
  req.keys().forEach(req);
}
global.__PATH_PREFIX__ = '';
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

configure(loadStories, module);
