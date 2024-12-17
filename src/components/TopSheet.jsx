// import { useSpring, animated } from "react-spring";
import './TopSheet.css';

const TopSheet = ({ children, open, topRef }) => {
  // const animation = useSpring({
  //   transform: open ? "translateY(0)" : "translateY(-100%)",
  // });
  return (
    <>
      <div className={`topsheetContainer ${open ? 'open' : ''}`} ref={topRef}>
        {children}
      </div>
      {/* {open && <div className="overlay" onClick={handleBottomSheetChange} />} */}
    </>
  );
};

export default TopSheet;
