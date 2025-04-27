import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import Editor from "../components/Editor";
import { Button } from "../components/Button";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const contentRef = useRef("");
  const navigate = useNavigate();
  
  // Memoized content update function 
  const handleContentChange = useCallback((newContent:any) => {
    contentRef.current = newContent;
  }, []);

  const addBlog = async () => {
    const d = new Date()
    const time = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blog`, {
      title,
      content: contentRef.current,
      createdAt : time
    },{
        headers :{
            Authorization: localStorage.getItem('token')
        }
    });

    navigate(`/blog/${response.data.id}`)
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />

          <div className="mt-2">
            <div className="w-full mb-4">
              <div className="flex items-center justify-between">
                <div className="my-2 bg-white rounded-b-lg w-full">
                  <Editor
                    content={contentRef.current}
                    setContent={handleContentChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="button" onClick={addBlog} className={`mt-5 w-xl  text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2   ${status?"cursor-not-allowed opacity-50":"cursor-pointer"}} ` }  >Publish</button>

        </div>
      </div>
    </div>
  );
};