/*

Open Sorcerers Design System

*Basic normalization and globals in `@domain/Site`*

# Named Page Areas

A. NAVIGATION - top menu
   A1. Brand
   A2. Nav
   A3. Settings Button
B. CONTENT - the main stuff
C. FOOTER - the bottom stuff
D. MENU - The Menu (activated by clicking A3)

# Named Routes


* SETTINGS = '/settings'
* PROFILE = '/settings/profile'
* LOGIN = '/settings/login'
* LOGOUT = '/settings/logout'
* BOOKMARKS = '/settings/bookmarks'
* LEARN = '/learn'
* BUILD = '/build'
* BUILD_EXAMPLE = '/build/an-example'
* ASK = '/ask'
* REPL = '/repl'

*/
// read !cat src/constants/routes.js |
/* eslint-disable-next-line max-len */
// snang -P "split(C.n) | filter(I) | map(split(' ')) | map(slice(2, Infinity)) | map(join(' ')) | join(C.n + '* ') | z => '* ' + z"

export const Z_INDEX = Object.freeze({
  GUIDE: 25,
  MENU_OVER: 22,
  MENU: 20,
  MENU_UNDER: 18,
  INTERACTIVE: 5,
  CONTENT: 2,
  DEFAULT: 1
})

export const VIEW_STATES = Object.freeze({
  DEFAULT: 'view:default',
  MENU_ACTIVE: 'view:menu-active'
})
