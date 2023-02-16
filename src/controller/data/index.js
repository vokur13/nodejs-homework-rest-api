const { getAllData } = require('./getAllData');
const { getDataByID } = require('./getDataByID');
const { removeData } = require('./removeData');
const { addData } = require('./addData');
const { updateData } = require('./updateData');
const { updateDataStatus } = require('./updateDataStatus');

module.exports = {
  getAllData,
  getDataByID,
  removeData,
  addData,
  updateData,
  updateDataStatus,
};
