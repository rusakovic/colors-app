import sizes from './sizes';
import bg from './BG.svg';

export default {
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /* background by SVGBackgrounds.com */
    bbackgroundColor: '#186d8f',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    overflow: 'scroll',
    overflowX: 'hidden',
  },
  heading: {
    fontSize: '2rem',
  },
  container: {
    width: '50%',
    marginBottom: '3rem',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '80%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    },

  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white',
    alignItems: 'center',
    '& a': {
      color: 'white',
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(3, 33.33%)',
    gridGap: "1rem",
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
    },
  }
}