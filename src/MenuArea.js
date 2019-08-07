import {Droppable} from "react-beautiful-dnd";
import Course from "./Course";
import React from  'react';
const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'transparent',
    // order: this.props.semester.position,
    display: 'flex',
    padding: grid,
    flexWrap:'wrap',
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
});
class RCContainer extends React.Component {
    courses;
    render (){
        return (
            <Droppable droppableId={"menuArea"} direction="vertical">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        {this.props.courses.map((course, index) => (
                            <Course course={course} key={index} index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}
export default class MenuArea extends React.Component {
    remainingCourses;
    show;
    render() {
        if (this.props.remainingCourses && this.props.show) {
            if (this.props.remainingCourses.length > 0){
                return (
                    <div className="menuArea">
                        <h2 style={{color: 'white', textAlign: 'center'}}>Remaining Courses</h2>
                        <RCContainer courses={this.props.remainingCourses}/>
                    </div>
                )
            }
            return (
                <div className="menuArea">
                    <h2 style={{color: 'white', textAlign: 'center'}}>Remaining Courses</h2>
                    <h4 style={{color: 'white', textAlign: 'center'}}> No Courses</h4>
                    <RCContainer courses={this.props.remainingCourses}/>
                </div>
            )
        } else {
            return null
        }
    }
};