import { styled } from 'styled-components';

export const SearchBar = styled.div`
  margin-right: none;
  @media (min-width: 768px) {
    margin-right: auto;
  }
`;

export const Ul = styled.ul`
  @media (min-width: 768px) {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: start;
    width: 100%;
  }
`;

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  justify-content: end;
`;

export const UlButtons = styled.ul`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

export const Input = styled.input`
  font-size: 1.1em;
  height: 40px;
  min-width: 200px;
  padding: 4px 10px;
`;

export const Button = styled.button`
  background-color: inherit;
  border: none;
  height: 50px;
  width: 50px;
  cursor: pointer;
`;
