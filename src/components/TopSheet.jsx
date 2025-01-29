import './Topsheet.css';

const Topsheet = ({ open, containerRef }) => {
  return (
    <div className={`topsheet-container ${open ? 'open' : ''}`} ref={containerRef}>
      <div style={{ height: '100vh' }}>
        <div className='topsheet-text-title'>
          소리 정리하기 — 사랑으로
          <div className='topsheet-text-content'>
            <br /> 엉킨 전선을 정리하듯 엉켜 떠다니는 ‘소리’도 정리할 수 있을까. <br /> 소리는
            언제나 세상에 부유하고 있고, 이 공간은 사랑에서 비롯된 소리로
            <br /> 이루어진 세상입니다. 사랑이라는 카테고리 아래 수집된 것들의 집합으로, <br />{' '}
            수많은 사랑의 메시지가 조각이 되어 부유하고 있습니다.
            <br /> 당신은 부유하는 조각들을 찬찬히 듣고 보며 사랑을 모을 수 있습니다.
            <br /> 당신이 생각하는 사랑에 가깝다면 멈추어 선택하고, 수집해 주세요. <br /> 부유하던
            조각들은 당신을 통해 나열되고 정리되어
            <br /> 당신만의 사랑의 소리로 생성됩니다. <br /> <br /> 이곳에서 당신이 생각하는 사랑의
            소리를 찾아 오랫동안 헤매어주세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topsheet;
