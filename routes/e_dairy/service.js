const sendEmail = require("../../helpers/emailSender");
const { E_DAIRY_MODEL, PARENT_MODEL, ADMIN_MODEL } = require("../../models");

module.exports = {
  //...........................................................categories..................................................

  CREATE_ONE: async ({ body }) => {
    try {
      const eDiary = await E_DAIRY_MODEL.create(body);

      const parents = await PARENT_MODEL.find({}, "email").lean();
      const admins = await ADMIN_MODEL.find({}, "email").lean();

      let parentEmails = [];
      let adminEmails = [];

      if (parents) {
        parentEmails = parents
          ?.filter((parent) => parent?.email) // Skip if no email
          .map((parent) => parent?.email);
      }

      if (admins?.length) {
        adminEmails = admins
          .filter((admin) => admin?.email) // Skip if no email
          .map((admin) => admin?.email);
      }

      const allEmails = [...parentEmails, ...adminEmails];

      // Send email to all recipients if there are any emails
      if (allEmails.length > 0) {
        await sendEmail(allEmails);
      }

      return {
        type: "success",
        message: `data created successfully`,
        data: eDiary,
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
