module.exports = {
  meta: {
    type: 'layout',
    fixable: 'code',
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const nextToken = context.sourceCode.getTokenAfter(node);

        if (nextToken) {
          const isImportNext = nextToken.type === 'Keyword' && nextToken.value === 'import';

          if (!isImportNext && nextToken.loc.start.line - node.loc.end.line !== 2) {
            context.report({
              node,
              message: '1 empty line after imports is required',
              fix(fixer) {
                return fixer.replaceTextRange([node.range[1], nextToken.range[0]], '\n\n');
              },
            });
          }
        }
      },
    };
  },
};
