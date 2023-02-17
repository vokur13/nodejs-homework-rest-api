const uploadController = async function (req, res) {
  const { description } = req.body;
  res.json({ description, message: 'Файл успешно загружен', status: 200 });
};

module.exports = {
  uploadController,
};
