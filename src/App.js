import React from 'react';
import './App.css';
import {DragDropContext} from "react-beautiful-dnd";
import Semester from "./Semester";


const getContextStyle = () => ({
    display: 'flex',
    flexWrap:'wrap',
    overflow: 'auto',
    justifyContent: 'center',
});

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

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
    getCourseList = semesterId => this.state.semesters[semesterId]['curriculum_courses'];

    onDragEnd = result => {
        const { source, destination } = result;
        const prevState = this.state.semesters;

        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            prevState[destination.droppableId].curriculum_courses = reorder(
                this.getCourseList(source.droppableId),
                source.index,
                destination.index
            );
            this.setState(prevState);
        } else {
            let data = new FormData();
            data.append('course_id', result['draggableId']);
            data.append('source_semester', result["source"]["droppableId"]);
            data.append('new_semester', result["destination"]["droppableId"]);
            fetch(`http://127.0.0.1:8000/ca/transfer_course/`,
                {method: 'post', body: data})
                .catch(console.log);
            // TODO: Use api response to assert that values in transfer are correct
            const courseTransfer = move(
                this.getCourseList(source.droppableId),
                this.getCourseList(destination.droppableId),
                source,
                destination
            );
            const newState = Object.keys(courseTransfer).map(key => {
                prevState[key].curriculum_courses = courseTransfer[key];
                return prevState;
            });
            this.setState({newState});
        }
    };
    render() {
        if (Object.keys(this.state.semesters).length > 0){
            return (
                <div className="planContainer">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div style={getContextStyle()}>
                            {Object.keys(this.state.semesters).map((semester_id, index) => (
                                    <Semester semester={this.state.semesters[semester_id]}/>
                            ))}
                        </div>
                    </DragDropContext>
                </div>

            );
        } else{
            return (<h1>Cannot connect to server.</h1>);
        }
    }
}

export default App;
