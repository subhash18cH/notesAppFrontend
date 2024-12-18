import { Link } from "react-router-dom"
import Errors from "../Errors"
import { FiFilePlus } from "react-icons/fi"
import NotesItems from "./NotesItems"
import api from "../../services/Api"
import { useEffect, useState } from "react"
const AllNotes = () => {

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const response = await api.get("/notes");
      const parsedNotes = response.data.map((note) => ({
        ...note,
        parsedContent: JSON.parse(note.content).content
      }))
      setNotes(parsedNotes);
    } catch (error) {
      setError(error.response.data.message)
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    <Errors message={error} />
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  return (
    <div className="min-h-[calc(100vh-74px)] sm:py-10 sm:px-5 px-0 py-4">
      <div className="w-[92%] mx-auto ">

        {!loading && notes && notes.length > 0 && (
          <h1 className='text-slate-800 text-2xl sm:text-4xl font-semibold'>My Notes</h1>
        )}

        {loading ? (
          <div className='flex flex-col justify-center items-center h-72'>
            <span>Please wait...</span>
          </div>
        ) : (
          <>
            {notes && notes?.length === 0 ? (
              <div className='flex flex-col items-center justify-center min-h-96 p-4'>
                <div className='text-center'>
                  <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                    You didn't create any note yet
                  </h2>

                  <p className='text-gray-600 mb-6'>Start by creating a new note to keep track of your thoughts.</p>

                </div>

                <div className='flex justify-center w-full'>
                  <Link to="/create-note">
                    <button className='flex items-center px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus-ring-blue-200'>
                      <FiFilePlus className='mr-2' size={24} />
                      Create New Note
                    </button>
                  </Link>
                </div>

              </div>
            ) : (
              <>
                <div className='grid pt-10  xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-5 justify-center'>
                  {notes.map((item) => (
                    <NotesItems key={item.id} {...item} id={item.id} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AllNotes