![brainwave](https://open.sorcerers.dev/brainwave-readme.svg)

# brainwave

_Walk the files and control the ones with frontmatter in them_

Let's say you have a bunch of files with `frontmatter` in them. Like [MDX] or similar.
Let's say you have fields in that frontmatter that you wanna be able to query against, or manipulate, but you don't wanna do it by hand.


Use `brainwave`!

## Installation

```sh
yarn global add brainwave
```

## Disclaimer

`brainwave` is a powerful tool which can change tons of files in your codebase. Using `brainwave` in a folder without version control is likely a mistake. Protect yourself. Remember to use the `--dryRun` flag to see _what would have run_ instead. Use `brainwave` at your own risk. Please log any [issues] on Github.

## Usage
1. `cd your-project` 
2. `brainwave --init` - generate a basic `brainwave.config.js` file
3. Open `brainwave.config.js` in your favorite editor and make changes relative to your codebase:

```js
module.exports = {
  // telepathy specifies function predicates to run against the codebase
  telepathy: {
    // this will print out all files which have a "review" key in their frontmatter
    review: z => z && z.review
  },
  // control specifies both predicates and mutations, each a function
  control: {
    edited: [
      // *REMEMBER* to use --dryRun and it will instead tell you what _would_ be modified
      // this runs always!
      () => true,
      // it will add / update dateEdited field in the mdx files
      x => (
        x && x.stats && x.stats.ctime
        ? { dateEdited: new Date(x.stats.ctime) }
        : {}
      )
    ]
  }
}
```

4. Once you've made changes, run `brainwave --telepathy` to see only telepathy calls.
5. Run `brainwave --dryRun` to see what your changes in `control` will do.
6. If you're happy with the changes you're about to make (and you're using version control like a sane person), try running `brainwave` with no `--dryRun` flag, and it will update all `.mdx` and `.md` file in the local folder, excluding `node_modules`.

Built by <img src="https://open.sorcerers.com/open-sorcerers3.svg" alt="Open Sorcerers" style="display: block; margin: 0 auto; max-width: 200px; height: auto;" />

[MDX]: https://mdxjs.com/
[issues]: https://github.com/open-sorcerers/open-sorcerers/issues
