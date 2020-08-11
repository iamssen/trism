import { LiteralUnion, PackageJson } from 'type-fest';

export interface PackageConfig {
  /**
   * version
   *
   * @example 0.1.0
   * @example 1.0.0-alpha.1
   */
  version: string;

  /**
   * tag (`next` of `npm install react@next` when you install a package)
   *
   * @default latest
   */
  tag?: LiteralUnion<'latest' | 'canary' | 'next', string>; // ?= latest

  /**
   * module type
   *
   * you can choose the one between `commonjs` and `esm`.
   *
   * if the package will build via webpack, it is better to choose `esm`.
   *
   * because the webpack will import only used sources by the tree shaking if the package is `esm` package.
   * it will reduce the webpack's output size to an impressive.
   *
   * but, `esm` package will not work except webpack and node 14.
   * (I know there are other ways, but for the basics)
   *
   * so, if the package is not a web component it is better to choose `commonjs`.
   * it will work everywhere.
   *
   * @default commonjs
   */
  module?: 'commonjs' | 'esm'; // ?= commonjs

  /**
   * compilerOptions of tsconfig.json
   *
   * but, this value will be used the lowest priority.
   *
   * some property can be ignored.
   */
  compilerOptions?: object; // ?= {}

  /**
   * package.json
   *
   * but, this value will be used the lowest priority.
   *
   * some property can be ignored.
   */
  packageJson?: PackageJson; // ?= {}
}

export interface PackageInfo {
  name: string;
  version: string;
  tag: string;
  module: 'commonjs' | 'esm';
  compilerOptions: object;
  packageJson: object;
}

export interface PublishOption {
  name: string;
  tag: string;
  current: PackageJson;
  remote: PackageJson | undefined;
}

export { PackageJson };
