const { CLASSES_MODEL } = require("../../models");

module.exports = {
  //...........................................................categories..................................................

  CREATE_ONE: async ({ body }) => {
    try {
      const reqData = body;

      const classExist = await CLASSES_MODEL.findOne({ name: reqData.name });

      if (classExist) {
        return { type: "bad", message: `Class with this name already exist!` };
      }

      const data = await CLASSES_MODEL.create(reqData);
      return {
        type: "success",
        message: `data created successfully`,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const data = await CLASSES_MODEL.findOne({ _id: id }).populate(
        "incharge"
      );

      if (data) return { type: "success", message: `data found`, data: data };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  FIND_ALL: async (params) => {
    try {
      const data = await CLASSES_MODEL.find({}).populate("incharge");
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
      const data = await CLASSES_MODEL.findOneAndUpdate({ _id: id }, body, {
        new: true,
      }).populate("incharge");
      if (!data) return { type: "bad", message: `No Data Available` };

      return { type: "success", message: `class update`, data: data };
    } catch (error) {
      console.log("err", error);

      throw error;
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const data = await CLASSES_MODEL.findByIdAndDelete({ _id: id });
      return { type: "success", message: `class deleted`, data: [] };
    } catch (error) {
      throw error;
    }
  },
};
