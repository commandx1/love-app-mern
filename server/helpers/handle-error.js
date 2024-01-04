const handleError = (res, error) => {
    console.error(error);
    res.status(500).send({ message: error.message });
    return;
};

module.exports = handleError;
