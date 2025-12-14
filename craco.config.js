module.exports = {
  style: {
    postcss: {
      mode: 'override',
      plugins: [
        require('@tailwindcss/postcss'),
      ],
    },
  },
};