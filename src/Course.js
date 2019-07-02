import React from 'react'
import {Draggable} from "react-beautiful-dnd";


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `${grid}px`,
    borderRadius: 17,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});


export default class Course extends React.Component{
    course;
    index;
    render(){
        return (
            <Draggable key={this.props.course.id} draggableId={this.props.course.id} index={this.props.index}>
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
                        {this.props.course.course.course_number}
                    </div>
                )}
            </Draggable>
        )
    }

}