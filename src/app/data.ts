interface FakeChatMessage {
    id: string;
    timestampText: string;
    username: string;
    chat: string;
    history?: boolean;
    timeout?: boolean;
    system?: boolean; // system e.g. timeout
    link?: boolean;
    highlight?: boolean;
}

// testing XD
export const chatMessages: FakeChatMessage[] = [
    {
        id: "1",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "2",
        timestampText: "20:32",
        username: "doge",
        chat: "deleted deleteddeleted deleteddeleted deleted   deleted deleted ",
        timeout: true,
        history: true,
    },
    {
        id: "3",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "4",
        timestampText: "20:32",
        username: "doge",
        chat: "https://kappa.lol/1231231",
        history: true,
        link: true,
    },
    {
        id: "5",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "6",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
        history: true,
    },
    {
        id: "7",
        timestampText: "20:32",
        username: "doge",
        chat: "deleted deleteddeleted deleteddeleted deleted   deleted deleted ",
        timeout: true,
    },
    {
        id: "8",
        timestampText: "20:32",
        username: "doge",
        chat: "doge41732 has been timed out for 5s.",
        system: true,
    },
    {
        id: "9",
        timestampText: "20:32",
        username: "doge",
        chat: "https://kappa.lol/1231231",
        link: true,
    },
    {
        id: "10",
        timestampText: "20:32",
        username: "doge",
        chat: "deleted deleteddeleted deleteddeleted deleted   deleted deleted ",
        timeout: true,
    },
    {
        id: "11",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
    },
    {
        id: "12",
        timestampText: "20:32",
        username: "doge",
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
    },
    {
        id: "13",
        timestampText: "20:32",
        username: "doge",
        chat: "Highlighed after goto message",
        highlight: true,
    },
];
