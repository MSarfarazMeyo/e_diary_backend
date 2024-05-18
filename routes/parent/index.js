var express = require("express");
const { setResponse } = require("../../helpers/response.helper");

const {
  CREATE_ONE,
  FIND_ONE,
  FIND_ALL,
  DELETE_BY_ID,
  UPDATE_BY_ID,
  LOGIN,
  LOGINTutionTeacher,
} = require("./service");
var router = express.Router();

// auth

router.post("/", async (req, res, next) => {
  try {
    const response = await CREATE_ONE(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const response = await LOGIN(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.post("/tutionTeacher/login", async (req, res, next) => {
  try {
    const response = await LOGINTutionTeacher(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await FIND_ALL(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await FIND_ONE(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const response = await UPDATE_BY_ID(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await DELETE_BY_ID(req);
    setResponse(res, response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
