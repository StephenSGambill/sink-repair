//variable which hold object for temporary state
const applicationState = {
    requests: [],
    plumbers: [],
    completions: []

}




const API = "http://localhost:8088"



export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                applicationState.requests = serviceRequests
            }
        )
}
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
    .then(response => response.json())
    .then(
        (plumberInfo) => {
            applicationState.plumbers = plumberInfo
        }
    )
}
export const fetchCompletions= () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (completionInfo) => {
            applicationState.completions = completionInfo
        }
    )
}




export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}
export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}





export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {

        })
}


export const saveCompletion = (completion) => {
    const fetchCompletion = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }
    return fetch(`${API}/completions`, fetchCompletion)
        .then(response => response.json())
        .then(() => {

        })
}


export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, {method: "DELETE"})
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}