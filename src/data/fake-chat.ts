export interface FakeChatMessage {
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
export const fakeChatListLarge: FakeChatMessage[] = [
    ...Array(100)
        .fill(null)
        .map((it, idx) => ({
            chat: `historical ${idx % 5 == 0 ? "deleted " : ""}message -${
                100 - idx
            }`,
            highlight: false,
            history: true,
            id: `-${100 - idx}`,
            link: false,
            system: false,
            timeout: idx % 5 == 0,
            timestampText: "20:32",
            username: "doge",
        })),
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
        chat: "Highlighed after goto message",
        highlight: true,
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
        chat: "fforsen forsen forsen forsen forsen forsen forsen forsen orsen forsen ",
    },
];

export const fakeChatListSmall: FakeChatMessage[] = [
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
];

export const fakeChatListVerySmall: FakeChatMessage[] = [
    {
        id: "1",
        timestampText: "20:32",
        username: "doge",
        chat: "Historical",
        history: true,
    },
    {
        id: "2",
        timestampText: "20:32",
        username: "doge",
        chat: "Historical deleted message",
        timeout: true,
        history: true,
    },
    {
        id: "4",
        timestampText: "20:32",
        username: "doge",
        chat: "https://kappa.lol/1231231 link message",
        history: true,
        link: true,
    },
    {
        id: "11",
        timestampText: "20:32",
        username: "doge",
        chat: "Normal",
    },
    {
        id: "21",
        timestampText: "20:32",
        username: "doge",
        chat: "https://kappa.lol/1231231 link message",
        link: true,
    },
    {
        id: "12",
        timestampText: "20:32",
        username: "doge",
        chat: "System message: doge has been timed out for 2m.",
        system: true,
    },
    {
        id: "13",
        timestampText: "20:32",
        username: "doge",
        highlight: true,
        chat: "Highlighed message",
    },
];

export const fakeChatListVerySmallNoDistract: FakeChatMessage[] = [
    {
        id: "1",
        timestampText: "20:32",
        username: "doge",
        chat: "Historical",
        history: true,
    },
    {
        id: "2",
        timestampText: "20:32",
        username: "doge",
        chat: "Historical deleted message",
        timeout: true,
        history: true,
    },
    {
        id: "12",
        timestampText: "20:32",
        username: "doge",
        chat: "System message: doge has been timed out for 2m.",
        system: true,
    },
];
