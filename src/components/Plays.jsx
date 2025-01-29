import './Plays.css';
import { useEffect, useState, useRef } from 'react';
import useSound from 'use-sound';
import { ReactComponent as Play } from '../assets/play.svg';
import { ReactComponent as Pause } from '../assets/pause.svg';

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
        className='play-box'
        style={{
          bottom: collect ? '40px' : '-340px',
          transition: 'bottom 0.5s ease',
        }}
        onClick={playing ? handleStop : handlePlay}
      >
        {playing ? <Pause /> : <Play />}
        <div className='play-box-text'>{playing ? 'stop' : 'play'}</div>
      </div>
    </>
  );
};

export default Plays;

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
