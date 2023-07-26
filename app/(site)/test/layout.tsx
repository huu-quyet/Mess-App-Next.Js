import React, { FC } from "react";

const layout: FC<any> = ({ children }) => {
  return (
    <div className="bg-sky-500">
      <p></p>
      {children}
    </div>
  );
};

export default layout;
