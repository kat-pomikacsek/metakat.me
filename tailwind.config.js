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
        dark: '#198B92',
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
        dark: '#D49A01',
        gray: '#FBFBFB'
      },
      peach: {
        light: '#FFD3B8',
        lightest: '#FFF0E8',
        DEFAULT: '#FFC09C',
        dark: '#E05101',
        gray: '#FBFBFB'
      },
      gray: {
        DEFAULT: '#333333',
        dark: '#333333',
        light: '#7C7979',
        lightest: '#FBFBFB'
      }
    },
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif']
    },
    extend: {
      maxWidth: {
        'section': '720px',
        'header': '820px',
        'overview': '976px',
        'screen-mobile': '9.5rem'
      },
      maxHeight: {
        'screen-mobile': '50rem'
      },
      screens: {
        'sm': '640px',  
        'md': '832px', // 52rem 
        'lg': '976px', // 61rem
        'xl': '1280px',  
        '2xl': '1536px',
      },
      fontSize: {
        '3xl': ['2rem', '2.5rem']
      },
      padding: {
        '13': '3.25rem' // 52px
      },
      margin: {
        '13': '3.25rem' // 52px
      },
      gap: {
        '13': '3.25rem' // 52px
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
