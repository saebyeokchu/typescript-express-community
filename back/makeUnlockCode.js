const bcrypt = require("bcryptjs")
const saltRounds = 10 

function getUnlockCode(unlockCode = ''){
    return bcrypt.hashSync(unlockCode, bcrypt.genSaltSync(saltRounds))
}

module.exports = getUnlockCode
