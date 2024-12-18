import toast from "react-hot-toast"
import { MdNoteAlt } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import Buttons from "../../utils/Buttons"
import api from "../../services/Api"
import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
const CrreateNote = () => {

  const navigate = useNavigate()
  const [editorContent, setEditorContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (content) => {
    setEditorContent(content)
  }

  const handleSubmit = async () => {
    if (editorContent.trim().length === 0) {
      return toast.error("Note content is required")
    }
    try {
      setLoading(true);
      const noteData = { content: editorContent }
      await api.post("/notes", noteData)
      toast.success("Note created successfully")
      navigate("/notes")
    } catch (error) {
      toast.error("Error creating note")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-10'>

      <div className='flex justify-center items-center text-2xl font-semibold gap-1 pb-8'>
        <h1 className='text-2xl font-semibold text-slate-800'>Create new Note</h1>
        <MdNoteAlt className='text-4xl text-slate-700' />
      </div>

      <div className='h-72 mb-28 lg:mb-14 sm:mb-20'>
        <ReactQuill className='h-full' value={editorContent} onChange={handleChange}
          modules={
            {
              toolbar: [
                [
                  {
                    header: [1, 2, 3, 4, 5, 6]
                  }
                ],
                [
                  { size: [] }
                ],
                [
                  "bold", "italic", "underline", "strike", "blockquote"
                ],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                [
                  "clean"
                ]
              ]
            }
          } />
      </div>
      <Buttons disabled={loading} onClickHandler={handleSubmit}
        className="bg-red-600 text-white px-4 py-2 rounded-sm hover:text-slate-300">
        {loading ? <span>Loading.....</span> : "create note"}
      </Buttons>
    </div>
  )
}

export default CrreateNote