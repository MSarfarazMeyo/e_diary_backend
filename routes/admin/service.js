const { ADMIN_MODEL } = require("../../models");
const { uploadPicture } = require("../../helpers/uploadPictureMiddleware");
const { fileRemover } = require("../../helpers/fileRemover");

const {
  hashPassword,
  generarteToken,
  comparewPassword,
} = require("../../helpers/user");

const upload = uploadPicture.single("image");

module.exports = {
  //...........................................................auth..................................................
  CREATE_ADMIN: async ({ body }) => {
    try {
      const reqData = body;

      if (reqData.password) {
        reqData.password = await hashPassword(reqData.password);
      }
      const user = await ADMIN_MODEL.findOne({ email: reqData.email });

      if (!user) {
        const data = await ADMIN_MODEL.create(reqData);
        return {
          type: "success",
          message: `Account created successfully`,
          data,
        };
      }

      return { type: "bad", message: `email already exist!` };
    } catch (error) {
      throw error;
    }
  },

  LOGIN_ADMIN: async ({ body }) => {
    try {
      const reqData = body;
      const user = await ADMIN_MODEL.findOne({ email: reqData.email });

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

  UPDATE_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;

      if (body?.password) {
        body.password = await hashPassword(body?.password);
      }

      delete body.id;
      const data = await ADMIN_MODEL.findOneAndUpdate({ id: id }, body, {
        new: true,
      });

      if (data)
        return { type: "success", message: `Admin Updated`, data: data };
      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  Upload_Image: async (req, res) => {
    try {
      const uploadResolver = (req, res) => {
        return new Promise((resolve, reject) => {
          upload(req, res, (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
      };
      await uploadResolver(req, res);

      return {
        type: "success",
        message: `Image Uploaded`,
        data: req.file.filename,
      };
    } catch (error) {
      throw error;
    }
  },
};
