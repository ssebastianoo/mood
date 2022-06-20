import { deleteMood } from '../utils';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function DeleteMood({id, moods, setMoods}) {
    async function handleClick(e) {
        e.preventDefault();
        const res = await deleteMood(id);
        setMoods(moods.filter(mood => mood.id !== id));
        if (res.success) {
            Notify.success("Mood deleted successfully");
        } else {
            Notify.failure("There was an error deleting the mood");
        }
    }

    return (
        <button onClick={handleClick}>delete</button>
    )
}