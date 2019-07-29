import React from 'react'
import {Draggable} from "react-beautiful-dnd";


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: '2%',
    borderRadius: 17,
    width:  '200px',
    height: 50,
    border: 'solid grey 1px',
    background: isDragging ? 'lightgreen' : 'white',
    ...draggableStyle,
    boxShadow: '2px 3px 2px #9E9E9E'
});

const getLabelStyle = (isDragging) =>({
    color: 'black',
    borderRight: 'solid black 2px',
    paddingRight: '10px',
    width: '80%',
    margin: 'auto',
    height: '65%',
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
                        <div style={{display: 'flex', height:'100%'}}>
                            <h3 style={getLabelStyle(snapshot.isDragging)}>{this.props.course.course.course_number}</h3>
                            <h3 style={{ margin: 'auto',
                            }}>{this.props.course.course.credit_hours}</h3>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }

}