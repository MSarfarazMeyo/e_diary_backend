const { E_DAIRY_MODEL } = require("../../models");

module.exports = {
  //...........................................................categories..................................................

  CREATE_ONE: async ({ body }) => {
    try {
      const section = await E_DAIRY_MODEL.create(body);

      return {
        type: "success",
        message: `data created successfully`,
        data: section,
      };
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const data = await E_DAIRY_MODEL.findOne({ _id: id });

      if (data) return { type: "success", message: `data found`, data: data };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  FIND_ALL: async ({ query }) => {
    try {
      const filter = {};
      if (query?.subject) {
        filter.subject = query?.subject;
      }

      if (query?.class) {
        filter.class = query?.class;
      }

      const data = await E_DAIRY_MODEL.find(filter)
        .populate("class")
        .populate("subject");

      if (data.length >= 1)
        return { type: "success", message: `data found`, data: data };

      return { type: "success", message: `No Data Available`, data: [] };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  UPDATE_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;
      delete body.id;

      const data = await E_DAIRY_MODEL.findOneAndUpdate(
        { _id: id },
        body.data,
        {
          new: true,
        }
      )
        .populate("class")
        .populate("subject");
      if (data) return { type: "success", message: ` update`, data: data };
      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      console.log("ee", error);
      throw error;
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const data = await E_DAIRY_MODEL.findByIdAndDelete({ _id: id });
      return { type: "success", message: `class deleted`, data: data };
    } catch (error) {
      console.log("delete", error);
      throw error;
    }
  },
};
