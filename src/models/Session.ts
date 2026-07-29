import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  role: string;
  content: string;
}

export interface ISession extends Document {
  userId: string;
  currentFlow?: string;
  currentTopic?: string;
  courseName?: string;
  currentModuleIndex?: number;
  lastInteraction: Date;
  messages: IMessage[];
}

const SessionSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  currentFlow: { type: String },
  currentTopic: { type: String },
  courseName: { type: String },
  currentModuleIndex: { type: Number, default: 0 },
  lastInteraction: { type: Date, default: Date.now },
  messages: {
    type: [{ role: String, content: String }],
    default: [],
  },
});

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
