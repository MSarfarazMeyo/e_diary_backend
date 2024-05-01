var express = require("express");
const { setResponse } = require("../../helpers/response.helper");
const { CREATE_ADMIN, LOGIN_ADMIN, UPDATE_BY_ID } = require("./service");
var router = express.Router();

// auth

router.post("/signup", async (req, res, next) => {
  try {
    const response = await CREATE_ADMIN(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const response = await LOGIN_ADMIN(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.patch("/update/:id", async (req, res, next) => {
  try {
    const response = await UPDATE_BY_ID(req);
    setResponse(res, response);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.patch(
  "/update/password/:id",

  async (req, res, next) => {
    try {
      const response = await UPDATE_BY_ID(req);
      setResponse(res, response);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
