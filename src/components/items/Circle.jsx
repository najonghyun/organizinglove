import './Circle.css';
import { useState } from 'react';
import useSound from 'use-sound';

const Circle = ({ circle, handleCircleClick, setHoverState, showMessage }) => {
  const [play, { stop }] = useSound(circle.sound, { interrupt: true, loop: true });
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    if (showMessage) return;
    if (circle.sound) play(); //소리 재생
    else setHover(true);

    setHoverState({
      isHovered: true,
      hasSound: circle.sound !== null,
    });
  };

  const handleMouseLeave = () => {
    if (showMessage) return;
    if (circle.sound) stop(); // 소리 정지

    setHover(false);
    setHoverState({
      isHovered: false,
      hasSound: false,
    });
  };

  return (
    <div
      className='circle-box'
      style={{
        position: 'absolute',
        left: `${circle.left}px`,
        top: `${circle.top}px`,
      }}
    >
      <div
        className='circle-box-item-01'
        onClick={() => {
          handleCircleClick(circle.id);
        }}
        onMouseEnter={handleMouseEnter} // 마우스 올릴 때 소리 재생
        onMouseLeave={handleMouseLeave} // 마우스 나갈 때 소리 정지
      >
        <div
          className='circle-box-item-02'
          style={{ backgroundColor: circle.state ? 'black' : '#e9e9e9' }}
        />
      </div>
      {!circle.sound && hover ? (
        <object className='circle-box-hoverimage' data={circle.image}>
          {' '}
        </object>
      ) : null}
    </div>
  );
};

export default Circle;
