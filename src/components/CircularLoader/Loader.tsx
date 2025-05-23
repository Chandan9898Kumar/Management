import { FC } from "react";
import loaderStyle from "./loader.module.css";
const Loader: FC = () => {
  return (
    <div data-testid="loader" className={loaderStyle.container}>
      <div className={loaderStyle.loader}></div>
    </div>
  );
};

export default Loader;