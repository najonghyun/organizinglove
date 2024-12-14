import React, { useRef, useState, useEffect } from 'react';
import BottomSheet from './components/BottomSheet';
import TopSheet from './components/TopSheet';
import './App.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useSound from 'use-sound';
import { ReactComponent as Question } from './assets/question.svg';
import { ReactComponent as OnHeart } from './assets/onHeart.svg';
import { ReactComponent as OffHeart } from './assets/offHeart.svg';
import { ReactComponent as ArrowRight } from './assets/arrowRight.svg';
import { ReactComponent as Speaker } from './assets/speaker.svg';
import { ReactComponent as BGMSpeaker } from './assets/bgmSpeaker.svg';
import { ReactComponent as Play } from './assets/play.svg';
import { ReactComponent as Pause } from './assets/pause.svg';
import { ReactComponent as ArrowDown } from './assets/arrowDown.svg';
import { ReactComponent as ArrowTop } from './assets/arrowTop.svg';
import Loading from './components/Loading';

const App = () => {
  const refreshPage = () => {
    window.location.reload();
  };
  const circleCount = 600; // 원 개수
  const imageFiles = Array.from({ length: 54 }, (_, i) => `image${i + 1}.svg`);
  const soundFiles = Array.from({ length: 31 }, (_, i) => `sound${i + 1}.mp3`);
  const bgmFiles = Array.from({ length: 5 }, (_, i) => `bgm${i + 1}.mp3`);
  const circlesRef = useRef(
    Array.from({ length: circleCount }).map((_, i) => {
      const localIndex = i % 54;
      return {
        id: i + 1,
        state: false,
        left: Math.random() * (1366 * 2),
        top: Math.random() * (1024 * 2),
        image: `/images/${imageFiles[localIndex]}`,
        sound: localIndex < 31 ? `/sounds/${soundFiles[localIndex]}` : null,
        // audio: null,
      };
    })
  );
  const circles = circlesRef.current;
  const [selected, setSelected] = useState([]);
  const handleCircleClick = (id) => {
    if (showMessage) return;

    circles.forEach((circle) => {
      if (circle.id === id) {
        circle.state = !circle.state; // 클릭 상태 반전
      }
    });

    if (!selected.some((item) => item.id === id)) {
      // 선택된 동그라미가 없다면 추가
      setSelected([...selected, circles.find((circle) => circle.id === id)]);
      if (selected.length === 0) {
        setBottomOpen(true);
      }
    } else {
      // 이미 선택된 동그라미라면 제거
      setSelected(selected.filter((item) => item.id !== id));
      if (selected.length < 2) {
        setBottomOpen(false);
      }
    }
  };

  const heartsRef = useRef(
    Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      state: false,
      left: Math.random() * (1366 * 2),
      top: Math.random() * (1024 * 2),
      sound: `/sounds/${bgmFiles[i % bgmFiles.length]}`,
    }))
  );
  const hearts = heartsRef.current;
  const [heartSelected, setHeartSelected] = useState([]);
  const handleHeartClick = (id) => {
    if (showMessage) {
      return;
    }
    hearts.forEach((heart) => {
      if (heart.id === id) {
        heart.state = !heart.state;
      }
    });
    if (!heartSelected.some((item) => item.id === id)) {
      setHeartSelected([...heartSelected, hearts.find((heart) => heart.id === id)]);
    } else {
      setHeartSelected(heartSelected.filter((item) => item.id !== id));
    }
  };

  const [showMessage, setShowMessage] = useState(true); // 메시지 표시 여부
  const [isReady, setIsReady] = useState(false);
  const [playBGM] = useSound('/sounds/bgm0.mp3', {
    loop: true,
    html5: true,
    onload: () => {
      console.log('오디오 준비 완료');
      setIsReady(true);
    },
  });
  // const playBGM = new Howl({
  //   src: ['/sounds/bgm0.mp3'],
  //   loop: true,
  //   html5: true,
  // });
  // playBGM.once('load', () => {
  //   console.log('오디오 준비 완료');
  //   setIsReady(true);
  // });

  const transformComponentRef = useRef(null);
  const handleInteraction = (e) => {
    e.preventDefault(); // 클릭 외 다른 이벤트 차단
    if (!isReady) {
      console.log('아직 안됐다 임마!');
      return;
    }
    setShowMessage(false); // 메시지 숨기기
    playBGM();
    if (transformComponentRef.current) {
      const delay = 300;
      setTimeout(() => {
        transformComponentRef.current.zoomOut(0.5, 750, 'easeOut');
      }, delay);
    }
  };

  const handleReset = () => {
    refreshPage();
  };

  const scrollRef = useRef(null);
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const centerX = (1366 * 2 - scrollElement.clientWidth) / 2;
    const centerY = (1024 * 2 - scrollElement.clientHeight) / 2;

    scrollElement.scrollTo({
      left: centerX,
      top: centerY,
    });
  }, []);

  const [bottomOpen, setBottomOpen] = useState(false);
  const [collect, setCollect] = useState(false);
  const [topOpen, setTopOpen] = useState(false);

  const contentRef = useRef(null);
  const handleOrganized = () => {
    setCollect(!collect);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0; // 스크롤 초기화
    }
  };

  const handleAbout = () => {
    if (showMessage) {
      return;
    }
    setTopOpen(!topOpen);
  };

  const [hoverState, setHoverState] = useState({
    isHovered: false,
    hasSound: false,
  });
  const [isBGMHovered, setIsBGMHovered] = useState(false);

  // 10분 타이머 설정
  useEffect(() => {
    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('Refreshing the page...');
        refreshPage();
      }, 300000); // 1분 = 60,000ms
    };
    resetTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <div className='App' ref={scrollRef}>
      <TopSheet open={topOpen}>
        <div style={{ height: '100vh' }}>
          <div className='topsheetText01'>
            소리 정리하기 — 사랑으로
            <div className='topsheetText02'>
              <br /> 엉킨 전선을 정리하듯 엉켜 떠다니는 ‘소리’도 정리할 수 있을까. <br /> 소리는
              언제나 세상에 부유하고 있고, 이 공간은 그러한 세상과도 같은 공간입니다.
              <br /> 다만, 이 공간은 사랑에서 비롯된 소리로 이루어진 세상입니다. 사랑이라는 <br />{' '}
              카테고리 아래 수집된 것들의 집합으로, 수많은 사랑의 메시지가 조각이 되어
              <br /> 부유하고 있습니다. 당신은 이 공간에서 부유하는 조각들을 찬찬히 듣고 보며
              <br /> 사랑을 모을 수 있습니다. 당신이 생각하는 사랑에 가깝다면 멈추고 <br />{' '}
              선택하고, 수집해 주세요. 부유하던 조각들은 당신을 통해 나열되고 정리되어
              <br /> 당신만의 사랑의 소리로 생성됩니다. <br /> <br /> 이곳에서 당신이 생각하는
              사랑의 소리를 찾아 오랫동안 헤매어주세요.
            </div>
          </div>
        </div>
      </TopSheet>
      <BottomSheet open={bottomOpen} collect={collect}>
        <div>
          <div className='bottomSheetPart01' />
          <div className='bottomSheetPart02' />
        </div>
        <div
          ref={contentRef}
          className='bottomSheetContent'
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
                    className='bottomsheetBox'
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
                    <div className='bottomsheetText'>
                      <IconWithSound selected={s} setHoverState={setHoverState} />
                      <div className='bottomsheetNumber'>{s.id}</div>
                    </div>
                    <img className='bottomsheetImage' src={s.image} alt={`Selected ${s.id}`} />
                  </div>
                ))
            : ''}
        </div>
      </BottomSheet>
      {/* 메시지 화면 */}
      {showMessage && (
        <div className='startMessage'>
          <div className='startMessageBox'>
            <div className='startMessageText'>
              이곳에서 당신이 생각하는 사랑의 소리를 찾아 오랫동안 헤매어주세요.
            </div>
            <div className='startMessageIcon' onClick={handleInteraction}>
              {isReady ? <ArrowRight width='16px' height='12px' /> : <Loading />}
            </div>
          </div>
        </div>
      )}
      <div
        className='titleBox'
        style={{ top: collect ? '-100vh' : '40px', transition: 'top 0.5s ease' }}
      >
        <div className='title' onClick={handleReset}>
          Organizing the Sound — with Love
        </div>
        <div className='subtitle'>
          Pause and collect sounds that you feel are the sounds of love.
        </div>
      </div>

      <div
        className='organized'
        onClick={handleOrganized}
        style={{
          bottom: bottomOpen && selected.length > 1 ? '40px' : '-50px',
          transition: 'bottom 0.6s ease',
        }}
      >
        <div className='organizedText'>Organized</div>
        <OrganizedIcon collect={collect} selected={selected} />
      </div>

      <Plays collect={collect} selected={selected} />
      <div className='about' onClick={handleAbout}>
        {hoverState.isHovered && hoverState.hasSound ? (
          <Speaker />
        ) : isBGMHovered ? (
          <BGMSpeaker />
        ) : (
          <AboutIcon about={topOpen} />
        )}
      </div>
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={2.2}
        minScale={0.5}
        maxScale={4.5}
        initialPositionX={-2732 / 2} // 초기 위치를 중앙으로 설정
        initialPositionY={-2048 / 2} // 초기 위치를 중앙으로 설정
        doubleClick={{ disabled: true }} // 더블 클릭 확대 비활성화
        // wheel={{ disabled: false, step: 500 }} // 스크롤 줌 속도 조절
        // alignmentAnimation={{
        //   duration: 200, // 드래그 종료 후 복귀 애니메이션 속도
        //   sizeX: 100,
        //   sizeY: 100,
        // }}
        // animation={{
        //   size: 300,
        //   animationTime: 500,
        //   animationType: "easeInOutQuad",
        // }}
        zoomAnimation={{
          disabled: false,
          size: 500,
          animationTime: 300,
          animationType: 'easeInOutCubic',
        }}
        velocityAnimation={{
          disabled: false,
          sensitivity: 0.1,
          animationTime: 300,
          animationType: 'easeOutQuint',
        }}
      >
        {({ zoomOut, ...rest }) => (
          <TransformComponent>
            <div className='container'>
              {/* SVG 컨테이너 */}
              <svg
                width='100%'
                height='100%'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              >
                {/* 선택된 원을 연결하는 선 */}
                {selected.length > 1 &&
                  selected.map((circle, index) => {
                    if (index === selected.length - 1) return null; // 마지막 원은 다음 원이 없으므로 제외
                    const nextCircle = selected[index + 1];
                    return (
                      <line
                        key={index}
                        x1={circle.left + 6}
                        y1={circle.top + 6}
                        x2={nextCircle.left + 6}
                        y2={nextCircle.top + 6}
                        stroke='black'
                        strokeWidth='1.3'
                      />
                    );
                  })}
              </svg>
              {circles.map((circle) => (
                <Circle
                  key={circle.id}
                  circle={circle}
                  handleCircleClick={handleCircleClick}
                  setHoverState={setHoverState}
                  showMessage={showMessage}
                />
              ))}
              {hearts.map((heart) => (
                <Heart
                  key={heart.id}
                  heart={heart}
                  handleHeartClick={handleHeartClick}
                  setIsBGMHovered={setIsBGMHovered}
                  showMessage={showMessage}
                />
              ))}
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
};

// Circle 컴포넌트
const Circle = ({ circle, handleCircleClick, setHoverState, showMessage }) => {
  const [play, { stop }] = useSound(circle.sound, { interrupt: true, loop: true });
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    if (showMessage) return;
    if (circle.sound) {
      play(); //소리 재생
    } else {
      setHover(true);
    }
    setHoverState({
      isHovered: true,
      hasSound: circle.sound !== null,
    });
  };

  const handleMouseLeave = () => {
    if (showMessage) return;
    if (circle.sound) {
      stop(); // 소리 정지
    }
    setHover(false);
    setHoverState({
      isHovered: false,
      hasSound: false,
    });
  };

  return (
    <div
      className='circleBox'
      style={{
        position: 'absolute',
        left: `${circle.left}px`,
        top: `${circle.top}px`,
      }}
    >
      <div
        className='circle'
        onClick={() => {
          handleCircleClick(circle.id);
        }} // 클릭 시 상태 변경
        onMouseEnter={handleMouseEnter} // 마우스 올릴 때 소리 재생
        onMouseLeave={handleMouseLeave} // 마우스 나갈 때 소리 정지
      >
        <div className='circle2' style={{ backgroundColor: circle.state ? 'black' : '#e9e9e9' }} />
      </div>
      {!circle.sound && hover ? (
        <object className='circleHoverImage' data={circle.image}>
          {' '}
        </object>
      ) : null}
    </div>
  );
};

// Heart 컴포넌트
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
      className='heart'
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
      {heart.state ? <OnHeart className='heart2' /> : <OffHeart className='heart2' />}
    </div>
  );
};

// IconSound 컴포넌트
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
      className='bottomsheetIcon'
      onMouseEnter={handleMouseEnter} // 마우스 올릴 때 재생
      onMouseLeave={handleMouseLeave} // 마우스 나갈 때 정지
    />
  );
};

const SoundPlayer = ({ sound, isPlaying, onEnd, registerStopFn }) => {
  const [play, { stop }] = useSound(sound, {
    onend: onEnd,
  });
  useEffect(() => {
    if (registerStopFn) {
      registerStopFn(stop); // 최신의 stop 함수를 외부로 전달
    }
  }, [stop, registerStopFn]);

  useEffect(() => {
    if (isPlaying) {
      play(); // 사운드 재생
    } else {
      stop(); // 사운드 정지
    }
  }, [isPlaying, play, stop]);

  useEffect(() => {
    if (!isPlaying) {
      stop();
    }
  }, [isPlaying, stop]);

  return null; // 별도의 UI 없이 재생 관리
};

const Plays = ({ collect, selected }) => {
  const [playableSounds, setPlayableSounds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const soundsLengthRef = useRef(0); // 최신 길이 저장
  const stopRefs = useRef({}); // SoundPlayer의 stop 함수를 저장

  useEffect(() => {
    const filteredSounds = selected.filter((item) => item.sound);
    setPlayableSounds(filteredSounds);
    soundsLengthRef.current = filteredSounds.length;
    stopRefs.current = {};
  }, [selected]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < soundsLengthRef.current) {
        return nextIndex; // 다음 트랙으로 이동
      } else {
        setPlaying(false);
        return -1; // 마지막 트랙 이후에는 재생 중지
      }
    });
  };

  // 재생 버튼 클릭 시 실행
  const handlePlay = () => {
    if (playableSounds.length > 0) {
      setCurrentIndex(0); // 첫 번째 트랙부터 재생 시작
      setPlaying(true);
    }
  };

  const handleStop = () => {
    console.log('중지 실행');
    setPlaying(false);
    setCurrentIndex(-1);
    if (currentIndex !== -1 && stopRefs.current[currentIndex]) {
      stopRefs.current[currentIndex](); // stop 함수 직접 호출
    }
  };

  return (
    <>
      {playableSounds.map((item, index) => (
        <SoundPlayer
          key={index}
          sound={item.sound}
          isPlaying={index === currentIndex} // 현재 재생 중인 항목인지 확인
          playing={playing}
          onEnd={handleNext} // 현재 사운드 종료 시 다음으로 이동
          registerStopFn={(stopFn) => (stopRefs.current[index] = stopFn)}
        />
      ))}
      <div
        className='play'
        style={{
          bottom: collect ? '40px' : '-340px',
          transition: 'bottom 0.5s ease',
        }}
        onClick={playing ? handleStop : handlePlay}
      >
        {playing ? <Pause /> : <Play />}
        <div className='playText'>{playing ? 'stop' : 'play'}</div>
      </div>
    </>
  );
};

const OrganizedIcon = ({ collect, selected }) => {
  const [delayed, setDelayed] = useState(null);
  const selectedRef = useRef(selected);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayed(collect ? <ArrowDown /> : selectedRef.current.length);
    }, 500);

    return () => clearTimeout(timeout);
  }, [collect]);

  useEffect(() => {
    selectedRef.current = selected;
    setDelayed(selected.length);
  }, [selected]);

  return <div>{delayed}</div>;
};

const AboutIcon = ({ about }) => {
  const [delayed, setDelayed] = useState(about ? <ArrowTop /> : <Question />);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayed(about ? <ArrowTop /> : <Question />);
    }, 500);

    return () => clearTimeout(timeout);
  }, [about]);

  return <div>{delayed}</div>;
};

export default App;
