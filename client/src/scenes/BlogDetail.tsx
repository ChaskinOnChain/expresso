import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarDiscover from "../components/NavbarDiscover";
import Tag from "../components/Tag";
import { BlogReturn } from "../types/types";
import { arrayBufferToBase64ImgSrc, convertDate } from "../utils/utils";
import { Formik, Field, Form } from "formik";
import LoadingSpinner from "../components/LoadingSpinner";

const API_URL_BLOGS = "http://localhost:3000/blogs/";
function BlogDetail() {
  const user = useSelector((state) => state.app.user);

  const { id } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState<BlogReturn | null>(null);
  const [loading, setLoading] = useState(false);

  async function getBlog() {
    try {
      setLoading(true);
      const res = await axios(`${API_URL_BLOGS}${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBlogData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlog();
  }, [id, user]);

  const handleSubmitComment = async (values, { resetForm }) => {
    try {
      const res = await axios.post(`${API_URL_BLOGS}${id}`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = res.data;
      console.log(data);

      resetForm({});

      getBlog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarDiscover />
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        blogData && (
          <div className="px-8">
            <ul className="flex gap-2">
              <li>
                <Tag name={blogData.tags[0]} />
              </li>
              <li>
                <Tag name={blogData.tags[1]} />
              </li>
              <li>
                <Tag name={blogData.tags[2]} />
              </li>
            </ul>
            <h1 className="mt-2 font-bold text-3xl">{blogData.title}</h1>
            <div className="h-[1px] w-full bg-black my-4"></div>
            <img
              className="max-h-[400px] w-full"
              src={arrayBufferToBase64ImgSrc(blogData.img.data)}
              alt=""
            />
            <div className="py-4 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="absolute top-[-2px] left-[-2px] h-[52px] w-[52px] bg-black rounded-full -z-10 hover:shadow-2xl"></div>
                  <img
                    className="h-12 w-12 rounded-full cursor-pointer"
                    src={arrayBufferToBase64ImgSrc(blogData.author.img.data)}
                    alt="Profile"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{blogData.author.username}</h4>
                  <h4>{blogData.author.email}</h4>
                </div>
              </div>
              <div>
                <h4></h4>
                <div className="">{convertDate(blogData.date)}</div>
              </div>
            </div>
            <div className="flex gap-5 mt-6">
              <div className="h-32 bg-black w-[25%] text-white">
                Placeholder for Eth Stuff
                {blogData.author.ethereum_address}
              </div>
              <pre
                style={{ whiteSpace: "pre-wrap" }}
                className="w-[70%] break-keep overflow-auto font-sans"
              >
                {blogData.content}
              </pre>
            </div>
            <div className="h-[1px] w-full bg-black my-8"></div>
            <div className="mx-32 w-full flex justify-center">
              <div>
                <h2 className="font-bold text-xl mb-6">
                  {blogData.comments.length} Comment
                  {blogData.comments.length === 1 ? "" : "s"}
                </h2>
                <div className="flex gap-4 w-full">
                  <div className="relative">
                    <div className="absolute top-[-2px] left-[-2px] h-[52px] w-[52px] bg-black rounded-full -z-10 hover:shadow-2xl"></div>
                    <img
                      className="h-12 w-12 rounded-full cursor-pointer"
                      src={arrayBufferToBase64ImgSrc(user.img.data)}
                      alt="Profile"
                    />
                  </div>
                  <Formik
                    initialValues={{ comment: "" }}
                    onSubmit={handleSubmitComment}
                  >
                    {({ handleSubmit }) => (
                      <Form>
                        <Field
                          as="textarea"
                          name="comment"
                          placeholder="Write a comment..."
                          className="border rounded-md p-2 resize"
                          style={{ height: "150px", width: "700px" }}
                          onKeyDown={(event: any) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              handleSubmit();
                            }
                          }}
                        />
                      </Form>
                    )}
                  </Formik>
                </div>
                {blogData.comments &&
                  blogData.comments.map((comment, index) => {
                    return (
                      <div key={index} className="mt-6 flex gap-4">
                        <div className="relative">
                          <div className="absolute top-[-2px] left-[-2px] h-[52px] w-[52px] bg-black rounded-full -z-10 hover:shadow-2xl"></div>
                          <img
                            className="h-12 w-12 rounded-full cursor-pointer"
                            src={arrayBufferToBase64ImgSrc(
                              comment.user.img.data
                            )}
                            alt="Profile"
                          />
                        </div>
                        <div className="w-[80%]">
                          <h2 className="font-bold mb-2">
                            {comment.user.username}
                          </h2>
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default BlogDetail;
