import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import useSound from 'use-sound';
import startBGM from './assets/sounds/bgm0.mp3';

import Topsheet from './components/sheet/Topsheet';
import Bottomsheet from './components/sheet/Bottomsheet';
import Circle from './components/items/Circle';
import Heart from './components/items/Heart';
import Organized from './components/menu/Organized';
import About from './components/menu/About';
import Plays from './components/items/Plays';
import StartMessage from './components/etc/StartMessage';
import ZoomWrapper from './components/zoom/ZoomWrapper';
import { refreshPage, useRefreshTimer } from './utils/refresh';
import { useClickOutside } from './utils/clickOutside';

const App = () => {
  const circleCount = 600; // 원 개수
  const imageFiles = Array.from({ length: 112 }, (_, i) => `image${i + 1}.svg`); // 이미지 개수
  const soundFiles = Array.from({ length: 74 }, (_, i) => `sound${i + 1}.mp3`); // 사운드 개수
  const bgmFiles = Array.from({ length: 5 }, (_, i) => `bgm${i + 1}.mp3`);

  // ----- circle 에셋 관련 변수 관리 -----
  const circlesRef = useRef(
    Array.from({ length: circleCount }).map((_, i) => {
      const localIndex = i % 112;
      return {
        id: i + 1,
        state: false,
        left: Math.random() * (1366 * 2),
        top: Math.random() * (1024 * 2),
        image: require(`./assets/images/${imageFiles[localIndex]}`),
        sound: localIndex < 74 ? require(`./assets/sounds/${soundFiles[localIndex]}`) : null,
      };
    })
  );
  const circles = circlesRef.current;
  const [selected, setSelected] = useState([]);
  const handleCircleClick = (id) => {
    if (showMessage) return;

    circles.forEach((circle) => {
      if (circle.id === id) {
        circle.state = !circle.state; // 원 색상 반전
        // 선택되지 않았을 때: BottomSheet open 및 선택된 에셋 selected 배열에 추가
        if (!selected.some((item) => item.id === id)) {
          if (selected.length === 0) setBottomOpen(true);
          setSelected([...selected, circle]);
          // 이미 선택되어 있을 때: BottomSheet closed 및 선택된 에셋 selected 배열에서 제거
        } else {
          if (selected.length < 2) setBottomOpen(false);
          setSelected(selected.filter((item) => item.id !== id));
        }
      }
    });
  };

  // ----- heart(bgm) 에셋 관련 변수 관리 -----
  const heartsRef = useRef(
    Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      state: false,
      left: Math.random() * (1366 * 2),
      top: Math.random() * (1024 * 2),
      sound: require(`./assets/sounds/${bgmFiles[i % bgmFiles.length]}`),
    }))
  );
  const hearts = heartsRef.current;
  const [heartSelected, setHeartSelected] = useState([]);
  const handleHeartClick = (id) => {
    if (showMessage) return;

    hearts.forEach((heart) => {
      if (heart.id === id) {
        heart.state = !heart.state; // 하트 색상 반전
        if (!heartSelected.some((item) => item.id === id)) {
          setHeartSelected([...heartSelected, heart]);
        } else {
          setHeartSelected(heartSelected.filter((item) => item.id !== id));
        }
      }
    });
  };

  // ----- StartMessage 온보딩 페이지 관련 변수 관리 -----
  const [showMessage, setShowMessage] = useState(true); // 시작 온보딩
  const [isReady, setIsReady] = useState(false);
  const [playBGM] = useSound(startBGM, {
    loop: true,
    html5: true,
    onload: () => {
      // console.log('오디오 준비 완료');
      setIsReady(true);
    },
  });

  const zoomContainerRef = useRef(null); // ZoomWrapper container 제어
  const handleStartMessage = (e) => {
    e.preventDefault();
    if (!isReady) {
      console.log('not Ready!');
      return;
    }
    setShowMessage(false); // 시작 온보딩 숨기기
    playBGM(); // bgm 스타트
    // 메인 페이지 로드될 때 살짝 줌아웃 효과를 적용
    if (zoomContainerRef.current) {
      const delay = 300;
      setTimeout(() => {
        zoomContainerRef.current.zoomOut(0.5, 750, 'easeOut');
      }, delay);
    }
  };

  // ----- 초기 scroll 가운데 위치 -----
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

  // ----- Bottomsheet 컴포넌트 제어 -----
  const [bottomOpen, setBottomOpen] = useState(false);
  const [collect, setCollect] = useState(false);

  const contentRef = useRef(null);
  const handleOrganized = () => {
    setCollect(!collect);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0; // 스크롤 초기화
    }
  };

  // ----- Topsheet 컴포넌트 제어 -----
  const topRef = useRef(null);
  const [topOpen, setTopOpen] = useState(false);
  const handleAbout = (e) => {
    e.stopPropagation();
    if (showMessage || topOpen) {
      return;
    }
    setTopOpen(true);
  };
  useClickOutside(topOpen, setTopOpen, topRef, 'about'); // 외부 클릭 시 topsheet 닫힘

  // 현재 hover된 데이터
  const [hoverState, setHoverState] = useState({
    isHovered: false,
    hasSound: false,
  });
  const [isBGMHovered, setIsBGMHovered] = useState(false);

  useRefreshTimer(10); // 화면 refresh 타이머 (10분)

  return (
    <div className='App' ref={scrollRef}>
      <Topsheet open={topOpen} containerRef={topRef} />
      <Bottomsheet
        open={bottomOpen}
        contentRef={contentRef}
        collect={collect}
        selected={selected}
        setHoverState={setHoverState}
      />
      {/* StartMessage 화면 (온보딩 페이지) */}
      <StartMessage show={showMessage} isReady={isReady} handleStartMessage={handleStartMessage} />
      <div
        className='titleBox'
        style={{ top: collect ? '-100vh' : '40px', transition: 'top 0.5s ease' }}
      >
        <div className='title' onClick={refreshPage}>
          Organizing the Sound — with Love
        </div>
        <div className='subtitle'>
          Pause and collect sounds that you feel are the sounds of love.
        </div>
      </div>

      <Organized
        open={bottomOpen}
        handleOrganized={handleOrganized}
        collect={collect}
        selected={selected}
      />
      <Plays collect={collect} selected={selected} />
      <About
        open={topOpen}
        handleAbout={handleAbout}
        isBGMHovered={isBGMHovered}
        hoverState={hoverState}
      />
      <ZoomWrapper containerRef={zoomContainerRef}>
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
      </ZoomWrapper>
    </div>
  );
};

export default App;
