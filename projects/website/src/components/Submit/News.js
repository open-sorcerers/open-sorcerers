import React, { useState } from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { Heading, Button, Box, Flex } from 'rebass'
import { Textarea, Label, Select, Input, Radio, Checkbox } from '@rebass/forms'

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

export const SubmitNews = () => {
  const [type, setType] = useState(NEWS)
  return (
    <Box as="form" onSubmit={e => e.preventDefault()} py={3}>
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
          <Radio id="news" name="type" value="news" defaultChecked onChange={() => setType(NEWS)} />
          news
        </Label>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Radio id="module" name="type" value="module" onChange={() => setType(MODULE)} />
          module
        </Label>
        <Label width={[1 / 1, 1 / 3]} p={2}>
          <Radio id="link" name="type" value="link" onChange={() => setType(LINK)} />
          link
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
