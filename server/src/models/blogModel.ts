import mongoose, { Document, Model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const commentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
});

const BlogSchema = new Schema({
  title: { type: String, required: [true, "You need a title"], max: 500 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  content: { type: String, required: [true, "You need content"], max: 1000 },
  tags: [String],
  img: Buffer,
  comments: [commentSchema],
});

BlogSchema.index({ title: "text", tags: "text" });

BlogSchema.plugin(mongoosePaginate);

interface IBlog extends Document {
  title: string;
  author: mongoose.Schema.Types.ObjectId;
  date: Date;
  content: string;
  tags: string[];
  img: Buffer;
  comments: (typeof commentSchema)[];
}

interface PaginateOptions {
  page: number;
  limit: number;
  sort: object;
}

interface IBlogModel extends Model<IBlog> {
  paginate: (query: object, options: PaginateOptions) => Promise<any>;
}

const Blog: IBlogModel = mongoose.model<IBlog, IBlogModel>("Blog", BlogSchema);

export { Blog, IBlog };
