# brainwave
## walk the files and control the ones with frontmatter in them

Let's say you have a bunch of files with `frontmatter` in them. Like [MDX] or similar.
Let's say you have fields in that frontmatter that you wanna be able to query against, or manipulate, but you don't wanna do it by hand.

Use `brainwave`!

```sh
> wave "filter(propEq('title', 'Cool'))" ./src
brainwave found 2 files matching:
filter(propEq('title', 'cool'))
```
