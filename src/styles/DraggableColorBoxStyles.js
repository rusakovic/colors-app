import sizes from './sizes';
import chroma from 'chroma-js';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4.5px',
    overflow: 'hidden',
    
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%',
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%',
    marginBottom: '-5.5px',

    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '5px',
    paddingLeft: '10px',
    color: props => chroma(props.color).luminance() >= 0.5 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',

    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteIcon: {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      color: 'white',
      transform: 'scale(1.5)',
    }
  }
};

export default styles;