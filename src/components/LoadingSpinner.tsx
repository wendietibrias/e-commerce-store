import ReactLoading from "react-loading";

type LoadingSpinnerProps = {
    width:number;
    height:number;
    color:string;
}

const LoadingSpinner = ({
   width,
   height,
   color
} : LoadingSpinnerProps) => {
   return (
      <ReactLoading type="spin" width={width} height={height} color={color} />
   )
}

export default LoadingSpinner;