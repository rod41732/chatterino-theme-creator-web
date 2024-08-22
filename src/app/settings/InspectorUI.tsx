import { useInspectorContext } from "@/app/components/InsEdit";
import { useThemeContext } from "@/app/edit/ThemeContextProvider";
import { InspectorEditorTab, InspectorMainTab } from "./InspectorUI.elements";

export function InspectorUI() {
    const { state, setState } = useInspectorContext();
    const { data, setData } = useThemeContext();
    const mode = state.mode ?? "editor";

    return (
        <div className="p-4">
            {mode == "main" ? <InspectorMainTab /> : <InspectorEditorTab />}
        </div>
    );
}
