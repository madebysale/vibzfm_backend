import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");
import axios from "axios";
import { admin, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
// import user from "../models/user";

// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

// const conn = require("../../config/conn").promise();

export const createadmin = async (req, res) => {
  const { email, password } = req.body;
  try {

    const admina = await admin.findOne({ where: { email, password } });

    if (!admina) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const theToken = jwt.sign({ id: admin.id }, process.env.SECRET, {
      expiresIn: "1m",
    });
    return successResponse(req, res, { theToken });
  } catch (err) {
    console.log(err);
  }
};
