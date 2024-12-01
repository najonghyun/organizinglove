import React, { useRef, useState, useEffect } from "react";
import BottomSheet from "./components/BottomSheet";
import TopSheet from "./components/TopSheet";
import "./App.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useSound from "use-sound";
import { ReactComponent as Heart } from "./assets/heart.svg";

const App = () => {
  const circleCount = 600; // 원 개수
  const soundFiles = ["sound1.m4a", "sound2.m4a", "sound3.m4a"];
  const imageFiles = ["image1.png", "image2.png"];
  const circlesRef = useRef(
    Array.from({ length: circleCount }).map((_, i) => ({
      id: i,
      state: false,
      left: Math.random() * (1366 * 2),
      top: Math.random() * (1024 * 2),
      image: `/images/${imageFiles[i % imageFiles.length]}`,
      sound: `/sounds/${soundFiles[i % soundFiles.length]}`,
      audio: null,
    }))
  );
  const circles = circlesRef.current;
  const handleCircleClick = (id) => {
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

  const [showMessage, setShowMessage] = useState(true); // 메시지 표시 여부
  const handleInteraction = (e) => {
    e.preventDefault(); // 클릭 외 다른 이벤트 차단
    setShowMessage(false); // 메시지 숨기기
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

  const [selected, setSelected] = useState([]);
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
    setTopOpen(!topOpen);
  };

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
        <div
          className="collected"
          onClick={handleCollect}
          style={{
            top: collect ? "290px" : "190px",
            transition: "top 0.5s ease",
          }}
        >
          Collected
        </div>
        <div>
          <div className="bottomSheetPart01" />
          <div className="bottomSheetPart02" />
        </div>
        <div
          ref={contentRef}
          className="bottomSheetContent"
          style={{
            top: collect ? "250px" : "0px",
            height: "100vh",
            overflowY: collect ? "scroll" : "hidden",
            overflowX: "hidden",
            transition: "top 0.6s ease",
          }}
        >
          {selected.length > 0
            ? selected
                .slice()
                .reverse()
                .map((s, index) => (
                  <div
                    className="bottomsheetBox"
                    key={index}
                    style={{
                      height: collect ? "max-content" : "210px",
                      paddingBottom: collect ? "24px" : "40px",
                    }}
                  >
                    <div className="bottomsheetText">
                      <div className="bottomsheetIcon" />
                      <div>{s.id}</div>
                    </div>
                    <img className="bottomsheetImage" src={s.image} alt={`Selected ${s.id}`} />
                  </div>
                ))
            : ""}
        </div>
      </BottomSheet>
      {/* 메시지 화면 */}
      {showMessage && (
        <div
          className="startMessage"
          onClick={handleInteraction} // 클릭 시 메시지 숨기기
        >
          <div>
            <div className="startMessageText">
              이곳에서 당신이 생각하는 사랑의 소리를 찾아 오랫동안 헤매어주세요.
            </div>
            <div className="startMessageIcon">→</div>
          </div>
        </div>
      )}
      <div
        className="title"
        style={{ top: collect ? "-100vh" : "40px", transition: "top 0.5s ease" }}
      >
        Organizing the Sound — with Love
        <div className="subtitle">
          Pause and collect sounds that you feel are the sounds of love.
        </div>
      </div>
      <div className="about" onClick={handleAbout}>
        <Heart />
      </div>
      <TransformWrapper
        initialScale={2.2}
        minScale={0.5}
        maxScale={4.5}
        initialPositionX={-(2732 - 1366) / 2} // 초기 위치를 중앙으로 설정
        initialPositionY={-(2048 - 1024) / 2} // 초기 위치를 중앙으로 설정
        // doubleClick={{ disabled: true }} // 더블 클릭 확대 비활성화
        // wheel={{ disabled: false, step: 50 }} // 스크롤 줌 속도 조절
        // panning={{ lockAxisX: false, lockAxisY: false }} // 드래그 방향 제한
        // alignmentAnimation={{
        //   duration: 200, // 드래그 종료 후 복귀 애니메이션 속도
        //   sizeX: 100,
        //   sizeY: 100,
        // }}
      >
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
              <Circle key={circle.id} circle={circle} handleCircleClick={handleCircleClick} />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

// Circle 컴포넌트
const Circle = ({ circle, handleCircleClick }) => {
  const [play, { stop }] = useSound(circle.sound, { interrupt: true });

  const handleMouseEnter = () => {
    play(); // 소리 재생
  };

  const handleMouseLeave = () => {
    stop(); // 소리 정지
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

export default App;
