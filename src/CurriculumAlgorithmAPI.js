const options = {
    host: 'http://localhost:8000/',
    googleClientId: '286387389215-uaqms2i06mu0idgrr4qvj1ncsfhj2m9m.apps.googleusercontent.com',
    googleClientSecret: 'Vkacy2yaL9jjW_Vs6oxDSGpt',
};

export const viewStudentPlan = (studentPlanID, token) => {
    const headers = new Headers();
    return token.then(token=>{
        headers.set('Authorization', 'Bearer ' + token['access_token']);
        return fetch(`${options.host}ca/view_student_plan/${studentPlanID}`, {headers: headers})
            .then(res => res.json())
            .then((data) => {
                return Promise.resolve(data);
            })
            .catch(console.log)
    });

};

export const accommodateRemainingCourses = studentPlanID => {
    return fetch(`${options.host}ca/accommodate_remaining_courses/${studentPlanID}`)
        .then(res => res.json())
        .then((data) => {
            return Promise.resolve(data);
        })
        .catch(console.log)
};

export const convertToken = token => {
    let data = new FormData();
    data.append('grant_type', 'convert_token');
    data.append('client_id', options.googleClientId );
    data.append('client_secret', options.googleClientSecret );
    data.append('backend', 'google-oauth2');
    data.append('token', token);

    return fetch(`${options.host}auth/convert-token/`, {method: 'post', body: data})
        .then(res => res.json())
        .then((data) => {
            return Promise.resolve(data);
        })
        .catch(console.log)
};

export const transferCourse = (data, token) => {
    const headers = new Headers();
    return token.then(token=> {
        headers.set('Authorization', 'Bearer ' + token['access_token']);
        return fetch(`${options.host}ca/transfer_course/`,
            {method: 'post', body: data, headers: headers})
            .catch(console.log);
    });
};

export const getUserInfo = (token) => {
    const headers = new Headers();
    return token.then(token=> {
        headers.set('Authorization', 'Bearer ' + token['access_token']);
        return fetch(`${options.host}ca/get_user_info/`,
            {method: 'get', headers: headers}).then(res => res.json()).then((data) => {
                return Promise.resolve(data);
        })
            .catch(console.log);
    });
};