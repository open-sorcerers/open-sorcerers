import React, { useState } from 'react'
import { css } from '@emotion/core'
import { pipe, pathOr, map } from 'ramda'
import { Heading, Button, Box, Flex } from 'rebass'
import { Textarea, Label, Input, Radio, Checkbox } from '@rebass/forms'

const FIELDS = Object.freeze({
  title: 'title',
  contentType: 'contentType',

  news: 'news',
  module: 'module',
  link: 'link',
  isOSS: 'is-oss',
  isFP: 'is-fp',
  isJS: 'is-js',
  content: 'content'
})
const TYPES = Object.freeze({
  NEWS: 'News',
  MODULE: 'Module',
  LINK: 'Link'
})
const { NEWS, MODULE, LINK } = TYPES
const handleSubmit = e => {
  e.preventDefault()
  const out = map(
    pipe(
      field => pathOr(undefined, ['target', field, 'value'], e),
      v => (v === 'on' ? true : v === 'off' ? false : v)
    ),
    FIELDS
  )
  // eslint-disable-next-line
  console.log(out, '<<<')
}

export const SubmitNews = () => {
  const [type, setType] = useState(NEWS)
  return (
    <Box as="form" onSubmit={handleSubmit} py={3}>
      <Flex mx={-2} mb={3}>
        <Box width={1}>
          <Heading s={2} mb={1}>
            Submit News
          </Heading>
          <Label
            css={css`
              visibility: hidden;
              display: none;
            `}
            htmlFor="title"
          >
            Title
          </Label>
          <Input id="title" name="title" defaultValue="I love JavaScript!" />
        </Box>
      </Flex>
      <Flex mx={-2} my={1} flexWrap="wrap">
        <Box width={1}>
          <strong>Type</strong>
        </Box>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Radio
            id={FIELDS.news}
            name={FIELDS.contentType}
            value={FIELDS.news}
            defaultChecked
            onChange={() => setType(NEWS)}
          />
          {FIELDS.news}
        </Label>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Radio
            id={FIELDS.module}
            name={FIELDS.contentType}
            value={FIELDS.module}
            onChange={() => setType(MODULE)}
          />
          {FIELDS.module}
        </Label>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Radio
            id={FIELDS.link}
            name={FIELDS.contentType}
            value={FIELDS.link}
            onChange={() => setType(LINK)}
          />
          {FIELDS.link}
        </Label>
      </Flex>
      <Flex mx={-2} my={1} flexWrap="wrap">
        <Box width={[1]}>
          <strong>Relates to:</strong>
        </Box>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Checkbox id="is-oss" name="is-oss" />
          Open-source
        </Label>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Checkbox id="is-fp" name="is-fp" />
          Functional Programming
        </Label>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Checkbox id="is-js" name="is-js" />
          JavaScript
        </Label>
      </Flex>
      <Flex mx={-2} flexDirection="column">
        <Label p={2} htmlFor="content">
          {type === NEWS ? 'News' : type === MODULE ? 'Module' : 'Link'}
        </Label>
        {type === NEWS ? (
          <Textarea id="content" defaultValue="Item of interest!" />
        ) : (
          <Input id="content" defaultValue="//item.of.interest.org" />
        )}
        <Box px={2} m="1rem auto">
          <Button>Send</Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default SubmitNews
