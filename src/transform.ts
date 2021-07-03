import { API, ASTPath, FileInfo, ImportDeclaration } from 'jscodeshift';

export const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const source = j(fileInfo.source);

  source
    .find(j.ImportSpecifier)
    .filter(
      path =>
        (path.parent as ASTPath<ImportDeclaration>).value.source.value ===
        'react-query'
    )
    .filter(path => path.value.imported.name === 'queryCache')
    .remove();

  source
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value === 'react-query')
    .insertAfter(
      j.importDeclaration(
        [
          j.importSpecifier(
            j.identifier('queryClient'),
            j.identifier('queryCache')
          ),
        ],
        j.literal('common/queryClient')
      )
    );

  // Your transformations go here

  return source.toSource();
};
