/**
 * this env extends lit-env version 8f3b087529ac5a092e53ec04f62011b28e8f0b59.
 * to inspect its config @see https://bit.cloud/teambit/web-components/lit?version=8f3b087529ac5a092e53ec04f62011b28e8f0b59
 * */

import { LitEnv, litWebpackTransformation } from '@teambit/web-components.lit';
import { Compiler } from '@teambit/compiler';
import { ReactPreview } from '@teambit/preview.react-preview';
// import { HtmlPreview } from '@teambit/html.preview.html-preview';
import { EnvHandler } from '@teambit/envs';
import {
  TypescriptCompiler,
  resolveTypes,
  TypescriptTask,
  TypescriptConfigWriter
} from '@teambit/typescript.typescript-compiler';
import { ESLintLinter, EslintTask, EslintConfigWriter } from '@teambit/defender.eslint-linter';
import { JestTester, JestTask } from '@teambit/defender.jest-tester';
import { PrettierFormatter, PrettierConfigWriter } from '@teambit/defender.prettier-formatter';
import { ConfigWriterList } from '@teambit/workspace-config-files';
import { Tester } from '@teambit/tester';
import { Preview } from '@teambit/preview';
import hostDependencies from './preview/host-dependencies';
// import { webpackTransformer } from './config/webpack.config';


export class MyCustomLitEnv extends LitEnv {

  /* a shorthand name for the env */
  name = 'my-custom-lit-env';

  /* the compiler to use during development */
  compiler(): EnvHandler<Compiler> {
    /**
     * @see https://bit.dev/reference/typescript/using-typescript
     * */
    return TypescriptCompiler.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      types: resolveTypes(__dirname, ['./types']),
    });
  }

  /* the test runner to use during development */
  tester(): EnvHandler<Tester> {
    /**
     * @see https://bit.dev/reference/jest/using-jest
     * */
    return JestTester.from({
      config: require.resolve('./config/jest.config'),
    });
  }

  /* the linter to use during development */
  linter() {
    /**
     * @see https://bit.dev/reference/eslint/using-eslint
     * */
    return ESLintLinter.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      configPath: require.resolve('./config/eslintrc.js'),
      pluginsPath: __dirname,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    });
  }

  /**
   * the formatter to use during development
   * (source files are not formatted as part of the components' build)
   * */
  formatter() {
    /**
     * @see https://bit.dev/reference/prettier/using-prettier
     * */
    return PrettierFormatter.from({
      configPath: require.resolve('./config/prettier.config.js'),
    });
  }

  workspaceConfig(): ConfigWriterList {
    return ConfigWriterList.from([
      TypescriptConfigWriter.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        types: resolveTypes(__dirname, ["./types"]),
      }),
      EslintConfigWriter.from({
        configPath: require.resolve('./config/eslintrc.js'),
        tsconfig: require.resolve('./config/tsconfig.json'),
      }),
      PrettierConfigWriter.from({
        configPath: require.resolve('./config/prettier.config.js'),
      })
    ]);
  }

  /**
   * generates the component previews during development and during build
   */
  preview(): EnvHandler<Preview> {
    /**
     * @see https://bit.dev/docs/react-env/component-previews
     */
    return ReactPreview.from({
      docsTemplate: require.resolve('./preview/docs'),
      mounter: require.resolve('./preview/mounter'),
      hostDependencies,
      transformers: [litWebpackTransformation],
    });
  }

  /**
   * a set of processes to be performed before a component is snapped, during its build phase
   * @see https://bit.dev/docs/react-env/build-pipelines
   */
  build() {
    return super.build().replace([
      TypescriptTask.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        types: resolveTypes(__dirname, ['./types']),
      }),
      EslintTask.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        configPath: require.resolve('./config/eslintrc.js'),
        pluginsPath: __dirname,
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      }),
      JestTask.from({
        config: require.resolve('./config/jest.config'),
      }),
    ]);
  }
}

export default new MyCustomLitEnv();
    