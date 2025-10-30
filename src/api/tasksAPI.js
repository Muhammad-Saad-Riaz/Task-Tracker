const BASE_URL='https://jsonplaceholder.typicode.com/todos';

 export const fetchTasks= async ()=>{
    const response= await fetch(BASE_URL);
    if(!response.ok){
        throw new Error("Failed to fetch tasks");
    } 
    const data=await response.json();

    return data.slice(0,10);
};

export const createTask=async(newTask)=>{
    const response=await fetch(BASE_URL,{
        method:"POST",
        body:JSON.stringify(newTask),
        headers:{'Content-Type':'application/json'},
    })
    if(!response.ok){
        throw new Error("Failed to create new task")
    }
    return response.json();
}

export const updateTaskStatus = async ({ id, completed }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH', // Use PATCH for partial updates
        body: JSON.stringify({ completed: completed }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (!res.ok) {
        throw new Error("Failed to update task");
    }
    return res.json();
};