import ContentLoader from 'react-content-loader';
import { Desktop, Mobile } from 'utilities/DeviceTypeDeterminant';

const SkeletonPost = props => (
  <ContentLoader
    speed={2}
    width={480}
    height={360}
    viewBox="0 0 480 360"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Mobile>
      <circle cx="20" cy="20" r="20" />
      <rect x="52" y="0" rx="0" ry="0" width="260" height="16" />
      <rect x="52" y="31" rx="0" ry="0" width="300" height="21" />
      <rect x="52" y="93" rx="0" ry="0" width="300" height="360" />
      <rect x="52" y="62" rx="0" ry="0" width="300" height="21" />
    </Mobile>
    <Desktop>
      <circle cx="20" cy="20" r="20" />
      <rect x="52" y="0" rx="0" ry="0" width="320" height="16" />
      <rect x="52" y="31" rx="0" ry="0" width="480" height="21" />
      <rect x="52" y="93" rx="0" ry="0" width="480" height="360" />
      <rect x="52" y="62" rx="0" ry="0" width="480" height="21" />
    </Desktop>
  </ContentLoader>
);

export default SkeletonPost;
