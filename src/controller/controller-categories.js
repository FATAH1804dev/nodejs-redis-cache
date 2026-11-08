import serviceCategories from "../services/service-categories.js";

const getAll = async (req, res, next) => {
  try {
    const result = await serviceCategories.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  getAll,
};
