import { useStaticQuery, graphql } from 'gatsby'

export const getMDXWithSummary = () => {
  /* eslint-disable-next-line no-unused-vars */
  const nodes = graphql`
    fragment LookupMDX on MdxConnection {
      nodes {
        body
        frontmatter {
          author
          path
          title
          keywords
          glossary
          private
          draft
          reviewer
          link
          excerpt
          dateEdited
          datePublished
        }
        id
        wordCount {
          paragraphs
        }
        fileAbsolutePath
        tableOfContents
        excerpt(pruneLength: 420)
      }
    }
  `
  return useStaticQuery(graphql`
    query getMDXWithSummary {
      posts: allMdx(
        filter: {
          frontmatter: { keywords: { nin: ["module", "review"] } }
          fileAbsolutePath: { regex: "/posts/" }
        }
      ) {
        ...LookupMDX
      }
      modules: allMdx(filter: { fileAbsolutePath: { regex: "/modules/" } }) {
        ...LookupMDX
      }
      reviews: allMdx(filter: { fileAbsolutePath: { regex: "/reviews/" } }) {
        ...LookupMDX
      }
      glossary: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/glossary/" }
          frontmatter: { path: { nin: "/glossary" } }
        }
      ) {
        ...LookupMDX
      }
      currentBuildDate {
        currentDate
      }
    }
  `)
}
