import { defineConfig, presetWind3, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetWind3({
      dark: 'media',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        serif: 'Inter',
      },
    }),
  ],
});
