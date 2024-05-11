const {
  generarteToken,
  hashPassword,
  comparewPassword,
} = require("../../helpers/user");
const { TEACHER_MODEL } = require("../../models");

module.exports = {
  //...........................................................categories..................................................

  CREATE_ONE: async ({ body }) => {
    try {
      const reqData = body;

      if (reqData.password) {
        reqData.password = await hashPassword(reqData.password);
      }
      const user = await TEACHER_MODEL.findOne({ email: reqData.email });

      if (!user) {
        const data = await TEACHER_MODEL.create(reqData);
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
      const user = await TEACHER_MODEL.findOne({
        email: reqData.email,
      }).populate("assigned.class");

      if (!user) {
        return { type: "bad", message: `Invalid email or password!` };
      }

      const isPaswordCompared = comparewPassword(
        reqData.password,
        user.password
      );

      if (!isPaswordCompared) {
        return { type: "bad", message: `Invalid email or password!` };
      }

      user.password = undefined;
      const account = JSON.parse(JSON.stringify(user));

      return {
        type: "success",
        message: `loged In successfully`,
        data: { ...account, accessToken: generarteToken(user) },
      };
    } catch (error) {
      throw error;
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const data = await TEACHER_MODEL.findOne({ _id: id }).populate(
        "assigned.class"
      );

      if (data) return { type: "success", message: `data found`, data: data };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  FIND_ALL: async () => {
    try {
      const data = await TEACHER_MODEL.find({}).populate("assigned.class");

      if (data.length >= 1)
        return { type: "success", message: `data found`, data: data };

      return { type: "bad", message: `No Data Available`, data: [] };
    } catch (error) {
      throw error;
    }
  },

  UPDATE_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;
      if (body?.password) {
        body.password = await hashPassword(body?.password);
      }
      const data = await TEACHER_MODEL.findOneAndUpdate({ _id: id }, body, {
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
      const data = await TEACHER_MODEL.findByIdAndDelete({ _id: id });
      return { type: "success", message: `teacher deleted`, data: [] };
    } catch (error) {
      throw error;
    }
  },
};
