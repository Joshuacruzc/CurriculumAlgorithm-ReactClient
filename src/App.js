import React from 'react';
import './App.css';
import {DragDropContext} from "react-beautiful-dnd";
import Semester from "./Semester";
import MenuArea from "./MenuArea";


const getContextStyle = () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignContent:'flex-start',
    justifyContent: 'space-between',
    overflow: 'auto',
    width: '50%'
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
    constructor(props){
        super(props);
        this.state = {
            semesters: {},
            menuArea: {},
            showMenu: true,
        };
        this.toggleShowMenu = this.toggleShowMenu.bind(this);
    }

    getPlanStyle = () => ({
        margin: 'auto',
        display: 'flex',
        justifyContent: this.state.showMenu ? 'space-between':'space-evenly',

    });
    toggleShowMenu() {
        this.setState({showMenu: !this.state.showMenu})
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/ca/view_student_plan/2/')
            .then(res => res.json())
            .then((data) => {
                data['semester_set'].map((semester) => {
                    let prevState = this.state.semesters;
                    prevState[semester['id']] = semester;
                    this.setState({ semesters: prevState}
                    )});
                let prevState = this.state.menuArea;
                prevState['remaining_courses'] = data['remaining_courses'];
                this.setState({menuArea: prevState});
            })
            .catch(console.log)
    }

    getCourseList = droppableId => {
        if(droppableId === 'menuArea'){
            return this.state.menuArea.remaining_courses;
        } else{
            return this.state.semesters[droppableId]['curriculum_courses'];
        }
    };

    onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            let prevState;
            if (source.droppableId === 'menuArea'){
               prevState = this.state.menuArea;
               prevState.remaining_courses = reorder(
                    this.getCourseList(source.droppableId),
                    source.index,
                    destination.index
               );
            } else{
                prevState = this.state.semesters;
                prevState[destination.droppableId].curriculum_courses = reorder(
                    this.getCourseList(source.droppableId),
                    source.index,
                    destination.index
                );
            }
            this.setState(prevState);
        } else {
            let data = new FormData();
            data.append('course_id', result['draggableId']);
            if (source.droppableId !== 'menuArea') {
                data.append('source_semester', source["droppableId"]);
            }
            if(destination.droppableId !== 'menuArea') {
                data.append('new_semester', destination["droppableId"]);
            }
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
            Object.keys(courseTransfer).map(key => {
                let prevState;
                if (key === 'menuArea'){
                    prevState = this.state.menuArea;
                    prevState.remaining_courses = courseTransfer[key]
                } else {
                    prevState = this.state.semesters;
                    prevState[key].curriculum_courses = courseTransfer[key];
                }
                this.setState({prevState});
            });

        }
    };
    render() {
        if (true){
            return (
                <div>
                    <div className="navBar">
                        <h1>Semester Keeper</h1>
                        <button style={{height:'100%', marginTop: 'auto', marginBottom: 'auto', backgroundColor: 'transparent', border: 'none'}} onClick={this.toggleShowMenu}>
                            {/*<svg style={{height:'3em'}}>*/}
                            <svg height="" id="Layer_1" style={{enableBackground: 'new 0 0 32 32'}}  viewBox="0 0 32 32" width="32px" >
                                <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
                            </svg>
                            {/*</svg>*/}
                        </button>
                    </div>
                    <div className="planContainer" style={this.getPlanStyle()}>
                        <DragDropContext className="semesterArea" onDragEnd={this.onDragEnd}>
                            <div style={getContextStyle()}>
                                {Object.keys(this.state.semesters).map((semester_id, index) => (
                                        <Semester key={index} semester={this.state.semesters[semester_id]}/>
                                ))}
                            </div>
                                <MenuArea show={this.state.showMenu} remainingCourses={this.state.menuArea.remaining_courses}/>
                        </DragDropContext>
                    </div>
                </div>

            );
        } else{
            return (<h1>Cannot connect to server.</h1>);
        }
    }
}

export default App;
