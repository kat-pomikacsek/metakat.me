module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      orange: {
        DEFAULT: '#FF6D12'
      },
      white: {
        DEFAULT: '#ffffff'
      },
      petrol: {
        light: '#ECF7F8',
        lightest: '#ECF7F8',
        DEFAULT: '#ADDFE2',
        dark: '#1C959C',
        gray: '#FBFBFB'
      },
      sky: {
        light: '#DCEFF8',
        lightest: '#F5FAFD',
        DEFAULT: '#C7E3F0',
        dark: '#23789F',
        gray: '#FBFBFB'
      },
      mango: {
        light: '#FFFAE9',
        lightest: '#FFFAE9',
        DEFAULT: '#FFEAB6',
        dark: '#D69A00',
        gray: '#FBFBFB'
      },
      peach: {
        light: '#FFD3B8',
        lightest: '#FFF0E8',
        DEFAULT: '#FFC09C',
        dark: '#FF5C00',
        gray: '#FBFBFB'
      },
      gray: {
        DEFAULT: '#FBFBFB',
        dark: '#333333',
        light: '#FBFBFB',
        lightest: '#FBFBFB'
      }
    },    
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif']
    },
    extend: {
      maxWidth: {
        'section': '720px',
        'header': '820px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  purge: process.env.ELEVENTY_ENV === 'production' ? {
    enabled: true,
    content: ['src/**/*.njk', 'src/**/*.js'],
  } : {}
}
