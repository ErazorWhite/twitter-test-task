import { styled } from 'styled-components';

export const MobileMenuContainer = styled.div`
  position: fixed;
  left: 0;
  top: 60px;

  width: 100%;
  height: 100%;
  padding: 20px 60px;

  transform: ${({ $isHidden }) =>
    $isHidden ? `translate(-100%)` : `translate(0%)`};
  transition: transform 0.5s var(--cubic);

  background: var(--radial-gradient);
`;

export const ControlsBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  gap: 30px;

  width: 60%;

  transform: translate(-50%, -130%);
`;
