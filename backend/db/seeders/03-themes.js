'use strict';

const { Theme, Sequelize } = require('../models');


let options = {};
options.tableName = 'Themes';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const fontOptions = ['arial', 'courier', 'georgia', 'verdana', 'impact'];
const borderOptions = ['none', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'];

const getCharacter = (i) => {
    return hexCharacters[i]
};

const generateNewColor = () => {
    let newColor = "#"

    for (let i = 0; i < 6; i++) {
        const randomPosition = Math.floor(Math.random() * hexCharacters.length)
        newColor += getCharacter(randomPosition)
    }

    return newColor
};

const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const randomBool = () => {
    return Math.random() < 0.5
}

let themes = [];

for (let i = 0; i < 10; i++) {
    themes.push({
        userId: i + 1,
        title: 'title',
        bgColor: generateNewColor(),
        shadowOffsetX: getRandomInt(-100, 101),
        shadowOffsetY: getRandomInt(-100, 101),
        shadowBlur: getRandomInt(0, 21),
        shadowColor: generateNewColor(),
        shadowInset: randomBool(),
        textColor: generateNewColor(),
        textSize: getRandomInt(10, 51),
        textFont: fontOptions[getRandomInt(0, fontOptions.length)],
        borderStyle: borderOptions[getRandomInt(0, borderOptions.length)],
        borderColor: generateNewColor(),
        borderSize: getRandomInt(1, 51),
        borderRadius: getRandomInt(0, 61),
    })
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Themes";
        return queryInterface.bulkInsert(options, themes, {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Themes";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [] }
        })
    }
}
