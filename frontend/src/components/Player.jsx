import ReactPlayer from 'react-player';

const Player = ({ url, width, height }) => {
  return (
    <div className='video-player'>
      <ReactPlayer
        url={url}
        width={width || '100%'}
        height={height || '100%'}
        controls={true}
      />
    </div>
  );
};

export default Player;