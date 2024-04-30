var express = require("express");
const { setResponse } = require("../../helpers/response.helper");
const { CREATE_ADMIN, LOGIN_ADMIN, UPDATE_BY_ID } = require("./service");
var router = express.Router();

// auth

router.post("/signup", async (req, res) => {
  try {
    const response = await CREATE_ADMIN(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await LOGIN_ADMIN(req);
    setResponse(res, response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const response = await UPDATE_BY_ID(req);
    res.send(response);
  } catch (error) {
    console.log(error);
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.patch(
  "/update/password/:id",

  async (req, res) => {
    try {
      const response = await UPDATE_BY_ID(req);
      res.send(response);
    } catch (error) {
      console.log(error);
      setResponse(res, { type: "Error", data: error.stack });
    }
  }
);

module.exports = router;
