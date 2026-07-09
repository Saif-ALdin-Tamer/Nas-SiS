const Fee = require('../models/Fee');
const ApiError = require('../utils/apiError');

exports.createFee = async (req, res, next) => {
    try {
        const fee = await Fee.create(req.body);
        res.status(201).json({ success: true, data: fee });
    } catch (error) {
    next(new ApiError(400, error.message));
    }
};

exports.getFees = async (req, res, next) => {
    try {
        const fees = await Fee.find().populate('studentId');
        res.status(200).json({ success: true, count: fees.length, data: fees });
    } catch (error) {
    next(new ApiError(400, error.message));
    }
};

exports.getFee = async (req, res, next) => {
    try {
        const fee = await Fee.findById(req.params.id).populate('studentId');
        if (!fee) return next(new ApiError(404, 'Fee not found'));
            res.status(200).json({ success: true, data: fee });
    } catch (error) {
    next(new ApiError(400, error.message));
    }
};

exports.updateFee = async (req, res, next) => {
    try {
        const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!fee) return next(new ApiError(404, 'Fee not found'));
    res.status(200).json({ success: true, data: fee });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
};

exports.deleteFee = async (req, res, next) => {
    try {
        const fee = await Fee.findByIdAndDelete(req.params.id);
        if (!fee) return next(new ApiError(404, 'Fee not found'));
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
            next(new ApiError(400, error.message));
    }
};
