const BASE = {
    trueWhite: '#FFFFFF',
    trueBlack: '#000000',

    white: '#FFFFFF',
    lightestGray: '#F9FAFB',
    lighterGray: '#F1F2F6',
    lightGray: '#EBEEF2',
    gray: '#C1C5CD',
    darkGray: '#8D929F',
    darkerGray: '#282727',
    black: '#09132C',    

    blue: '#0B90FF',

    yellow: '#F2C94C',
}

const ATOM_COLORS = {
    // LINES
    hairLineColor: BASE.lighterGray,
    lineColor: BASE.lighterGray,
    lightLineColor: BASE.lightestGray,
}

const ELEMENT_COLORS = {
    backgroundColor: BASE.darkerGray,
    sectionBackgroundColor: BASE.yellow,
}

const TEXT_COLORS = {
    selectedText: BASE.blue,
    text: BASE.black,
    lightText: BASE.darkGray,
    lighterText: BASE.gray,
}

export const COLORS = {
    ...ATOM_COLORS,
    ...BASE,
    ...TEXT_COLORS,
    ...ELEMENT_COLORS,
}