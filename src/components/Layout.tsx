import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Link to={"/home"}>home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to={"/todos"}>todos</Link>
      {children}
    </div>
  );
};

export default Layout;
