import { deleteMood } from '../utils';

export default function DeleteMood({id, moods, setMoods}) {
    async function handleClick(e) {
        e.preventDefault();
        await deleteMood(id);
        setMoods(moods.filter(mood => mood.id !== id));
    }

    return (
        <button onClick={handleClick}>delete</button>
    )
}