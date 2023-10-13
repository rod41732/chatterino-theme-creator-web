import { InspectorUI } from "@/app/settings/InspectorUI";
import { ComponentsOverview } from "@/app/fake-uis/ComponentsOverview";
import { usePreviewOptionContext } from "@/lib/api/PreviewOptionContext";

export function ChatterinoOverview() {
    const { editable } = usePreviewOptionContext();
    return (
        <div className="h-full flex flex-row">
            <ComponentsOverview />

            {editable && (
                <div className="w-[500px] overflow-auto">
                    <InspectorUI />
                </div>
            )}
        </div>
    );
}
