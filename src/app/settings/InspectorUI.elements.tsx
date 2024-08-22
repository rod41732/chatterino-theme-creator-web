import { getPath, setPath } from "@/lib/object-path.util";
import { Checkbox } from "antd";
import clsx from "clsx";
import { produce } from "immer";
import { ReactNode } from "react";
import { useInspectorContext } from "../components/InsEdit";
import { IconThemeSwitcher } from "../edit/IconThemeColorSwitcher";
import { useThemeContext } from "../edit/ThemeContextProvider";
import { ColorPickerWrapper } from "./ColorPickerWrapper.component";

export function InspectorMainTab(): ReactNode {
    const { data, setData } = useThemeContext();
    return (
        <div>
            <div className="py-2 border-b border-b-gray-300 mb-2">
                <div className="text-xl font-bold"> Theme Editor </div>
            </div>

            <div className="font-bold text-lg mt-4 mb-1"> General </div>
            <p className="font-bold"> Icon theme</p>
            <IconThemeSwitcher />
            <p className="text-sm text-gray-500">
                Icon theme determines whether a theme is dark theme or light
                theme. The editor background will also be changed to be contrast
                with your theme.
            </p>

            <div className="font-bold text-lg mt-4 mb-1"> Tips </div>
            <li>Click on elements on the left side to customize theme.</li>
            <li> Rename theme name at on the top left. </li>

            <div className="font-bold text-lg mt-4 mb-1"> Settings </div>
            <Checkbox
                className="text-inherit"
                checked={data.ctcMeta.simpleTabSettings}
                onChange={(e) => {
                    setData(
                        produce(data, (draft) => {
                            draft.ctcMeta.simpleTabSettings = e.target.checked;
                        }),
                    );
                }}
            >
                Simple tab color settings
            </Checkbox>
            <p className="text-sm text-gray-500">
                Use same color for all tab states
            </p>
        </div>
    );
}

export function InspectorEditorTab(): ReactNode {
    const { state: inspectorState, setState: setInspectorState } =
        useInspectorContext();
    return (
        <div>
            <div className="flex items-center py-2 border-b border-b-gray-300 mb-2">
                <div className="text-xl font-bold"> Edit element</div>
                <div className="flex-1"> </div>
                <button
                    className="text-blue-500"
                    onClick={() => {
                        setInspectorState({ mode: "main", widgets: [] });
                    }}
                >
                    Done
                </button>
            </div>
            {inspectorState.widgets.map((it, idx) => {
                if (it.type == "divider") {
                    return <hr key={idx} className="my-4" />;
                }
                if (it.type == "title") {
                    return (
                        <div key={idx} className="mb-2">
                            {
                                <h1
                                    className={clsx(
                                        it.size == "large"
                                            ? "text-xl"
                                            : "text-lg",
                                        "font-bold",
                                    )}
                                >
                                    {" "}
                                    {it.title}{" "}
                                </h1>
                            }
                            {it.subtitle && (
                                <h2 className="text-sm text-gray-500">
                                    {" "}
                                    {it.subtitle}{" "}
                                </h2>
                            )}
                        </div>
                    );
                }
                if (it.type == "colorPicker") {
                    return (
                        <div key={idx} className="my-2">
                            <div className="flex items-center">
                                <div>
                                    <div>{it.name}</div>
                                    <code className="text-gray-500 text-xs block">
                                        {it.path}
                                    </code>
                                </div>
                                <div className="flex-1"> </div>
                                <ColorPickerWrapper
                                    mutateColor={(draft, color) => {
                                        setPath(draft.colors, it.path, color);
                                    }}
                                    getColor={(data) =>
                                        getPath(data.colors, it.path)
                                    }
                                    alpha={it.alpha}
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                {" "}
                                {it.description}
                            </p>
                        </div>
                    );
                }
                if (it.type == "custom") {
                    return it.children;
                }
            })}
        </div>
    );
}
