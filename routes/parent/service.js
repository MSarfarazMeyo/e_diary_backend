const {
  generarteToken,
  hashPassword,
  comparewPassword,
} = require("../../helpers/user");
const { PARENT_MODEL, STUDENT_MODEL } = require("../../models");

module.exports = {
  //...........................................................categories..................................................

  CREATE_ONE: async ({ body }) => {
    try {
      const reqData = body;

      if (reqData.password) {
        reqData.password = await hashPassword(reqData.password);
      }
      const user = await PARENT_MODEL.findOne({ idCard: reqData.idCard });

      if (!user) {
        const data = await PARENT_MODEL.create(reqData);
        return {
          type: "success",
          message: `Account created successfully`,
          data,
        };
      }

      return { type: "bad", message: `idCard already exist!` };
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  LOGIN: async ({ body }) => {
    try {
      const reqData = body;
      const user = await PARENT_MODEL.findOne({ idCard: reqData.idCard });

      if (!user) {
        return { type: "bad", message: `Invalid idCard` };
      }

      const isPaswordCompared = comparewPassword(
        reqData.password,
        user.password
      );

      if (!isPaswordCompared) {
        return { type: "bad", message: `password!` };
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

  LOGINTutionTeacher: async ({ body }) => {
    try {
      const reqData = body;

      const user = await PARENT_MODEL.findOne({
        "tutionTeacher.email": reqData.email,
      });

      if (!user) {
        return { type: "bad", message: `User not found with this email` };
      }

      // Find the tutionTeacher with the provided email
      const tutionTeacher = user?.tutionTeacher?.find(
        (teacher) => teacher?.email === reqData?.email
      );

      if (!tutionTeacher) {
        return {
          type: "bad",
          message: `Tution teacher not found with this email`,
        };
      }

      const students = await STUDENT_MODEL.find({ parent: user.id })
        .populate("class")
        .populate("parent");

      if (!students?.length)
        return { type: "success", message: `data found`, data: [] };

      const filteredStudents = students?.filter((child, index) =>
        tutionTeacher?.assignedChildrens?.includes(child?.id)
      );

      const account = JSON.parse(JSON.stringify(tutionTeacher));

      return {
        type: "success",
        message: `loged In successfully`,
        data: {
          user: { ...account, accessToken: generarteToken(tutionTeacher) },
          childrens: filteredStudents,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  FIND_ONE: async ({ params }) => {
    try {
      const { id } = params;
      const data = await PARENT_MODEL.findOne({ id: id });

      if (data) return { type: "success", message: `data found`, data: data };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  FIND_ALL: async () => {
    try {
      const data = await PARENT_MODEL.find({});

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

      const data = await PARENT_MODEL.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      if (data)
        return { type: "success", message: `parent update`, data: data };
      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  DELETE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const data = await PARENT_MODEL.findByIdAndDelete({ _id: id });
      return { type: "success", message: `class deleted`, data: [] };
    } catch (error) {
      throw error;
    }
  },
};
