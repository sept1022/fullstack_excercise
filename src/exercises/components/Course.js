import {Fragment} from "react";

const Course = ({course}) => {
  return (
    <Fragment>
      <h1>{course.name}</h1>
      {course.parts.map(part =>
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      )}
      <b>
        total of {course.parts.map(part => part.exercises).reduce((acc, value) => {return acc + value})} exercises
      </b>
    </Fragment> )
}

export default Course
