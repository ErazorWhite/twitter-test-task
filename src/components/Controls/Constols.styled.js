import { styled } from 'styled-components';

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
  

  &:last-of-type {
    flex-direction: row;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 5px;
    margin-top: 20px;
    @media (min-width: 768px) {
      gap: 5px;
      margin-top: 0;
      align-items: end;
    }
  }
`;

export const Input = styled.input`
  height: 40px;
  min-width: 200px;
  padding: 5px 15px;
`;

export const Button = styled.button`
  background-color: inherit;
  border: none;
  height: 50px;
  bottom: 50px;
`;
