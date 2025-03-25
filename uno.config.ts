import { defineConfig, presetWind3, presetAttributify, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetWind3({
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
