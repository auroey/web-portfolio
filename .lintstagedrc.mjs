/** @type {import('lint-staged').Configuration} */
export default {
  '*.{cjs,js,jsx,ts,tsx}': (filenames) => {
    const filtered = filenames.filter((file) => !file.includes('api/'));
    return filtered.length > 0
      ? [
          `eslint --cache --fix --max-warnings 0 ${filtered.join(' ')}`,
          `prettier --cache --write ${filtered.join(' ')}`,
        ]
      : [];
  },
  '*.scss': [
    'stylelint --cache --fix --max-warnings 0',
    'prettier --cache --write',
  ],
  '*.{html,json,md,yml}': 'prettier --cache --write',
};
