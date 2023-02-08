import { useRef, useEffect } from 'react'
;
export const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      // ref.current?.contains...
      if (!ref.current?.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};
