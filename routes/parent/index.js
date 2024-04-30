var express = require("express");
const { setResponse } = require("../../helpers/response.helper");

const {
  CREATE_ONE,
  FIND_ONE,
  FIND_ALL,
  DELETE_BY_ID,
  UPDATE_BY_ID,
  LOGIN,
} = require("./service");
var router = express.Router();

// auth

router.post("/", async (req, res) => {
  try {
    const response = await CREATE_ONE(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await LOGIN(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await FIND_ALL(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await FIND_ONE(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const response = await UPDATE_BY_ID(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await DELETE_BY_ID(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

module.exports = router;
