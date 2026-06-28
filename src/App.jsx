import { useState } from 'react'
import { Trash } from 'lucide-react';

const App = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const copyTask = [...task];
    copyTask.push({ title, content })
    setTask(copyTask);
    setTitle('');
    setContent('');
  }

  const deleteNote = (idx) => {
    if (window.confirm("Delete this note?")) {
      const copyTask = [...task];
      copyTask.splice(idx, 1);
      setTask(copyTask);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white  lg:flex justify-center pt-10">
      <form onSubmit={(e) => {
        submitHandler(e)
      }} className="w-full lg:w-1/2 flex flex-col  gap-5 p-10 ">

        <h1 className='text-4xl font-bold uppercase mb-10'>Simon's Notes App</h1>
        <input type="text" placeholder="Enter title"
          className="border border-gray-600 rounded px-4 py-2 text-lg bg-transparent outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <textarea placeholder="Enter your text"
          className="border border-gray-600 rounded px-4 py-2 text-lg bg-transparent outline-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>

        <button className="bg-white px-5 py-2 active:bg-gray-400 rounded text-lg text-black" disabled={!title.trim() || !content.trim()}> Create Note</button>
      </form>

      <div className="w-full lg:border-l-4 lg:w-1/2 p-10">
        <h1 className="text-3xl font-bold text-white mb-5">Your Notes</h1>
        <div className="flex flex-wrap gap-5 overflow-auto h-full">
          {task.map((note, idx) => {
            return <div key={idx} className="flex flex-col w-50 h-52 bg-zinc-800 rounded-lg border p-4">
              <h1 className='text-2xl font-bold break-words underline capitalize'>{note.title}</h1>
              <p className='flex-1 mt-3 overflow-y-auto break-words leading-tight'>{note.content}</p>
              <button className='cursor-pointer active:scale-95' onClick={() => {
                deleteNote(idx);
              }}><Trash size={16} /></button>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App