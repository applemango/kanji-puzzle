export type findCreate = {
    data: Array<string>
    x: number,
    y: number,
    words: Array<string>
}
export const findCreateExample: findCreate = {
    x: 10,
    y: 4,
    data: [
        "子供本当言葉問題会社",
        "先生部屋名前友達学校",
        "大学病院写真家族新聞",
        "伯父映画番号両親英語"
    ],
    words: [
        "子供",
        "本当",
        "言葉",
        "問題",
        "会社",
        "先生",
        "部屋",
        "名前",
        "友達",
        "学校",
        "大学",
        "病院",
        "写真",
        "家族",
        "新聞",
        "伯父",
        "映画",
        "番号",
        "両親",
        "英語"
    ]
}

export type find = {
    data: Array<string>,
    x: number,
    y: number
}
export const findExample:find = {
    x: 10,
    y: 4,
    data: [
        "子供本当言葉問題会社",
        "先生部屋名前友達学校",
        "大学病院写真家族新聞",
        "伯父映画番号両親英語"
    ]
}

export type wadou = {
    words: [string, string, string, string],
    correct: string,
    type?: number | [string, string, string, string]
}
export const wadouExample: wadou = {
    words: ["花火","花見","草花","火花"],
    correct: "花",
    type: 2
}