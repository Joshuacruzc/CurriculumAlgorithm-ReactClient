import React from 'react';
import { Droppable} from "react-beautiful-dnd";
import Course from "./Course";

const grid = 8;
const getContainerStyle = () => ({
    width: '30%',
    margin: 30,
});

export default class Semester extends React.Component {
    semester;
    getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        order: this.props.semester.position,
        display: 'flex',
        padding: grid,
        flexWrap:'wrap',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 15,
    });

    render() {
        if(this.props.semester) {
            return (
                <div style={getContainerStyle()} className="semesterContainer">
                    <h2>Semester: {this.props.semester.position}</h2>
                    <Droppable droppableId={"" + this.props.semester.id} direction="vertical">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={this.getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.props.semester.curriculum_courses.map((course, index) => (
                                    <Course course={course} key={index} index={index}/>
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