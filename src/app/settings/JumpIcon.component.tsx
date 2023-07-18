import { BsArrowRightCircleFill } from "react-icons/bs";

export function JumpIcon({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="text-gray-300 p-2">
            <BsArrowRightCircleFill />
        </button>
    );
}
