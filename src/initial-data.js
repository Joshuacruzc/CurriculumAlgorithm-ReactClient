const initialData = {
    courses:{
        'MATE3031': {id: 1, credits: 4, pre_requisites: []},
        'MATE3032': {id: 2, credits: 4, pre_requisites: [1,]}
    },
    semesters:{
        1: {position: 'First', id:1, max_credits:16, courses:['MATE3031']},
        2: {position: 'Second', id:2, max_credits:16, courses:['MATE3032', ]},
    },
    semesterOrder: [1,2],
};
export default initialData;