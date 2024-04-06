module.exports = {
  rules: {
    'empty-line-after-imports': {
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
    },
    'group-imports-on-top': {
      meta: {
        type: 'layout',
        fixable: 'code',
      },
      create(context) {
        let lastImportNode = null;

        return {
          ImportDeclaration(node) {
            if (lastImportNode && node.loc.start.line - lastImportNode.loc.end.line !== 1) {
              context.report({
                node,
                message: 'All imports should be grouped at the top of the file on a new line each',
                fix(fixer) {
                  const importText = context.sourceCode.getText(node);

                  return [fixer.remove(node), fixer.insertTextAfter(lastImportNode, `\n${importText}`)];
                },
              });
            }

            lastImportNode = node;
          },
        };
      },
    },
  },
};
