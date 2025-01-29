import './About.css';
import { useEffect, useState } from 'react';
import { ReactComponent as Question } from '../assets/question.svg';
import { ReactComponent as Speaker } from '../assets/speaker.svg';
import { ReactComponent as BGMSpeaker } from '../assets/bgmSpeaker.svg';

const About = ({ open, handleAbout, isBGMHovered, hoverState }) => {
  return (
    <div className='about-box' onClick={handleAbout}>
      {hoverState.isHovered && hoverState.hasSound ? (
        <Speaker />
      ) : isBGMHovered ? (
        <BGMSpeaker />
      ) : (
        <AboutIcon open={open} />
      )}
    </div>
  );
};
export default About;

const AboutIcon = ({ open }) => {
  const [delayed, setDelayed] = useState(open ? null : <Question />);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setDelayed(open ? null : <Question />);
      },
      open ? 250 : 500
    );

    return () => clearTimeout(timeout);
  }, [open]);

  return <div>{delayed}</div>;
};
