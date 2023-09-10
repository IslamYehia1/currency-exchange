import S from "./loader.module.scss";
type propsT = {
  className?: string;
};
function Loader({ className }: propsT) {
  return <span className={`${S.loader} ${className}`}></span>;
}

export default Loader;
