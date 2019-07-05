import {Droppable} from "react-beautiful-dnd";
import Course from "./Course";
import React from  'react';
const grid = 8;

const getListStyle = isDraggingOver => ({
    background: 'transparent',
    display: 'flex',
    padding: grid,
    flexWrap:'wrap',
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
});

export default class MenuArea extends React.Component {
    remainingCourses;
    show;
    render() {
        if (this.props.remainingCourses && this.props.show) {
            return (
                <div className="menuArea">
                    <h2 style={{color: 'white', textAlign: 'center'}}>Remaining Courses</h2>
                    <Droppable droppableId={"menuArea"} direction="vertical">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.props.remainingCourses.map((course, index) => (
                                    <Course course={course} key={index} index={index}/>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )
        } else {
            return null
        }
    }
};