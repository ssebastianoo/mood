import { deleteMood } from '../utils';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch } from "react-redux";
import { removeMood } from '../features/moodsSlice';

export default function DeleteMood({ id }) {
    const dispatch = useDispatch();

    async function handleClick(e) {
        e.preventDefault();
        const res = await deleteMood(id);
        dispatch(removeMood(id));
        if (res.success) {
            Notify.success("Mood deleted successfully");
        } else {
            Notify.failure("There was an error deleting the mood");
        }
    }

    return (
        <button onClick={handleClick} className="bg-red w-[70px] h-7 rounded-md">Delete</button>
    )
}