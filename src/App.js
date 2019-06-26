import React from 'react';
import logo from './logo.svg';
import './App.css';
import initialData from './initial-data'
import Semester from './Semester'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});
class App extends React.Component{
    state = {
        semesters: {},
    };
    componentDidMount() {
        fetch('http://127.0.0.1:8000/ca/view_semester/72/')
            .then(res => res.json())
            .then((data) => {
                data.map((semester) => {
                    let prevState = this.state.semesters;
                    prevState[semester['id']] = semester;
                    this.setState({ semesters: prevState}
                    )})

            })
            .catch(console.log)
    }
    onDragEnd = result => {
        let data = new FormData();
        data.append('course_id', result['draggableId']);
        data.append('source_semester', result["source"]["droppableId"]);
        data.append('new_semester', result["destination"]["droppableId"]);
        fetch(`http://127.0.0.1:8000/ca/remove_course/` ,
            {method: 'post', body: data})
            .then(res => res.json())
            .then((data) => {
                data.map((semester) => {
                    let prevState = this.state.semesters;
                    prevState[semester['id']] = semester;
                    this.setState({ semesters: prevState}
                    )})
            })
            .catch(console.log)
    };
    render() {
        if (Object.keys(this.state.semesters).length > 0){
            return (
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(this.state.semesters).map((semester_id, index) => (
                    <Droppable droppableId={"" + semester_id} direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.state.semesters[semester_id].curriculum_courses.map((course, index) => (
                                    <Draggable key={course.id} draggableId={course.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                {course.course.course_number}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    ))}
                </DragDropContext>


            );
        } else{
            return (<h1>did not work</h1>);
        }
    }
}

export default App;
