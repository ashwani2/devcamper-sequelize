const advancedResults = (model, populate) => async (req, res, next) => {
   

  let query={}

  if(req.query.select){
    const fields = req.query.select.split(",")
    query.attributes=fields
  }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",")
      query.order=sortBy
    } else {
      query.order=['createdAt']
    }

      // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  query.offset=startIndex
  query.limit=limit

  console.log(query)

  const results=await model.findAll(query)

  console.log(results.length)


  // Pagination result
  const pagination = {};

  const total=results.length

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
    
    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };
  
    next();
  };
  
  module.exports = advancedResults;