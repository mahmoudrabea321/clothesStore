import Coupon from '../model/coupon,model.js';

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({ userId: req.user._id });
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.query;
        const coupon = await Coupon.findOne({ code, userId: req.user._id });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        if (coupon.expirationDate < Date.now()) {
            return res.status(400).json({ message: "Coupon has expired" });
        }
        if (!coupon.isActive) {
            return res.status(400).json({ message: "Coupon is inactive" });
        }
        res.json({ isValid: true, discountPrecentage: coupon.discountPrecentage });
    } catch (error) {
     res.status(500).json({ message: error.message });   
    };
};