import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ZoomWrapper = ({ children, containerRef }) => {
  return (
    <TransformWrapper
      ref={containerRef}
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
      {({ zoomOut, ...rest }) => <TransformComponent>{children}</TransformComponent>}
    </TransformWrapper>
  );
};

export default ZoomWrapper;
