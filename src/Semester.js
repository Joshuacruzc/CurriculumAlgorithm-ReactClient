import React from 'react';
import styled from 'styled-components'
import Course from './Course'
import {Droppable} from "react-beautiful-dnd";

const Container = styled.div`
    margin: 8px;
    border: 1px solid black;
    border-radius: 2px;
`;
const Title = styled.h3`
    padding: 8px`;
const CourseList = styled.div`
    padding: 8px`;
export default class Semester extends React.Component {
    render() {
        return (
            <Container>
                <Title> {this.props.semester.position}</Title>
                <Droppable droppableId={this.props.semester.id}>
                    {(provided) => (
                        <CourseList innerRef={provided.innerRef}>{this.props.courses.map(course => <Course key={course.id}
                                                                              course={course}/>)}</CourseList>
                    )}
                </Droppable>
            </Container>

            )
    }
}