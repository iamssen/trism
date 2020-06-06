import { glob } from '@ssen/promised';
import { requireTypescript } from '@ssen/require-typescript';
import fs from 'fs-extra';
import path from 'path';
import { PackageJson } from 'type-fest';
import { packageJsonFactoryFileName, sharedPackageJsonFileName } from '../rule/fileNames';
import { PackageInfo, PackageJsonFactoryFunction } from '../types';

interface Params {
  cwd: string;
  packageInfo: PackageInfo;
  imports: PackageJson.Dependency;
}

export async function computePackageJson({ cwd, packageInfo, imports }: Params): Promise<PackageJson> {
  const sharedConfigFile: string = path.join(cwd, sharedPackageJsonFileName);
  const indexFiles: string[] = await glob(`${cwd}/src/${packageInfo.name}/index.{ts,tsx}`);

  const sharedConfig: PackageJson = fs.existsSync(sharedConfigFile) ? fs.readJsonSync(sharedConfigFile) : {};
  const main: object = indexFiles.length > 0 ? { main: 'index.js', typings: 'index.d.ts' } : {};

  Object.keys(sharedConfig).forEach((key) => {
    const value: unknown = sharedConfig[key];
    if (typeof value === 'string') {
      sharedConfig[key] = value.replace(/({name})/g, packageInfo.name).replace(/({version})/g, packageInfo.version);
    }
  });

  const computedConfig: PackageJson = {
    ...sharedConfig,

    name: packageInfo.name,
    version: packageInfo.version,
    dependencies: imports,

    ...main,
  };

  const factoryFile: string = path.join(cwd, 'src', packageInfo.name, packageJsonFactoryFileName);

  return fs.existsSync(factoryFile)
    ? requireTypescript<{ default: PackageJsonFactoryFunction }>(factoryFile).default(computedConfig)
    : computedConfig;
}