import { Fragment, useEffect, useState } from 'react'

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + 1
}

function getMaxIndex(arr) {
  return arr.indexOf(Math.max(...arr))
}

const AnecdotesApp = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [votes, setVotes] = useState(
    Object.assign(
      {},
      anecdotes.map((item, index) => (index, 0))
    )
  )
  const [selected, setSelected] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  useEffect(() => {
    setMaxIndex(getMaxIndex(Object.values(votes)))
  }, [votes])

  return (
    <Fragment>
      <h3>Anecdote of The Day</h3>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button
          onClick={() => {
            setVotes({ ...votes, [selected]: votes[selected] + 1 })
            console.log(votes)
          }}
        >
          vote
        </button>
        <button
          onClick={() => {
            const next = randInt(0, anecdotes.length - 1)
            setSelected(next)
            console.log(next)
          }}
        >
          next anecdote
        </button>
      </div>
      <div>
        <h3>Anecdote with most votes</h3>
        <div>{anecdotes[maxIndex]}</div>
        <div>has {votes[maxIndex]} votes</div>
      </div>
    </Fragment>
  )
}

export default AnecdotesApp
