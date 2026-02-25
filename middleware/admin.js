const { adminId } = require("../config/dbObjectIds.js");

module.exports = function (req, res, next) {
    if (req.id === adminId) {
        next();
    } else {
        res.json([
            {
                _id: 'user',
                ime:
                    'Немате пристап до оваа рута -- Контактирајте го Администраторот...',
            },
        ]);
    }
};
