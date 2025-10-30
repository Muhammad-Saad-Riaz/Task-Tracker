import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { fetchTasks,updateTaskStatus } from "../../api/tasksAPI";
import React from "react";

const TaskList = () => {
    const queryClient = useQueryClient();
    const {
        data:tasks,
        isLoading,
        isError,
        error
    }=useQuery({
        queryKey:['tasks'],
        queryFn:fetchTasks,
        refetchOnMount: false
    })

    // Mutation hook for updating task status
    const updateMutation = useMutation({
        mutationFn: updateTaskStatus,
        
        onMutate: async ({ id, completed }) => {
            // Cancel running fetches to prevent race conditions
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            // Snapshot the previous state (for rollback if API fails)
            const previousTasks = queryClient.getQueryData(['tasks']);

            // Manually update the cache (Optimistic Update)
            queryClient.setQueryData(['tasks'], (oldTasks) => {
                return oldTasks.map(task => 
                    task.id === id ? { ...task, completed: completed } : task
                );
            });

            return { previousTasks };
        },
        
        // If the API fails, roll back the cache to the snapshot
        onError: (err, variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(['tasks'], context.previousTasks);
            }
            alert(`Update failed: ${err.message}. Rolling back.`);
        }
    });

    const handleStatusChange = (task) => {
        updateMutation.mutate({
            id: task.id,
            completed: !task.completed // Send the toggled status
        });
    };

    if (isLoading) return <h2>Tasks are Loading...</h2>
    if (isError) return <div className="text-red-600">{error.message}</div>
    return (
        <div className="space-y-2 mt-6 text-l max-w-4xl mx-auto">
            {tasks.map(task=>(
                <div
                key={task.id}
                className="flex"
                >
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={()=>handleStatusChange(task)}
                        className="mr-5"
                    />
                    <div className={`${task.completed? "line-through text-gray-300":""}`}>{task.title}</div>
                </div>
            ))}
        </div>
    )
}

export default TaskList
