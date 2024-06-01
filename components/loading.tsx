import { FC } from 'react';

const LoadingSpinner: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <img src="/loading.gif" alt="Loading..." className="opacity-100" />
    </div>
  );
};

export default LoadingSpinner;
