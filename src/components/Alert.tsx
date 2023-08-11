import { useAppSelector,useAppDispatch } from "../hooks/redux.hook";
import { AlertState } from "../slices/alert.slice";
import { closeAlert } from "../slices/alert.slice";

const Alert = () => {
    const dispatch = useAppDispatch();
    const { message,variant } = useAppSelector(state=>state.alert) as AlertState;

    return (
        <div className={`w-full flex justify-between items-center py-2 px-3 rounded-md mb-5 ${variant === "error" ? "bg-red-100 text-red-500" : "text-green-500 bg-green-100"}`}>
            <h5 className="font-semibold text-[13px]">{message}</h5>
            <button onClick={() => dispatch(closeAlert())} className="font-bold text-sm">x</button>
        </div>
    )
}

export default Alert;