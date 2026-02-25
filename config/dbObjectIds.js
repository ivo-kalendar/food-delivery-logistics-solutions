require('dotenv').config();

const adminId = process.env.ADMIN_ID;
const optionAllHours = process.env.OPTION_ALL_HOURS
const optionAllComments = process.env.OPTION_ALL_COMMENTS
const optionAllKomercial = process.env.OPTION_ALL_KOMERCIAL
const optionAllRegions = process.env.OPTION_ALL_REGIONS

module.exports = {
    adminId,
    optionAllHours,
    optionAllComments,
    optionAllKomercial,
    optionAllRegions
};
