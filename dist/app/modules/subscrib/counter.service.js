"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterService = void 0;
const counter_model_1 = require("./counter.model");
const getNextSequenceValue = (sequenceName) => __awaiter(void 0, void 0, void 0, function* () {
    let sequenceDocument = yield counter_model_1.Counter.findOne({ name: sequenceName });
    if (!sequenceDocument) {
        const initialSeq = sequenceName === "bigChannel" ? 0 : 2000000;
        sequenceDocument = new counter_model_1.Counter({ name: sequenceName, seq: initialSeq });
        yield sequenceDocument.save();
    }
    const updatedSequenceDocument = yield counter_model_1.Counter.findOneAndUpdate({ name: sequenceName }, { $inc: { seq: 1 } }, { new: true });
    return updatedSequenceDocument.seq;
});
exports.counterService = { getNextSequenceValue };
