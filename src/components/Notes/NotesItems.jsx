import moment from "moment";
import { MdRemoveRedEye } from "react-icons/md";
import { truncateText } from "../../utils/truncateText";
import { IconButton, Tooltip } from "@mui/material";


const NotesItems = ({ parsedContent, id, createdAt }) => {

  const formattedDate = moment(createdAt).format("D MMMM YYYY");

  return (
    <div className='sm:px-5 px-2 py-5 shadow-md bg-yellow-100 shadow-white rounded-lg min-h-96 max-h-96 relative overflow-hidden'>

      <p className="text-black font-semibold ql-editor"
        dangerouslySetInnerHTML={{ __html: truncateText(parsedContent) }}
      ></p>

      <div className='flex justify-between items-center  absolute bottom-5 sm:px-5 px-2 left-0 w-full text-slate-700'>
        <span className='font-semibold'>{formattedDate}</span>
        <IconButton>
          <MdRemoveRedEye className='text-slate-700 disabled:' />
        </IconButton>
      </div>

    </div>
  )
}

export default NotesItems