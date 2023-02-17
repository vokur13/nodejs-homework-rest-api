const uploadController = async function (req, res) {
  const { description } = req.body;
  res.json({ description, message: 'File uploaded successfully', status: 200 });
};

module.exports = {
  uploadController,
};
