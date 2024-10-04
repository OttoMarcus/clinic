

const month = '#637eb6';
const week = '#a2d561';
const day = '#e6308b';

const Clock = ({fill}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill === 'month' ? month : (fill === 'week' ? week : day)}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-clock"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
            <path d="M12 7v5l3 3"/>
        </svg>
    )
}

export default Clock