import React from "react";
import {DragDropContext} from "react-beautiful-dnd";
import MenuArea from "./MenuArea";
import ContentArea from "./ContentArea";
import {transferCourse, viewStudentPlan} from "./CurriculumAlgorithmAPI";
import NavigationBar from "./NavigationBar";

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

class MainPage extends React.Component{
    user;
    constructor(props){
        super(props);
        this.state = {
            semesters: {},
            menuArea: {
                remaining_courses: [],
            },
            showMenu: true,
        };
        this.toggleShowMenu = this.toggleShowMenu.bind(this);
        this.updatePlan = this.updatePlan.bind(this);

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
            transferCourse(data, this.props.user.accessToken);
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
    toggleShowMenu() {
        this.setState({showMenu: !this.state.showMenu})
    }
    updatePlan(){
        if(this.state.semesters) {
            viewStudentPlan(1, this.props.user.accessToken).then((data) => {
                let prevState = this.state.semesters;
                data['semester_set'].map((semester) => {
                    prevState[semester['id']] = semester;
                });
                this.setState({semesters: prevState});
                prevState = this.state.menuArea;
                prevState['remaining_courses'] = data['remaining_courses'];
                this.setState({menuArea: prevState});
            })
        }
    }
    componentDidMount() {
        this.updatePlan();
    }
    getPlanStyle = () => ({
        margin: 'auto',
        display: 'flex',
        justifyContent: this.state.showMenu ? 'space-between':'space-evenly',

    });

    render() {
        return (
            <div>
                <NavigationBar user={this.props.user} onClick={this.toggleShowMenu}/>
                <div className="planContainer" style={this.getPlanStyle()}>
                    <DragDropContext className="semesterArea" onDragEnd={this.onDragEnd}>
                        <ContentArea student_plan_id={1} semesters={this.state.semesters} onbuildPlan={this.componentDidMount}/>
                        <MenuArea show={this.state.showMenu} remainingCourses={this.state.menuArea.remaining_courses}/>
                    </DragDropContext>
                </div>
            </div>
        )
    }
}

export default MainPage;
