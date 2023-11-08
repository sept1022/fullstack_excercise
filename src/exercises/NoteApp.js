import { useEffect, useState } from 'react';
import Note from './components/Note';
import noteService from './services/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

// const initialNotes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

const NoteApp = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('effect');
    // axios.get('http://localhost:3001/notes')
    noteService.getAll()
    .then((data) => {
      console.log('promise fulfilled');
      console.log(data);
      setNotes(data);
    });
    console.log('render', notes.length, 'notes');
  }, []);

	if(notes === null) {
		return;
	}

	const noteToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (e) => {
    e.preventDefault();
    console.log(e.target);
    const obj = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    };
    // setNotes(notes.concat(obj))

    // axios.post('http://localhost:3001/notes', obj)
    noteService.create(obj)
    .then((response) => {
      // console.log(response)
      setNotes(notes.concat(response));
      setNewNote('');
    });
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const handleToggleImportance = (id) => {
    // console.log(id)

    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id);
    const changedNote = {...note, important: !note.important};

    // axios.put(url, changedNote)
    noteService.update(id, changedNote)
    .then(response => {
      // console.log(response)
      setNotes(notes.map(note => note.id !== id ? note : response));
    })
    .catch(error => {
      setErrorMessage(`this note ${note.content} was already deleted from server`);
      setTimeout(()=> {setErrorMessage(null);}, 3000);
      setNotes(notes.filter(note => note.id !== id));
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification className="error" message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => handleToggleImportance(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default NoteApp;
