import { getRequests, getPlumbers, saveCompletion, getCompletions} from "./dataAccess.js";
//import {getCompletions }

document.addEventListener(
    "change",
     (event) => {
        if (event.target.id === "plumbers"){
            const [requestId, plumberId] = event.target.value.split("--")
            let html = ``

            const completion = {}
        }
     }
)



//export of function that defines an array of requests to be used locally and puts them into HTML format wrapper of unordered list
export const Requests = () => {
    const requests = getRequests()
    
    let html = `
    <ul>
    ${requests.map(request => ConvertRequestToList(request)).join("")}
    </ul>
    `


    return html
}


//function that takes the array (above) and makes them unordered list items
const ConvertRequestToList = (request) =>{
    const plumbers = getPlumbers()
    const completions = getCompletions()
    
    let html = ""
    
    const foundCompletions = completions.find(completion => parseInt(completion.requestId) === request.id)

    if (foundCompletions){
            html += `
            <div class="request-box">
            
            <li class="completedRequestsBox">🛠️ ${request.description}</li>

                    <button class="request__delete"
                        id="request--${request.id}">
                        Delete
                    </button>

            </div>`
          
        }
        else {
             html += `
            <div class="request-box">
            
            <li>🛠️ ${request.description}</li>
                    
                    <select class="plumbers" id="plumbers">  
                        <option value="">Choose</option>
                        ${
                            plumbers.map(
                                plumber => {
                                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                }
                            ).join("")
                        }
                    </select>

                    <button class="request__delete"
                        id="request--${request.id}">
                        Delete
                    </button>

            </div>`
    } 
    return html           
}
    



    document.addEventListener(
        "change",
        (event) => {
            if (event.target.id === "plumbers") {
                const [requestId, plumberId] = event.target.value.split("--")
                
                /*
                    This object should have 3 properties
                       1. requestId
                       2. plumberId
                       3. date_created
                */
                       const completion = {
                        requestId: requestId,
                        plumberId: plumberId,
                        date_created: Date() 
                        }
                       
                
                /*
                    Invoke the function that performs the POST request
                    to the `completions` resource for your API. Send the
                    completion object as a parameter.
                 */
                    saveCompletion(completion)
    
            
    
            }
        }
    )
    
    