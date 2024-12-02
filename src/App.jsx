import React, { useRef, useState, useEffect } from "react";
import BottomSheet from "./components/BottomSheet";
import TopSheet from "./components/TopSheet";
import "./App.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useSound from "use-sound";
import { ReactComponent as Question } from "./assets/question.svg";
import { ReactComponent as OnHeart } from "./assets/onHeart.svg";
import { ReactComponent as OffHeart } from "./assets/offHeart.svg";
import { ReactComponent as Arrow } from "./assets/→.svg";
import { ReactComponent as Speaker } from "./assets/speaker.svg";
import { ReactComponent as BGMSpeaker } from "./assets/bgmSpeaker.svg";

const App = () => {
  const circleCount = 600; // 원 개수
  const soundFiles = Array.from({ length: 14 }, (_, i) => `sound${i + 1}.mp3`);
  const imageFiles = Array.from({ length: 14 }, (_, i) => `image${i + 1}.svg`);
  const bgmFiles = ["bgm1.m4a", "bgm2.m4a"];
  const circlesRef = useRef(
    Array.from({ length: circleCount }).map((_, i) => ({
      id: i,
      state: false,
      left: Math.random() * (1366 * 2),
      top: Math.random() * (1024 * 2),
      image: `/images/${imageFiles[i % imageFiles.length]}`,
      sound: `/sounds/${soundFiles[i % soundFiles.length]}`,
      // audio: null,
    }))
  );
  const circles = circlesRef.current;
  const [selected, setSelected] = useState([]);
  const handleCircleClick = (id) => {
    if (showMessage) {
      // 시작단계에서는 클릭 안되게
      return;
    }
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
      id: i,
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
  const [playBGM] = useSound("/sounds/bgm0.m4a", { loop: true }); // BGM 소리 설정
  const transformComponentRef = useRef(null);
  const handleInteraction = (e) => {
    e.preventDefault(); // 클릭 외 다른 이벤트 차단
    setShowMessage(false); // 메시지 숨기기
    playBGM();
    if (transformComponentRef.current) {
      const delay = 300;
      setTimeout(() => {
        transformComponentRef.current.zoomOut(0.5, 750, "easeOut");
      }, delay);
    }
  };

  const handleReset = () => {
    window.location.reload(); // 페이지 새로고침
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
  const handleCollect = () => {
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

  const [isHovered, setIsHovered] = useState(false);
  const [isBGMHovered, setIsBGMHovered] = useState(false);

  return (
    <div className="App" ref={scrollRef}>
      <TopSheet open={topOpen}>
        <div style={{ height: "100vh" }}>
          <div className="topsheetText01">
            소리 정리하기 — 사랑으로
            <div className="topsheetText02">
              <br /> 엉킨 전선을 정리하듯 엉켜 떠다니는 ‘소리’도 정리할 수 있을까. <br /> 소리는
              언제나 세상에 부유하고 있고, 이 공간은 그러한 세상과도 같은 공간입니다.
              <br /> 다만, 이 공간은 사랑에서 비롯된 소리로 이루어진 세상입니다. 사랑이라는 <br />{" "}
              카테고리 아래 수집된 것들의 집합으로, 수많은 사랑의 메시지가 조각이 되어
              <br /> 부유하고 있습니다. 당신은 이 공간에서 부유하는 조각들을 찬찬히 듣고 보며
              <br /> 사랑을 모을 수 있습니다. 당신이 생각하는 사랑에 가깝다면 멈추고 <br />{" "}
              선택하고, 수집해 주세요. 부유하던 조각들은 당신을 통해 나열되고 정리되어
              <br /> 당신만의 사랑의 소리로 생성됩니다. <br /> <br /> 이곳에서 당신이 생각하는
              사랑의 소리를 찾아 오랫동안 헤매어주세요.
            </div>
          </div>
        </div>
      </TopSheet>
      <BottomSheet open={bottomOpen} collect={collect}>
        <div>
          <div className="bottomSheetPart01" />
          <div className="bottomSheetPart02" />
        </div>
        <div
          ref={contentRef}
          className="bottomSheetContent"
          style={{
            top: collect ? "290px" : "0px",
            height: "calc(100vh - 40px)",
            overflowY: collect ? "scroll" : "hidden",
            overflowX: "hidden",
            transition: "top 0.6s ease",
          }}
        >
          {selected.length > 0
            ? selected
                .slice()
                .reverse()
                .map((s, index, array) => (
                  <div
                    className="bottomsheetBox"
                    key={index}
                    style={{
                      height: collect ? "max-content" : "210px",
                      paddingBottom:
                        collect && index === array.length - 1 ? "40px" : collect ? "24px" : "40px",
                    }}
                  >
                    <div className="bottomsheetText">
                      <IconWithSound selected={s} setIsHovered={setIsHovered} />
                      <div className="bottomsheetNumber">{s.id}</div>
                    </div>
                    <img className="bottomsheetImage" src={s.image} alt={`Selected ${s.id}`} />
                  </div>
                ))
            : ""}
        </div>
      </BottomSheet>
      {/* 메시지 화면 */}
      {showMessage && (
        <div className="startMessage">
          <div className="startMessageBox">
            <div className="startMessageText">
              이곳에서 당신이 생각하는 사랑의 소리를 찾아 오랫동안 헤매어주세요.
            </div>
            <div className="startMessageIcon" onClick={handleInteraction}>
              <Arrow width="16px" height="12px" />
            </div>
          </div>
        </div>
      )}
      <div
        className="titleBox"
        style={{ top: collect ? "-100vh" : "40px", transition: "top 0.5s ease" }}
      >
        <div className="title" onClick={handleReset}>
          Organizing the Sound — with Love
        </div>
        <div className="subtitle">
          Pause and collect sounds that you feel are the sounds of love.
        </div>
      </div>
      <div
        className="collected"
        onClick={handleCollect}
        style={{
          bottom: bottomOpen ? "40px" : "-340px",
          transition: "bottom 0.5s ease",
        }}
      >
        Collected
      </div>
      <div className="about" onClick={handleAbout}>
        {isHovered ? <Speaker /> : isBGMHovered ? <BGMSpeaker /> : <Question />}
      </div>
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={2.2}
        minScale={0.5}
        maxScale={4.5}
        initialPositionX={-2732 / 2} // 초기 위치를 중앙으로 설정
        initialPositionY={-2048 / 2} // 초기 위치를 중앙으로 설정
        // doubleClick={{ disabled: true }} // 더블 클릭 확대 비활성화
        // wheel={{ disabled: false, step: 50 }} // 스크롤 줌 속도 조절
        // panning={{ lockAxisX: false, lockAxisY: false }} // 드래그 방향 제한
        // alignmentAnimation={{
        //   duration: 200, // 드래그 종료 후 복귀 애니메이션 속도
        //   sizeX: 100,
        //   sizeY: 100,
        // }}
      >
        {({ zoomOut, ...rest }) => (
          <TransformComponent>
            <div className="container">
              {/* SVG 컨테이너 */}
              <svg
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: "none",
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
                        x1={circle.left + 5}
                        y1={circle.top + 5}
                        x2={nextCircle.left + 5}
                        y2={nextCircle.top + 5}
                        stroke="black"
                        strokeWidth="1.3"
                      />
                    );
                  })}
              </svg>
              {circles.map((circle) => (
                <Circle
                  key={circle.id}
                  circle={circle}
                  handleCircleClick={handleCircleClick}
                  setIsHovered={setIsHovered}
                />
              ))}
              {hearts.map((heart) => (
                <Heart
                  key={heart.id}
                  heart={heart}
                  handleHeartClick={handleHeartClick}
                  setIsBGMHovered={setIsBGMHovered}
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
const Circle = ({ circle, handleCircleClick, setIsHovered }) => {
  const [play, { stop }] = useSound(circle.sound, { interrupt: true, loop: true });

  const handleMouseEnter = () => {
    play(); // 소리 재생
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    stop(); // 소리 정지
    setIsHovered(false);
  };

  return (
    <div
      className="circle"
      style={{
        position: "absolute",
        left: `${circle.left}px`,
        top: `${circle.top}px`,
      }}
      onClick={() => {
        handleCircleClick(circle.id);
      }} // 클릭 시 상태 변경
      onMouseEnter={handleMouseEnter} // 마우스 올릴 때 소리 재생
      onMouseLeave={handleMouseLeave} // 마우스 나갈 때 소리 정지
    >
      <div className="circle2" style={{ backgroundColor: circle.state ? "black" : "#e9e9e9" }} />
    </div>
  );
};

// Heart 컴포넌트
const Heart = ({ heart, handleHeartClick, setIsBGMHovered }) => {
  const [play, { stop }] = useSound(heart.sound, { interrupt: true, loop: true });

  const handleMouseEnter = () => {
    play();
    setIsBGMHovered(true);
  };

  const handleMouseLeave = () => {
    if (!heart.state) {
      stop();
    }
    setIsBGMHovered(false);
  };

  return (
    <div
      className="heart"
      style={{
        position: "absolute",
        left: `${heart.left}px`,
        top: `${heart.top}px`,
      }}
      onClick={() => {
        handleHeartClick(heart.id);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {heart.state ? <OnHeart className="heart2" /> : <OffHeart className="heart2" />}
    </div>
  );
};

// IconSound 컴포넌트
const IconWithSound = ({ selected, setIsHovered }) => {
  const [play, { stop }] = useSound(selected.sound, { interrupt: true, loop: true });
  const handleMouseEnter = () => {
    play();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    stop();
    setIsHovered(false);
  };

  return (
    <div
      className="bottomsheetIcon"
      onMouseEnter={handleMouseEnter} // 마우스 올릴 때 재생
      onMouseLeave={handleMouseLeave} // 마우스 나갈 때 정지
    />
  );
};

export default App;
