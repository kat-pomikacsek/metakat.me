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
    backgroundImage: {
      'split-white-petrol': "linear-gradient(to bottom, white 20%, #ADDFE2 20%);",
      // 'split-white-sky': "linear-gradient(to bottom, white 20%, #C7E3F0 20%);",
      'split-white-sky': "linear-gradient(to bottom, white 20%, rgba(255,255,255,0) 20%), radial-gradient(40% 100% at 70% 26.94%, rgba(112, 212, 255, 0.357) 0%, rgba(112, 212, 255, 0.7) 100%);",
      'split-white-mango': "linear-gradient(to bottom, white 20%, #FFEAB6 20%);",
      'split-white-peach': "linear-gradient(to bottom, white 20%, #FFC09C 20%);",
      'split-petrol-white': "linear-gradient(to bottom, #ADDFE2 80%, white 80%);",
      'split-sky-white': "linear-gradient(to bottom, #C7E3F0 80%, white 80%);",
      'split-mango-white': "linear-gradient(to bottom, #FFEAB6 80%, white 80%);",
      'split-mango-white': "linear-gradient(to bottom, #FFC09C 80%, white 80%);"
    },
    fontFamily: {
      sans: ['Overpass', 'sans-serif']
    },
    extend: {
      maxWidth: {
        'section': '720px',
        'header': '820px',
        'overview': '1728px',
        'screen-desktop': '38.5rem', //616px
        'screen-mobile': '9.5rem', //152px
        'screens': '820px'
      },
      maxHeight: {
        'screen-mobile': '36rem',
        'screen-mobile-short': '40rem',
        'screen-mobile-normal': '45rem',
        'screen-mobile-tall': '50rem',

      },
      screens: {
        'sm': '640px',  
        'md': '768px', // 48rem 
        'lg': '1024px', // 64rem
        'xl': '1280px',  
        '2xl': '1728px',
      },
      fontSize: {
        'xl': ['1.25rem', '2rem'],
        '2xl': ['1.563rem', '2rem'],
        '3xl': ['2rem', '2.7rem'],
        '4xl': ['2.5rem', '3.375rem'],
        '6xl': ['3.75rem', '4.5rem'],

      },
      padding: {
        '13': '3.25rem' // 52px
      },
      margin: {
        '13': '3.25rem', // 52px
        '1/10': '10%',
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
