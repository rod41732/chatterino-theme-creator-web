import { ForwardedRef, useEffect, useRef, useState } from "react";
import {
    ColorPickerHandle,
    ColorPickerWrapperProps,
} from "@/app/settings/ColorPickerWrapper.component";
import useNotification from "antd/es/notification/useNotification";

type PropsWithRef<P, R> = P & { ref: ForwardedRef<R> };

export function usePickerLogic() {
    const [selectedPicker, setSelectedPicker] = useState("");
    const selectedPickerRef = useRef("");
    const colorHandles = useRef<{ [id: string]: ColorPickerHandle }>({});

    const [api, contextHolder] = useNotification();

    useEffect(() => {
        const handler = async (e: KeyboardEvent) => {
            // TODO: e.key doesn't work well with non-US keyboard
            if (e.key == "c") {
                const color =
                    colorHandles.current[selectedPickerRef.current]
                        .currentColor;
                await navigator.clipboard.writeText(color);

                api.success({
                    placement: "top",
                    message: (
                        <div>
                            Copied
                            <strong>{color}</strong>
                        </div>
                    ),
                    description: "Copied " + selectedPickerRef.current,
                    duration: 0.5, // seconds
                });
            } else if (e.key == "v") {
                const color = await navigator.clipboard.readText();
                if (!/^#[0-9a-f]{6,8}$/i.test(color)) {
                    api.warning({
                        placement: "top",
                        message: "invalid color in clipboard",
                        description: "accepted are #rrggbb and #rrggbbaa",
                    });
                    return;
                }

                const handle = colorHandles.current[selectedPickerRef.current];
                handle.setColor(color);

                api.success({
                    placement: "top",
                    message: (
                        <div>
                            Pasted
                            <strong>{color}</strong>
                        </div>
                    ),
                    description: "To " + selectedPickerRef.current,
                    duration: 0.5, // seconds
                });
            } else if (e.key == "z") {
                const handle = colorHandles.current[selectedPickerRef.current];
                const undoColor = handle.undo();
                api.success({
                    placement: "top",
                    message: undoColor ? (
                        <div>
                            Undo to
                            <strong>{undoColor}</strong>
                        </div>
                    ) : (
                        <div>no undo</div>
                    ),
                    description: "For " + selectedPickerRef.current,
                    duration: 0.5, // seconds
                });
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const registerHandler = (
        name: string,
    ): Partial<PropsWithRef<ColorPickerWrapperProps, ColorPickerHandle>> => {
        return {
            onSelect: () => {
                setSelectedPicker(name);
                selectedPickerRef.current = name;
            },
            selected: selectedPicker == name,
            onColorChange: (color) => {
                // selectedColors.current[name] = color;
            },
            ref: (r) => {
                if (!r) return;
                colorHandles.current[name] = r;
            },
        };
    };

    return [registerHandler, contextHolder] as const;
}
