module.exports = {
  meta: {
    type: 'layout',
    fixable: 'code',
  },
  create(context) {
    const globalImportPrefix = context.options[0] || '@/';

    const isRelativeUp = (value) => value.startsWith('./');
    const isRelativeDown = (value) => value.startsWith('../');
    const isGlobal = (value) => value.startsWith(globalImportPrefix);
    const getImportGroup = (value) => (isRelativeUp(value) ? 4 : isRelativeDown(value) ? 3 : isGlobal(value) ? 2 : 1);

    const sortImports = (imports) => {
      const result = [[], [], [], []];

      imports.forEach((node) => result[getImportGroup(node.source.value) - 1].push(node));

      return result.flat();
    };
    const getFix = (imports) => (fixer) => {
      const sortedImports = sortImports(imports);
      const sortedImportsText = sortedImports.map((node) => context.sourceCode.getText(node)).join('\n');

      return [...imports.map((node) => fixer.remove(node)), fixer.insertTextAfterRange([0, 0], sortedImportsText)];
    };
    const report = (nodes, index) =>
      context.report({
        node: nodes[index],
        message: 'Incorrect import order',
        fix: getFix(nodes),
      });

    return {
      Program(program) {
        const imports = program.body.filter(({ type }) => type === 'ImportDeclaration');

        let currentGroup = 1;

        for (let i = 0; i < imports.length; i++) {
          const group = getImportGroup(imports[i].source.value);

          if (group > currentGroup) {
            currentGroup = group;
          } else if (group < currentGroup) {
            report(imports, i);
            break;
          }
        }
      },
    };
  },
};
