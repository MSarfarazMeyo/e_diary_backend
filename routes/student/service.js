const { generarteToken, hashPassword } = require("../../helpers/user");
const { STUDENT_MODEL } = require("../../models");

module.exports = {
  //...........................................................categories..................................................

  CREATE_ONE: async ({ body }) => {
    try {
      const reqData = body;

      if (reqData.password) {
        reqData.password = await hashPassword(reqData.password);
      }
      const user = await STUDENT_MODEL.findOne({ email: reqData.email });

      if (!user) {
        const data = await STUDENT_MODEL.create(reqData);
        return {
          type: "success",
          message: `Account created successfully`,
          data,
        };
      }

      return { type: "bad", message: `email already exist!` };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  LOGIN: async ({ body }) => {
    try {
      const reqData = body;
      const user = await STUDENT_MODEL.findOne({ email: reqData.email });

      if (!user) {
        return { type: "bad", message: `Invalid email or password!` };
      }

      const account = JSON.parse(JSON.stringify(user));

      return {
        type: "success",
        message: `Loged In successfully`,
        data: { ...account, accessToken: generarteToken(user) },
      };
    } catch (error) {
      throw error;
    }
  },
  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const data = await STUDENT_MODEL.findOne({ id: id });

      if (data) return { type: "success", message: `data found`, data: data };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  FIND_ALL: async (req) => {
    try {
      let filter = {};
      if (req.query && req.query?.class) {
        filter.class = req.query.class;
      }

      if (req.query && req.query?.parent) {
        filter.parent = req.query.parent;
      }

      const data = await STUDENT_MODEL.find(filter)
        .populate("class")
        .populate("parent");

      if (data?.length >= 1)
        return { type: "success", message: `data found`, data: data };

      return { type: "bad", message: `No Data Available`, data: [] };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  UPDATE_BY_ID: async ({ params, body }) => {
    console.log("params", params);
    console.log("body", body);

    try {
      const { id } = params;
      const data = await STUDENT_MODEL.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      if (data) return { type: "success", message: `class update`, data: data };
      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const data = await STUDENT_MODEL.findByIdAndDelete({ _id: id });
      return { type: "success", message: `student deleted`, data: [] };
    } catch (error) {
      throw error;
    }
  },
};
