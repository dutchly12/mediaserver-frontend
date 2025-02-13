import { defineConfig, presetUno } from 'unocss';
import presetWebFonts from '@unocss/preset-web-fonts';

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        serif: 'Inter',
      },
    }),
  ],
});
