import "./../output.css";
import { FeedInterface } from "./../utils/interface/app.interface";

export default function Feed({ post }: FeedInterface) {
  return (
    <div className="flex flex-col mb-12 items-center gap-3 py-12 cursor-pointer border-4 rounded">
      <span className="text-4xl italic font-bold">{post.title}</span>
      <span>body: {post.body}</span>
    </div>
  );
}
