const Cars = require('../models/Cars')
const catchAsync = require('./../utils/catchAsync');


exports.getAllCars = catchAsync(async (req, res, next) => {
  let filter = {}
  console.log(req.query)
  if (req.query.make) {
    filter.Make = String(req.query.make)
  }
  if (req.query.model) {
    filter.Model = String(req.query.model)
  }
  if (req.query.year) {
    filter.Year = String(req.query.year)
  }

  let cars
  let results = {}
  if (req.query.limit && req.query.page) {
    let limit = parseInt(req.query.limit)
    let page = parseInt(req.query.page)
    let total = await Cars.find(filter).countDocuments();
    console.log(total)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (endIndex < total) {
      results.next_page = {
        page: parseInt(page) + 1,
        limit: limit
      }
    }
    if (startIndex > 0) {
      results.previous_page = {
        page: page - 1,
        limit: limit
      };
    }
    console.log(total, limit)
    results.total_page = Math.ceil(total / limit)
    cars = await Cars.find(filter).limit(limit).skip((page - 1) * limit).exec()
  } else {
    cars = await Cars.find(filter).exec()
  }


  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results,
    cars,
  });
});

exports.updateNotes = catchAsync(async (req, res, next) => {

  console.log(req.query)
  let update = { Notes: req.body.notes }
  if (req.query.removeNotes) {
    update = { $unset: { Notes: 1 } }

  }

  let ids = req.query.ids.split(',')
  const updatedNotes = await Cars.updateMany(
    { _id: { $in: ids } },
    update).exec()



  res.status(200).json({
    status: 'success',
    user: updatedNotes,
  });
});

