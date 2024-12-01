// import { useSpring, animated } from "react-spring";
import "./BottomSheet.css";

const BottomSheet = ({ children, open, collect }) => {
  // const animation = useSpring({
  //   transform: open
  //     ? collect
  //       ? "translateY(0%)" // 최상단 위치 (완전히 펼침)
  //       : "translateY(250px)" // 250px만큼 화면 위로 올라감
  //     : "translateY(100%)", // 완전히 숨김
  // });
  return (
    <>
      {/* {open && <div className="overlay" onClick={handleBottomSheetChange} />} */}
      <div className={`bottomsheetContainer ${open ? (collect ? "open" : "mid") : ""}`}>
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
