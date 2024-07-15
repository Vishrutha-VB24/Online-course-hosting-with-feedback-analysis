import ReactPlayer from 'react-player';

const Player = ({ url, width, height }) => {
  return (
      <ReactPlayer
        url={url}
        width={width || '100%'}
        height={height || '100%'}
        controls={true}
        style={{backgroundColor:'#1f2937'}}
      />
  );
};

export default Player;