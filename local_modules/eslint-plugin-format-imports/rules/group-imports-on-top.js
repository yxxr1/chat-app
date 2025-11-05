module.exports = {
  meta: {
    type: 'layout',
    fixable: 'code',
  },
  create(context) {
    const getFix = (imports) => (fixer) => {
      const importsText = imports.map((node) => context.sourceCode.getText(node)).join('\n');

      return [...imports.map((node) => fixer.remove(node)), fixer.insertTextAfterRange([0, 0], importsText)];
    };

    return {
      Program(program) {
        let lastImportIndex = -1;

        for (let i = 0; i < program.body.length; i++) {
          const node = program.body[i];

          if (node.type === 'ImportDeclaration') {
            if (i - lastImportIndex > 1) {
              const imports = program.body.filter(({ type }) => type === 'ImportDeclaration');
              context.report({
                node,
                message: 'All imports should be grouped at the top of the file on a new line each',
                fix: getFix(imports),
              });
              break;
            }

            lastImportIndex = i;
          }
        }
      },
    };
  },
};
