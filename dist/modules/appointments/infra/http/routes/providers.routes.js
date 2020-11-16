"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ListProviderController_1 = __importDefault(require("../controllers/ListProviderController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var ProviderDayAvailabilityController_1 = __importDefault(require("../controllers/ProviderDayAvailabilityController"));
var ProviderMonthAvailabilityController_1 = __importDefault(require("../controllers/ProviderMonthAvailabilityController"));
var providerRouters = express_1.Router();
var listProviderController = new ListProviderController_1.default();
var providerDayAvailabilityController = new ProviderDayAvailabilityController_1.default();
var providerMonthAvailabilityController = new ProviderMonthAvailabilityController_1.default();
providerRouters.use(ensureAuthenticated_1.default);
providerRouters.get('/', listProviderController.index);
providerRouters.get('/:provider_id/month-availability', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required()
    },
    _a)), providerDayAvailabilityController.index);
providerRouters.get('/:provider_id/day-availability', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required()
    },
    _b)), providerMonthAvailabilityController.index);
exports.default = providerRouters;
