import React from 'react';
import { Droppable} from "react-beautiful-dnd";
import Course from "./Course";

const grid = 8;
const getContainerStyle = () => ({
    width: '40%',
    margin: 30,

});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    flexWrap:'wrap',
    overflow: 'auto',
});

export default class Semester extends React.Component {
    semester;
    render() {
        if(this.props.semester) {
            return (
                <div style={getContainerStyle()} className="semesterContainer">
                    <p>Semester: {this.props.semester.position}</p>
                    <Droppable droppableId={"" + this.props.semester.id} direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.props.semester.curriculum_courses.map((course, index) => (
                                    <Course course={course} index={index}/>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

            )
        } else{ return null;}
    }
}