import {
    InspectorWidgetDef,
    useInspectorContext,
} from "@/app/components/InsEdit";

export type TabState = "regular" | "hover" | "hoverBugged" | "unfocused";
type MakeTabInspectorExtras = {
    liveIndicator?: boolean;
    rerunIndicator?: boolean;
};

export function makeTabInspectorWidgets(
    tabItemState: "selected" | "regular" | "newMessage" | "highlighted",
    tabState: TabState,
    extras: MakeTabInspectorExtras = {},
): InspectorWidgetDef[] {
    const tabName = {
        selected: "Selected Tab",
        regular: "Unselected Tab",
        newMessage: "New Message Tab",
        highlighted: "Highlight Tab",
    };
    const stateSuffix = {
        regular: "",
        hover: " (Hover)",
        hoverBugged: " (Hover, Bugged)",
        unfocused: " (Unfocused window)",
    };
    const tabDescription = {
        selected: "Currently Selected Tab",
        regular:
            "Tabs that aren't selected and don't have new message or highlight",
        newMessage: "Tabs with new message",
        highlighted: "Tabs with highlights (e.g mentioned)",
    };
    const tabDescriptionStateSuffic = {
        regular: "",
        hoverBugged:
            " (This is same as regular, which mimics current behavior of Chatterino tab color)",
        hover: " (This should be seen when tab is mouse overed, but in fact it is never used)",
        unfocused: " (This is color when Chatterino window is unfocused)",
    };
    const realState = tabState == "hoverBugged" ? "regular" : tabState;

    const widgets: InspectorWidgetDef[] = [
        {
            type: "title",
            title: tabName[tabItemState] + stateSuffix[tabState],
            subtitle:
                tabDescription[tabItemState] +
                tabDescriptionStateSuffic[tabState],
        },
        {
            type: "colorPicker",
            path: `tabs.${tabItemState}.text`,
            name: "Text color",
            description: `Text color. This is shared among all hover states. ${tabDescriptionStateSuffic[tabState]}`,
        },
        {
            type: "colorPicker",
            path: `tabs.${tabItemState}.backgrounds.${realState}`,
            name: "Background color",
            description: `Background color of tab ${tabDescriptionStateSuffic[tabState]}`,
        },
        {
            type: "colorPicker",
            path: `tabs.${tabItemState}.line.${realState}`,
            name: "Line color",
            description: `Line color at top of tab ${tabDescriptionStateSuffic[tabState]}`,
        },
        {
            type: "divider",
        },
        {
            type: "title",
            title: "Tab bar",
        },
        {
            type: "colorPicker",
            path: "window.background",
            name: "Tab background color",
            description: "Empty area in tab bar",
        },
        {
            type: "colorPicker",
            path: "tabs.dividerLine",
            name: "Divider Line",
            description: "Divider line at bottom of tab bar",
        },
    ];

    if (extras.liveIndicator) {
        widgets.push(
            {
                type: "divider",
            },
            {
                type: "title",
                title: "Live Indicator",
                subtitle:
                    "Small colored circle indicating that streamer is LIVE",
            },
            {
                type: "colorPicker",
                path: "tabs.liveIndicator",
                name: "Live Indicator",
                description:
                    "Color of small circle indicating that streamer is LIVE",
            },
        );
    } else if (extras.rerunIndicator) {
        widgets.push(
            {
                type: "divider",
            },
            {
                type: "title",
                title: "Rerun Indicator",
                subtitle:
                    "Small colored circle indicating that streamer is RERUN",
            },
            {
                type: "colorPicker",
                path: "tabs.rerunIndicator",
                name: "Rerun Indicator",
                description:
                    "Color of small circle indicating that streamer is RERUN",
            },
        );
    }

    if (tabState != "regular") {
        widgets.push({ type: "divider" });
        widgets.push({
            type: "custom",
            children: (
                <div>
                    <p className="text-gray-500 text-sm">
                        Too complicated? You can enable simple mode to have same
                        styles for all states
                    </p>
                    <GoToMainSettingsButton />
                </div>
            ),
        });
    }
    return widgets;
}

function GoToMainSettingsButton() {
    const { setState } = useInspectorContext();
    return (
        <button
            className="text-blue-500 p-2"
            onClick={() => {
                setState({
                    mode: "main",
                    widgets: [],
                });
            }}
        >
            Go to settings
        </button>
    );
}
