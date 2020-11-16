"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var express_1 = require("express");
var ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var profileRouter = express_1.Router();
var profileController = new ProfileController_1.default();
profileRouter.use(ensureAuthenticated_1.default);
profileRouter.put('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required(),
        old_password: celebrate_1.Joi.string(),
        password: celebrate_1.Joi.string(),
        password_confirmation: celebrate_1.Joi.string().required().valid(celebrate_1.Joi.ref('password'))
    },
    _a)), profileController.update);
profileRouter.get('/', profileController.show);
exports.default = profileRouter;
