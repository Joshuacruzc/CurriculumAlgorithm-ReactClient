import Semester from "./Semester";
import React from "react";
import {accommodateRemainingCourses} from "./CurriculumAlgorithmAPI";

const getContextStyle = () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignContent:'flex-start',
    justifyContent: 'space-between',
    overflow: 'auto',
    width: '50%'
});


export default class ContentArea extends React.Component {
    semesters;
    studentPlanID;
    constructor(props){
        super(props);
        this.buildPlan = this.buildPlan.bind(this);
    }

    buildPlan(){
        accommodateRemainingCourses(this.props.studentPlanID);
    }
    render() {
        if (this.props.semesters) {
            return (
                <div style={getContextStyle()}>
                    {Object.keys(this.props.semesters).map((semester_id, index) => (
                        <Semester key={index} semester={this.props.semesters[semester_id]}/>
                    ))}
                </div>)
        } else{
            return (
                <div style={getContextStyle()}>
                    <button onClick={this.buildPlan}>WOW</button>
                    {/*<button onClick={}>OTRO WOW</button>*/}
                </div>
            )
        }
    }
};