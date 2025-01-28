import { useEffect } from 'react';
export const useClickOutside = (isOpen, setIsOpen, ref, excludedClass) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      // 제외 부분 클릭 감지
      if (excludedClass && e.target.classList.contains(excludedClass)) return;

      // ref 영역 외부 클릭 감지
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // 마우스 클릭 감지
    document.addEventListener('touchstart', handleClickOutside); // 모바일 터치 감지

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, setIsOpen, ref, excludedClass]);
};
