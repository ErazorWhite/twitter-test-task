import { ControlsBox, MobileMenuContainer } from './Mobilemenu.styled';
import { Controls } from 'components/Controls/Controls';
export const MobileMenu = ({ isHidden }) => {
  return (
    <MobileMenuContainer $isHidden={isHidden}>
      <ControlsBox>
        <Controls/>
      </ControlsBox>
    </MobileMenuContainer>
  );
};
