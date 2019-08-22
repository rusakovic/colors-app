import sizes from './sizes';
import bg from './BG.svg';

export default {
  //we need to add global to use period styling for React Transition Group
  '@global': {
    '.fade-exit': {
      opacity: 1
    },
    '.fade-exit-active': {
      opacity: 0,
    }
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /* background by SVGBackgrounds.com */
    backgroundColor: '#186d8f',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    overflow: 'scroll',
    overflowX: 'hidden',
  },
  heading: {
    fontSize: '2rem',
  },
  container: {
    width: '40%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '60%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    },

  },
  nav: {
    display: 'flex',
    width: '100%',
    height: '100px',
    justifyContent: 'space-between',
    color: 'white',
    alignItems: 'center',
    '& a': {
      color: 'white',
      fontSize: '1rem'
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