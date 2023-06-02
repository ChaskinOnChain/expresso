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
import Delete from "../components/Delete";

const API_URL_BLOGS = "http://localhost:3000/blogs/";
function BlogDetail() {
  const user = useSelector((state) => state.app.user);

  const { id } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState<BlogReturn | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getBlog() {
    try {
      setIsLoading(true);
      const res = await axios(`${API_URL_BLOGS}${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBlogData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    <div className="flex flex-col flex-grow max-w-[90rem] xl:mx-auto">
      <NavbarDiscover />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        blogData && (
          <div className="px-8 min-h-full flex flex-col flex-grow">
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
            <div className="relative">
              <img
                className="max-h-[400px] w-full"
                src={arrayBufferToBase64ImgSrc(blogData.img.data)}
                alt=""
              />
              {user.role === "admin" && <Delete id={id} />}
            </div>
            <div className="py-4 flex items-center justify-between">
              <div className="flex gap-4">
                <img
                  className="h-12 w-12 rounded-full cursor-pointer border-4 border-black"
                  src={arrayBufferToBase64ImgSrc(blogData.author.img.data)}
                  alt="Profile"
                />

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
            <div className="md:flex-row flex flex-col gap-5 mt-6">
              <div className="h-32 bg-black md:w-[25%] text-white w-full">
                Placeholder for Eth Stuff
                {blogData.author.ethereum_address}
              </div>
              <pre
                style={{ whiteSpace: "pre-wrap" }}
                className="md:w-[70%] w-full break-keep overflow-auto font-sans"
              >
                {blogData.content}
              </pre>
            </div>
            <div className="h-[1px] w-full bg-black my-8"></div>
            <div className="w-full flex justify-center">
              <div className="md:w-[70%] w-full">
                <h2 className="font-bold text-xl mb-6">
                  {blogData.comments.length} Comment
                  {blogData.comments.length === 1 ? "" : "s"}
                </h2>
                <div className="flex gap-4 w-full">
                  <img
                    className="h-12 w-12 rounded-full cursor-pointer border-4 border-black"
                    src={arrayBufferToBase64ImgSrc(user.img.data)}
                    alt="Profile"
                  />
                  <Formik
                    initialValues={{ comment: "" }}
                    onSubmit={handleSubmitComment}
                  >
                    {({ handleSubmit }) => (
                      <Form className="w-full h-24 mb-4">
                        <Field
                          as="textarea"
                          name="comment"
                          placeholder="Write a comment..."
                          className="border rounded-md p-2 resize w-full h-24"
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
                      <div key={index} className="my-6 flex gap-4 w-full">
                        <img
                          className="h-12 w-12 rounded-full cursor-pointer border-4 border-black"
                          src={arrayBufferToBase64ImgSrc(comment.user.img.data)}
                          alt="Profile"
                        />
                        <div className="w-full relative">
                          <h2 className="font-bold mb-2">
                            {comment.user.username}
                          </h2>
                          <p>{comment.comment}</p>
                          {user.role === "admin" && <Delete id={id} />}
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
