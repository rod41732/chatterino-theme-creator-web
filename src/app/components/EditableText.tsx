import { useEffect, useState } from "react";

export function EditableText({
    value,
    onChangeCommited,
}: {
    value: string;
    // called to notify parent about change, so parent can, e.g. persist the change
    onChangeCommited: (v: string) => Promise<void>;
}) {
    const [editMode, setEditMode] = useState(false);

    const [newName, setNewName] = useState("");
    useEffect(() => {
        if (editMode) {
            setNewName(value);
        }
    }, [editMode]);

    return editMode ? (
        <input
            className="my-1 border border-gray-400 rounded-md outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
            onBlur={async () => {
                await onChangeCommited(newName);
                setEditMode(false);
            }}
            onKeyDown={async (e) => {
                if (e.key == "Escape") {
                    setEditMode(false);
                }
                if (e.key == "Enter") {
                    await onChangeCommited(newName);
                    setEditMode(false);
                }
            }}
        />
    ) : (
        <div
            // href={"/edit/" + theme.id}
            className="text-lg font-semibold flex items-center cursor-pointer w-full flex-shrink"
            onClick={() => setEditMode(true)}
            role="button"
        >
            <p className="hover:border hover:border-gray-400 hover:rounded-md">
                {value}
            </p>
        </div>
    );
}
