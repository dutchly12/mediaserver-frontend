import { defineConfig, presetMini, presetAttributify, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetMini({
      dark: 'media',
    }),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        serif: 'Inter',
      },
    }),
  ],
});
