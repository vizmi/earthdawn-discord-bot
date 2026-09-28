/** exploding die roll 
 * size: size of the die
 * returns: random roll of the die. When die rolls max, it will be re-rolled
*/
const d = (size) => {

	let result = 0, roll = Math.floor(Math.random() * size) + 1;
	while (roll == size) {
		result += roll;
		roll = Math.floor(Math.random() * size) + 1;
	}
    result += roll;

    return result;
}

module.exports = {
    1: { text: "1d4-2",                 roll: () => d(4)-2,                         min: -1 },
    2: { text: "1d4-1",                 roll: () => d(4)-1,                         min: 0 },
    3: { text: "1d4",                   roll: () => d(4),                           min: 1 },
    4: { text: "1d6",                   roll: () => d(6),                           min: 1 },
    5: { text: "1d8",                   roll: () => d(8),                           min: 1 },
    6: { text: "1d10",                  roll: () => d(10),                          min: 1 },
    7: { text: "1d12",                  roll: () => d(12),                          min: 1 },
    8: { text: "2d6",                   roll: () => d(6)+d(6),                      min: 2 },
    9: { text: "1d8+1d6",               roll: () => d(8)+d(6),                      min: 2 },
    10: { text: "2d8",                  roll: () => d(8)+d(8),                      min: 2 },
    11: { text: "1d10+1d8",             roll: () => d(10)+d(8),                     min: 2 },
    12: { text: "2d10",                 roll: () => d(10)+d(10),                    min: 2 },
    13: { text: "1d12+1d10",            roll: () => d(12)+d(10),                    min: 2 },
    14: { text: "2d12",                 roll: () => d(12)+d(12),                    min: 2 },
    15: { text: "1d12+2d6",             roll: () => d(12)+d(6)+d(6),                min: 3 },
    16: { text: "1d12+1d8+1d6",         roll: () => d(12)+d(8)+d(6),                min: 3 },
    17: { text: "1d12+2d8",             roll: () => d(12)+d(8)+d(8),                min: 3 },
    18: { text: "1d12+1d10+1d8",        roll: () => d(12)+d(10)+d(8),               min: 3 },
    19: { text: "1d20+2d6",             roll: () => d(20)+d(6)+d(6),                min: 3 },
    20: { text: "1d20+1d8+1d6",         roll: () => d(20)+d(8)+d(6),                min: 3 },
    21: { text: "1d20+2d8",             roll: () => d(20)+d(8)+d(8),                min: 3 },
    22: { text: "1d20+1d10+1d8",        roll: () => d(20)+d(10)+d(8),               min: 3 },
    23: { text: "1d20+2d10",            roll: () => d(20)+d(10)+d(10),              min: 3 },
    24: { text: "1d20+1d12+1d10",       roll: () => d(20)+d(12)+d(10),              min: 3 },
    25: { text: "1d20+2d12",            roll: () => d(20)+d(12)+d(12),              min: 3 },
    26: { text: "1d20+1d12+2d6",        roll: () => d(20)+d(12)+d(6)+d(6),          min: 4 },
    27: { text: "1d20+1d12+1d8+1d6",    roll: () => d(20)+d(12)+d(8)+d(6),          min: 4 },
    28: { text: "1d20+1d12+2d8",        roll: () => d(20)+d(12)+d(8)+d(8),          min: 4 },
    29: { text: "1d20+1d12+1d10+1d8",   roll: () => d(20)+d(12)+d(10)+d(8),         min: 4 },
    30: { text: "2d20+2d6",             roll: () => d(20)+d(20)+d(6)+d(6),          min: 4 },
    31: { text: "2d20+1d8+1d6",         roll: () => d(20)+d(20)+d(8)+d(6),          min: 4 },
    32: { text: "2d20+2d8",             roll: () => d(20)+d(20)+d(8)+d(8),          min: 4 },
    33: { text: "2d20+1d10+1d8",        roll: () => d(20)+d(20)+d(10)+d(8),         min: 4 },
    34: { text: "2d20+2d10",            roll: () => d(20)+d(20)+d(10)+d(10),        min: 4 },
    35: { text: "2d20+1d12+1d10",       roll: () => d(20)+d(20)+d(12)+d(10),        min: 4 },
    36: { text: "2d20+2d12",            roll: () => d(20)+d(20)+d(12)+d(12),        min: 4 },
    37: { text: "2d20+1d12+2d6",        roll: () => d(20)+d(20)+d(12)+d(6)+d(6),    min: 5 },
    38: { text: "2d20+1d12+1d8+1d6",    roll: () => d(20)+d(20)+d(12)+d(8)+d(6),    min: 5 },
    39: { text: "2d20+1d12+2d8",        roll: () => d(20)+d(20)+d(12)+d(8)+d(8),    min: 5 },
    40: { text: "2d20+1d12+1d10+1d8",   roll: () => d(20)+d(20)+d(12)+d(10)+d(8),   min: 5 }
}