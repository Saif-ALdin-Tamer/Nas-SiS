const express = require('express');
const {
  createFee,
  getFees,
  getFee,
  updateFee,
  deleteFee
} = require('../controllers/financeController');

const router = express.Router();

router.route('/fees')
  .get(getFees)
  .post(createFee);

router.route('/fees/:id')
  .get(getFee)
  .put(updateFee)
  .delete(deleteFee);

module.exports = router;
