import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { ScrollUpBox, ScrollUpButton } from './ScrollUp.styled';
import { throttle } from 'lodash';
export const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = throttle(() => {
    setIsVisible(window.scrollY > window.innerHeight);
  }, 500);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <ScrollUpBox>
      {isVisible && (
        <div onClick={scrollToTop}>
          <ScrollUpButton>
            <MdOutlineKeyboardDoubleArrowUp color="white" size={'30'} />
          </ScrollUpButton>
        </div>
      )}
    </ScrollUpBox>
  );
};
