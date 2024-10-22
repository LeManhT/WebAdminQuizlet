import { CircularProgress } from "@mui/material";

interface IProps {
  size?: number;
  color?: "info" | "success" | "primary" | "warning";
}

function LoadingComponent(props: IProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircularProgress size={props.size || 30} color={props.color || "info"} />
    </div>
  );
}

export default LoadingComponent;
