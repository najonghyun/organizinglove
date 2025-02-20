import './Bottomsheet.css';
import useSound from 'use-sound';

const Bottomsheet = ({ open, contentRef, collect, selected, setHoverState }) => {
  return (
    <div className={`bottomsheet-container ${open ? (collect ? 'open' : 'mid') : ''}`}>
      <div>
        <div className='bottomsheet-background-01' />
        <div className='bottomsheet-background-02' />
      </div>
      <div
        ref={contentRef}
        className='bottomsheet-content'
        style={{
          top: collect ? '250px' : '0px',
          height: 'calc(100vh - 95px)',
          overflowY: collect ? 'scroll' : 'hidden',
          overflowX: 'hidden',
          transition: 'top 0.6s ease',
        }}
      >
        {selected.length > 0
          ? selected
              .slice()
              .reverse()
              .map((s, index, array) => (
                <div
                  className='bottomsheet-content-box'
                  key={index}
                  style={{
                    height: !collect && index === 0 ? '210px' : 'max-content',
                    paddingTop: collect
                      ? index === 0
                        ? '40px'
                        : '0px'
                      : index !== 0
                      ? '40px'
                      : '0px',
                    paddingBottom:
                      collect && index === array.length - 1 ? '0px' : collect ? '24px' : '0px',
                  }}
                >
                  <div className='bottomsheet-content-box-text'>
                    <IconWithSound selected={s} setHoverState={setHoverState} />
                    <div className='bottomsheet-content-box-number'>{s.id}</div>
                  </div>
                  <img
                    className='bottomsheet-content-box-image'
                    src={s.image}
                    alt={`Selected ${s.id}`}
                  />
                </div>
              ))
          : ''}
      </div>
    </div>
  );
};

export default Bottomsheet;

// hover시 sound가 들리는 IconWithSound 컴포넌트
const IconWithSound = ({ selected, setHoverState }) => {
  const [play, { stop }] = useSound(selected.sound, { interrupt: true, loop: true });
  const handleMouseEnter = () => {
    if (selected.sound) {
      play();
    }
    setHoverState({
      isHovered: true,
      hasSound: selected.sound !== null,
    });
  };

  const handleMouseLeave = () => {
    if (selected.sound) {
      stop();
    }
    setHoverState({
      isHovered: false,
      hasSound: false,
    });
  };

  return (
    <div
      className='bottomsheet-content-box-icon'
      onMouseEnter={handleMouseEnter} // 마우스 올릴 때 재생
      onMouseLeave={handleMouseLeave} // 마우스 나갈 때 정지
    />
  );
};
