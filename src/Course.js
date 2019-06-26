import React from 'react'
import styled from 'styled-components'
import {Draggable} from "react-beautiful-dnd";
const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
 `;
export default class Course extends React.Component{
    render(){
        return <h1>Hello World</h1>
    }
    //     return<Draggable key= {course.id} draggableId={item.id} index={index}><Container>{this.props.course}</Container></Draggable>
    // }
}