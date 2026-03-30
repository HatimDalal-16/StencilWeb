import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import tailwindcss from '@tailwindcss/postcss';

export const config: Config = {
  namespace: 'buttondesignsystem',
  globalStyle: 'src/global/app.css',
  plugins: [
    postcss({
      plugins: [tailwindcss()]
    })
  ],

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
