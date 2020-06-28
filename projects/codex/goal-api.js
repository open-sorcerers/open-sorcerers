const codexPage = ({ AST, transform, find, propTypeIs, pipe, filter, is }) =>
  pipe(
    find(is(AST.Function)),
    filter(propTypeIs("parent", AST.VariableDeclarator)),
    transform(AST.callExpression(AST.identifier("Node")))
  )

export default codexPage
