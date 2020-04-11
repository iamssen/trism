export const initialTsconfig: object = {
  compilerOptions: {
    downlevelIteration: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,

    alwaysStrict: true,
    strictNullChecks: true,
    strictBindCallApply: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: true,
    resolveJsonModule: true,

    module: 'commonjs',
    target: 'esnext',
    moduleResolution: 'node',
    skipLibCheck: true,
    sourceMap: true,
    declaration: true,

    baseUrl: 'src',
    paths: {
      '*': ['*'],
    },
  },
};