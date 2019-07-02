import React from 'react';
import {Draggable, Droppable} from "react-beautiful-dnd";
import Course from "./Course";

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

export default class Semester extends React.Component {
    semester;
    render() {
        return (
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

            )
    }
}