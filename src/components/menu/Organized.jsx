import './Organized.css';
import { useEffect, useState, useRef } from 'react';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrowDown.svg';

const Organized = ({ open, handleOrganized, collect, selected }) => {
  return (
    <div
      className='organized-box'
      onClick={handleOrganized}
      style={{
        bottom: open && selected.length > 1 ? '40px' : '-50px',
        transition: 'bottom 0.6s ease',
      }}
    >
      <div className='organized-box-text'>Organized</div>
      <OrganizedIcon collect={collect} selected={selected} />
    </div>
  );
};
export default Organized;

const OrganizedIcon = ({ collect, selected }) => {
  const [icon, setIcon] = useState(null);
  const selectedRef = useRef(selected);

  useEffect(() => {
    const delayedIcon = setTimeout(() => {
      setIcon(collect ? <ArrowDown /> : selectedRef.current.length);
    }, 500);

    return () => clearTimeout(delayedIcon);
  }, [collect]);

  useEffect(() => {
    selectedRef.current = selected;
    setIcon(selected.length);
  }, [selected]);

  return <div>{icon}</div>;
};
