import './StartMessage.css';
import Loading from './Loading';
import { ReactComponent as ArrowRight } from '../../assets/arrowRight.svg';

const StartMessage = ({ show, isReady, handleStartMessage }) => {
  return (
    <>
      {show && (
        <div className='start-message-container'>
          <div className='start-message-box'>
            <div className='start-message-box-text'>
              이곳에서 당신이 생각하는 사랑의 소리를 찾아 오랫동안 헤매어주세요.
            </div>
            <div className='start-message-box-icon' onClick={handleStartMessage}>
              {isReady ? <ArrowRight width='16px' height='12px' /> : <Loading />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartMessage;
