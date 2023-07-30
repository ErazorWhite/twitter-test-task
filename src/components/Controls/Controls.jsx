import { AiOutlinePlusSquare } from 'react-icons/ai';
import { Input, Ul, Li, Button } from './Controls.styled';
import cssVar from 'utilities/cssVarGetter';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const options = [
  { value: 'newFirst', label: 'New first' },
  { value: 'oldFirst', label: 'Old first' },
];

export const Controls = ({ isDesktop }) => {
  const [isProfilePage, setIsProfilePage] = useState(false);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    setIsProfilePage(location.pathname.startsWith('/profile'));
  }, [location]);

  return (
    <>
      <Ul>
        {isProfilePage ? (
          <Li>
            <Link to={backLinkLocationRef.current}>← Go Back</Link>
          </Li>
        ) : (
          <Li>
            <label htmlFor="username">Username</label>
            <Input type="text" placeholder="@UserName" name="username" />
          </Li>
        )}
        <Li>
          <label htmlFor="message">Message</label>
          <Input type="text" placeholder="Type to Search" />
        </Li>
        <Li>
          <label htmlFor="sort">Sort</label>
          <Select
            name="dateFilter"
            id="dateFilter"
            options={options}
            isSearchable={false}
          />
        </Li>
        <Li>
          {!isDesktop && <label htmlFor="sort">Add new post:</label>}
          <Button
            onClick={() => {
              console.log('clicked');
            }}
          >
            <AiOutlinePlusSquare
              size={isDesktop ? 50 : 36}
              color={cssVar('--primary-light')}
            />
          </Button>
        </Li>
      </Ul>
    </>
  );
};
