import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { StyledHeader, A, Button } from './Header.styled';
import { Mobile, Desktop } from 'utilities/DeviceTypeDeterminant';
import { Controls } from 'components/Controls/Controls';
import { MobileMenu } from 'Layout/MobileMenu/MobileMenu';
import { useState } from 'react';

export const Header = () => {
  const [mobileMenuIsHidden, setMobileMenuIsHidden] = useState(true);
  const handleBurgerClick = () => {
    setMobileMenuIsHidden(!mobileMenuIsHidden);
  };

  return (
    <StyledHeader>
      <Mobile>
        <A to="/">Tortter</A>
        <Button onClick={handleBurgerClick}>
          {mobileMenuIsHidden ? (
            <RxHamburgerMenu size={22} color={'white'} />
          ) : (
            <RxCross1 size={22} color={'white'} />
          )}
        </Button>
        <MobileMenu isHidden={mobileMenuIsHidden} />
      </Mobile>
      <Desktop>
        <Controls isDesktop/>
      </Desktop>
    </StyledHeader>
  );
};
