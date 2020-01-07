import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'
/* import { diffTrimmedLines } from 'diff' */
/* import diff from 'deep-diff' */
import grossdiff from 'prettydiff'
import { identity as I, addIndex, once, curry, pipe, map } from 'ramda'
import prettier from 'prettier/standalone'
import parsers from 'prettier/parser-babylon'
import {
  NoChange,
  Edited,
  Gutter,
  Old,
  New,
  StyledDiffLine,
  StyledFrame,
  StyledDiff,
  Frames
} from './styled'

const diff = once(() => {
  const D = grossdiff
  D.options.diff_format = 'json'
  D.options.jsscope = 'none'
  D.options.mode = 'diff'
  return (a, b) => {
    D.options.source = b
    D.options.diff = a
    const { diff: compared } = JSON.parse(D())
    return compared
  }
})()

const prettierConfig = {
  parser: 'babel',
  plugins: [parsers],
  printWidth: 50,
  tabWidth: 2,
  semi: false,
  useTabs: false,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid'
}

const prettify = curry((handleError, xx) => {
  try {
    return typeof xx === 'string' ? prettier.format(xx, prettierConfig) : xx
  } catch (e) {
    handleError(e)
    return xx
  }
})
export const Frame = ({ handleError, variant, content }) => (
  <StyledFrame variant={variant}>
    <pre>
      <code>{prettify(handleError)(content)}</code>
    </pre>
  </StyledFrame>
)
Frame.propTypes = {
  content: PropTypes.string,
  handleError: PropTypes.func,
  variant: PropTypes.string
}

const DiffLine = ({ kind, line, index }) => {
  const LineKind = kind === '-' ? New : kind === '+' ? Old : kind === 'r' ? Edited : NoChange
  return (
    <StyledDiffLine {...{ kind }}>
      <Gutter>{index}</Gutter>
      <LineKind>{line}</LineKind>
    </StyledDiffLine>
  )
}
DiffLine.propTypes = {
  kind: PropTypes.string,
  line: PropTypes.string,
  index: PropTypes.number
}

const compare = handleError => (aa, bb) => {
  /* const splitter = splittify(handleError) */
  const splitter = prettify(handleError)
  return pipe(
    splitter,
    x => diff(splitter(aa), x),
    diffies =>
      diffies && (
        <>
          {addIndex(map)(
            ([kind, line], index) =>
              line !== '' &&
              kind !== '=' && (
                <DiffLine
                  {...{ kind, line: line.replace(/&gt;/g, '>').replace(/&lt;/g, '<'), index }}
                />
              ),
            diffies
          )}
        </>
      )
  )(bb)
}

export const DiffError = ({ error, before, after, handleError, setBefore, setAfter }) =>
  error && error.message ? (
    <Box>
      <pre>{error.message}</pre>
      <button
        onClick={() => {
          const nice = prettify(handleError)
          try {
            const [$before, $after] = map(nice)([before, after])
            setBefore($before)
            setAfter($after)
            handleError(false)
          } catch (e) {
            handleError(e)
          }
        }}
      >
        Try again
      </button>
    </Box>
  ) : null

DiffError.propTypes = {
  error: PropTypes.object,
  before: PropTypes.string,
  after: PropTypes.after,
  handleError: PropTypes.func,
  setBefore: PropTypes.func,
  setAfter: PropTypes.func
}
DiffError.defaultProps = { handleError: I, setBefore: I, setAfter: I }

export const Diff = ({ content }) => {
  const [$error, handleError] = useState(false)
  const [before, after] = map(prettify(handleError))(content)
  const [$before, setBefore] = useState(before)
  const [$after, setAfter] = useState(after)
  return (
    <StyledDiff>
      <DiffError
        {...{ error: $error, before: $before, after: $after, handleError, setBefore, setAfter }}
      />
      <Frames>
        <textarea key="before" value={$before} onChange={e => setBefore(e.target.value)} />
        <textarea key="after" value={$after} onChange={e => setAfter(e.target.value)} />
      </Frames>
      <Frames>
        {!$error ? (
          <Frame
            handleError={handleError}
            key="comparison"
            variant="full"
            content={compare(handleError)($before, $after)}
          />
        ) : (
          <span>Unable to render</span>
        )}
      </Frames>
    </StyledDiff>
  )
}
Diff.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string)
}

export default Diff
