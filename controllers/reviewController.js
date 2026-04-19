const Review =require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      rider: req.user.id,
      driver: req.params.id,
      rating,
      comment,
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getDriverReviews=async(req,res)=>{
    const reviews=await Review.find({driver:req.params.id});
    res.json(reviews)
}