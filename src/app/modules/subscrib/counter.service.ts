import { Counter } from "./counter.model";

const getNextSequenceValue = async (sequenceName: string) => {
  let sequenceDocument = await Counter.findOne({ name: sequenceName });

  if (!sequenceDocument) {
    const initialSeq = sequenceName === "bigChannel" ? 0 : 2000000;
    sequenceDocument = new Counter({ name: sequenceName, seq: initialSeq });
    await sequenceDocument.save();
  }

  const updatedSequenceDocument = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { seq: 1 } },
    { new: true }
  );
  return updatedSequenceDocument!.seq;
};

export const counterService = { getNextSequenceValue };
