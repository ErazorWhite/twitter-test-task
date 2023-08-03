import { styled } from 'styled-components';

export const ScrollUpBox = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export const ScrollUpButton = styled.button`
  background-color: var(--secondary-dark);
  border: 2px solid var(--primary-light);
  border-radius: 50%;
  height: 60px;
  width: 60px;
  cursor: pointer;
`;
