import { styled } from 'styled-components';
import cssVar from 'utilities/cssVarGetter';

const mobilePd = cssVar('--mobile-padding');
const tabletPd = cssVar('--tablet-padding');
const desktopPd = cssVar('--desktop-padding');

export const UserName = styled.h2`
  font-size: 1em;
`;

export const Li = styled.li`
  position: relative;
  margin: 0 -${mobilePd};
  padding: 10px ${mobilePd};
  border-bottom: 1px solid gray;

  &:last-child {
    border: none;
  }

  @media (min-width: 768px) {
    margin: 0 -${tabletPd};
    padding: 20px ${tabletPd};
  }

  @media (min-width: 1280px) {
    margin: 0 -${desktopPd};
    padding: 30px ${desktopPd};
  }
`;

export const AvatarBox = styled.div`
  min-height: 40px;
  height: 40px;
  min-width: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const MessageBox = styled.div`
  padding: 5px;
`;

export const Message = styled.p`
  margin-bottom: 15px;
`;

export const MessageImgBox = styled.div`
  max-width: 480px;
  max-height: 640px;
  border-radius: 10%;
  overflow: hidden;
`;

export const MessageSplitter = styled.div`
  display: flex;
  gap: 12px;
`;

export const MessageTitle = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
`;
