import Loader from "../Loader";
import S from "./loadingInput.module.scss";
type propsT = {
  isLoading: boolean;
};
function LoadingInput({
  isLoading,
  className,
  ...props
}: propsT & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className={`${S.wrapper}  ${className}`}>
      <input {...props} />
      {isLoading ? <Loader className={S.loader} /> : null}
    </div>
  );
}

export default LoadingInput;
