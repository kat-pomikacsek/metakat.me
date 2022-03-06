module.exports = {
  content: [
    'src/**/*.{njk,js,css}'
  ],
  safelist: [
    {
      pattern: /(text|decoration|bg|border)-(petrol|sky|mango|peach)/,
      variants: ['sm', 'md', 'lg', 'hover']
    },
    {
      pattern: /(text|decoration|bg|border)-(petrol|sky|mango|peach)-(light|lightest|gray|dark|bright)/,
      variants: ['sm', 'md', 'lg', 'hover']
    },
    // theme background gradients
    {
      pattern: /split-white-(petrol|sky|mango|peach)/,
      variants: ['sm', 'md', 'lg', 'hover']
    },
    {
      pattern: /split-(petrol|sky|mango|peach)-white/,
      variants: ['sm', 'md', 'lg', 'hover']
    },
  ]
  ,
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
        bright: '#5BE2EB',
        gray: '#FBFBFB'
      },
      sky: {
        light: '#DCEFF8',
        lightest: '#F5FAFD',
        DEFAULT: '#C7E3F0',
        dark: '#23789F',
        bright: '#60CFFF',
        gray: '#FBFBFB'
      },
      mango: {
        light: '#FFFAE9',
        lightest: '#FFFAE9',
        DEFAULT: '#FFEAB6',
        dark: '#D49A01',
        bright: '#FFD25E',
        gray: '#FBFBFB'
      },
      peach: {
        light: '#FFD3B8',
        lightest: '#FFF0E8',
        DEFAULT: '#FFC09C',
        dark: '#E05101',
        bright: '#FFA775',
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
      sans: ['Overpass', 'sans-serif']
    },
    extend: {
      maxWidth: {
        'section': '720px',
        'header': '820px',
        'overview': '1536px',
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
        'md': '832px', // 52rem 
        'lg': '1024px', // 64rem
        'xl': '1280px',  
        '2xl': '1536px',
      },
      fontSize: {
        'sm': ['0.875rem', '1.3rem'],
        'base': ['1rem', '1.5rem'],
        'xl': ['1.25rem', '1.875rem'],
        '2xl': ['1.5rem', '1.95rem'],
        '3xl': ['2.185rem', '2.615rem'],
        '4xl': ['2.5rem', '2.875rem'],
        '5xl': ['3.125rem', '3.595rem'],
        '6xl': ['3.75rem', '4.125rem'],

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
       },
      backgroundImage: {
        'split-white-petrol': "linear-gradient(to bottom, white 16%, rgba(255,255,255,0) 16%), radial-gradient(60% 97% at 30% 0%, #ADDFE2 0%, #5BE2EB 100%);",
        'split-white-sky': "linear-gradient(to bottom, white 16%, rgba(255,255,255,0) 16%), radial-gradient(60% 97% at 72% 0%, #C7E3F0 0%, #60CFFF 84%);",
        'split-white-mango': "linear-gradient(to bottom, white 16%, rgba(255,255,255,0) 16%), radial-gradient(60% 97% at 72% 0%, #FFEAB6 0%, #FFD25E 100%);",
        'split-white-peach': "linear-gradient(to bottom, white 16%, rgba(255,255,255,0) 16%), radial-gradient(60% 97% at 36% 0%, #FFC09C 0%, #FFA775 100%);",
        'split-petrol-white': "linear-gradient(0deg, #FFFFFF 16%, rgba(255, 255, 255, 0) 16%), radial-gradient(60% 97% at 30% 0%, #ADDFE2 0%, #5BE2EB 100%);",
        'split-sky-white': "radial-gradient(60% 97% at 72% 0%, #C7E3F0 0%, #60CFFF 100%), linear-gradient(to bottom, white 84%, rgba(255,255,255,0) 84%);",
        'split-mango-white': "linear-gradient(to bottom, #FFEAB6 80%, white 80%);",
        'split-mango-white': "linear-gradient(to bottom, #FFC09C 80%, white 80%);"
      },      
    },
  },
  plugins: [],

}
