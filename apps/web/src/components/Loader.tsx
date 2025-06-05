import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(85dvh-70px)]">
      <ClipLoader color="#E35205" size={42} />
    </div>
  );
}

export default Loader;
