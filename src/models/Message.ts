import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  userId: string;
  role: 'user' | 'model';
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  userId: { type: String, required: true },
  role: { type: String, enum: ['user', 'model'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
