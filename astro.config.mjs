import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Site',
      description: 'A minimal blog and documentation site',
      customCss: ['./src/styles/site.css'],
      sidebar: [
        {
          label: 'Documentation',
          autogenerate: { directory: 'docs' },
        },
      ],
      social: {},
      components: {
        Head: './src/components/overrides/Head.astro',
        SocialIcons: './src/components/overrides/SocialIcons.astro',
        ThemeSelect: './src/components/overrides/ThemeSelect.astro',
      },
    }),
  ],
});
