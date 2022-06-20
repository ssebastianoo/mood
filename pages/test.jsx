import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function Test() {
    return (
        <div>
            <button onClick={() => Notify.success('gg')}>notification</button>
        </div>
    )
}