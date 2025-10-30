import React from 'react'
import { useForm } from 'react-hook-form'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../api/tasksAPI';

const TaskForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState:{errors,isSubmitting}
  } = useForm();

  const{
    mutate,
    isPending,
    isSuccess,
  }=useMutation({
    mutationFn: createTask,

    onMutate:async (newTask)=>{
        await queryClient.cancelQueries({queryKey:['tasks']})

        const fakeId=Date.now();
        const temporaryTask={...newTask,id:fakeId,completed:false}

        queryClient.setQueryData(['tasks'],(oldTasks)=>{
          return oldTasks? [temporaryTask,...oldTasks]:[temporaryTask];
        })

        return {temporaryTask}
    },
    onSuccess:()=>{
      reset();
      navigate('/');
    }
  });

  const onSubmitHandler=(data)=>{
    mutate({title:data.title})
  }

  return (
    <div className='space-y-2 mt-16 text-l max-w-2xl mx-auto'>
      <form className='flex flex-col justify-center gap-3' action="" onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="text"
          className='p-3 text-lg bg-gray-200 rounded-lg' 
          placeholder='Enter Title' 
          {...register("title",{required:true})}
          disabled={isPending} />

        <button className=' rounded-lg bg-gray-900 text-white p-2 hover:bg-gray-800' type="submit" disabled={isPending}>
          {isPending? 'Adding Tasks...':'Add Task'}
        </button>

      </form>
    </div>
  )
}

export default TaskForm
