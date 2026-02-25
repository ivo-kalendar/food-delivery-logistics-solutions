const vraboteni = require("../server").db().collection("vraboteni");
const tables = require("../server").db().collection("tables");
const { ObjectId } = require("mongodb");
const {
    optionAllHours,
    optionAllComments,
    optionAllKomercial,
    optionAllRegions,
} = require("../config/dbObjectIds.js");

let Options = function (data) {
    this.data = data;
    this.errors = [];
};

Options.getAllHourOptions = async () => {
    return await vraboteni.findOne({
        _id: ObjectId(optionAllHours),
    });
};

Options.getAllCommentOptions = async () => {
    return await vraboteni.findOne({
        _id: ObjectId(optionAllComments),
    });
};

Options.getAllKomercialOptions = async () => {
    let { komercija } = await vraboteni.findOne({
        _id: ObjectId(optionAllKomercial),
    });

    let { reon } = await vraboteni.findOne({
        _id: ObjectId(optionAllRegions),
    });

    komercija = [...reon, ...komercija];
    return komercija;
};

Options.getDifferenceDrivers = async (id) => {
    let tableDrivers = [];
    let active = [];
    let inactive = [];

    let editTable = await tables.findOne({ _id: ObjectId(id) });
    editTable.tableData.forEach((d) => tableDrivers.push(d._id.toString()));

    let actfilter = { position: "distributor", status: "active" };
    let infilter = { position: "distributor", status: { $ne: "active" } };
    const options = { projection: { _id: 1 } };

    let allActiveDrivers = await vraboteni.find(actfilter, options).toArray();
    allActiveDrivers.forEach((d) => {
        if (!tableDrivers.includes(d._id.toString())) {
            active.push(d._id.toString());
        }
    });

    let allInactiveDrivers = await vraboteni.find(infilter, options).toArray();
    allInactiveDrivers.forEach((d) => {
        if (tableDrivers.includes(d._id.toString())) {
            inactive.push(d._id.toString());
        }
    });

    return { active, inactive };
};

module.exports = Options;
