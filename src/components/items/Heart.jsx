import './Heart.css';
import useSound from 'use-sound';
import { ReactComponent as OnHeart } from '../../assets/onHeart.svg';
import { ReactComponent as OffHeart } from '../../assets/offHeart.svg';

const Heart = ({ heart, handleHeartClick, setIsBGMHovered, showMessage }) => {
  const [play, { stop }] = useSound(heart.sound, { interrupt: true, loop: true });

  const handleMouseEnter = () => {
    if (showMessage) return;
    play();
    setIsBGMHovered(true);
  };

  const handleMouseLeave = () => {
    if (showMessage) return;
    if (!heart.state) {
      stop();
    }
    setIsBGMHovered(false);
  };

  return (
    <div
      className='heart-box'
      style={{
        position: 'absolute',
        left: `${heart.left}px`,
        top: `${heart.top}px`,
      }}
      onClick={() => {
        handleHeartClick(heart.id);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {heart.state ? (
        <OnHeart className='heart-box-item' />
      ) : (
        <OffHeart className='heart-box-item' />
      )}
    </div>
  );
};

export default Heart;
