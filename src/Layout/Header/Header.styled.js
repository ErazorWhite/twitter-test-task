import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  background-color: var(--secondary-dark);
  min-height: 60px;
  min-width: 320px;
  z-index: 1500;

  @media (min-width: 768px) {
    justify-content: center;
    padding: 10px 40px;
  }
`;

export const A = styled(Link)`
  text-decoration: none;
  font-size: 1.5em;
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  background-color: inherit;
  border: 1px solid var(--primary-light);
`;
