import React from 'react';

const Loader = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-4 h-4 border-4 border-transparent  text-xl animate-spin flex items-center justify-center border-t-white rounded-full">
        <div className="w-4 h-4 border-4 border-transparent  text-md animate-spin duration-1000 flex items-center justify-center border-t-white rounded-full" />
      </div>
    </div>
  );
}

export default Loader;
