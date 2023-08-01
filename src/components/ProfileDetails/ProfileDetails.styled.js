import styled from 'styled-components';

export const BannerThumb = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const Text = styled.p`
  margin-bottom: 12px;
`;

export const AvatarThumb = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 10%;
  overflow: hidden;
  position: relative;
  margin-top: -80px;
  margin-left: 20px;
  border: 5px solid black;
`;

export const H2 = styled.h2`
  margin-bottom: 12px;
`;

export const DescriptionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
`;

export const DescriptionItem = styled.li`
  display: flex;
  gap: 4px;
`;

export const FollowList = styled.ul`
  display: flex;
  gap: 20px;
`;

export const FollowDigit = styled.span`
  font-weight: bold;
`;
