import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { setUpdate } from '../store/Tasks';
import { useDispatch, useSelector } from 'react-redux';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function UpdateTask({task}) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const TaskSchema = Yup.object().shape({
        title: Yup.string().required("title Name is Required").min(4, "Min length 4 chars").max(16, "Max length 16 chars"),
        description: Yup.string().required("Last Name is Required").min(4, "Min length 4 chars").max(50, "Max length 50 chars"),
        status: Yup.string().required("status is Required"),
    });

    const handleUpdateTask = async (values) => {
        if (!values.title || !values.description || !values.status) {
            alert("Error")
        }
        const body = {
            title: values.title,
            description: values.description,
            status: values.status
        }
        const data = await fetch(`${BACKEND_URL}/task/${task._id}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }
        );
        const updateTask = await data.json();
        if (updateTask) {
            dispatch(setUpdate({
                task: updateTask.task
            }));
            setIsOpen(false)
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => setIsOpen(true)}>
                <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                Edit
            </button>

            {isOpen && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">Add Task</h3>
                                            <div className="mt-2">
                                                <Formik
                                                    initialValues={{ title: task.title, description: task.description, status: task.status }}
                                                    validationSchema={TaskSchema}
                                                    onSubmit={(values) => {
                                                        handleUpdateTask(values);
                                                    }}
                                                >
                                                    {({
                                                        values,
                                                        errors,
                                                        touched,
                                                        handleChange,
                                                        handleSubmit
                                                    }) => (
                                                        <div>
                                                            <div className="flex -mx-3">
                                                                <div className="w-1/2 px-3 mb-5">
                                                                    <label className="text-xs font-semibold px-1">Title</label>
                                                                    <div className="flex">
                                                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                            {/* icon */}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                                            </svg>

                                                                        </div>
                                                                        <input
                                                                            type="text"
                                                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                                            onChange={handleChange('title')}
                                                                            value={values.title}
                                                                            placeholder="Title"
                                                                        />
                                                                    </div>
                                                                    {touched.title && errors.title && (
                                                                        <p className="text-[#ff0d10]">
                                                                            {errors.title}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="w-1/2 px-3 mb-5">
                                                                    <label className="text-xs font-semibold px-1">Status</label>
                                                                    <div className="flex">
                                                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                                            </svg>
                                                                        </div>
                                                                        <select
                                                                            id="status"
                                                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                                            name="status"
                                                                            value={values.status}
                                                                            onChange={handleChange('status')}
                                                                        >
                                                                            <option value="active">Active</option>
                                                                            <option value="hold">Hold</option>
                                                                            <option value="work in progress">Work In Progress</option>
                                                                            <option value="closed">Closed</option>
                                                                        </select>
                                                                    </div>
                                                                    {touched.status && errors.status && (
                                                                        <p className="text-[#ff0d10]">
                                                                            {errors.status}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex -mx-3">
                                                                <div className="w-full px-3 mb-5 m-auto">
                                                                    <label className="text-xs font-semibold px-1">Description</label>
                                                                    <div className="flex">
                                                                        <textarea
                                                                            className="w-full  pl-2 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                                            placeholder="Write about task."
                                                                            onChange={handleChange('description')}
                                                                            value={values.description}
                                                                        />
                                                                    </div>
                                                                    {touched.description && errors.description && (
                                                                        <p className="text-[#ff0d10]">
                                                                            {errors.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex -mx-3">
                                                                <div className="w-full px-3 mb-5">
                                                                    <button
                                                                        type="submit"
                                                                        className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                                        onClick={() => {
                                                                            handleSubmit()
                                                                        }}
                                                                    >
                                                                        Edit Now
                                                                    </button>
                                                                </div>
                                                                <div className="w-full px-3 mb-5">
                                                                    <button
                                                                        className="block w-full max-w-xs mx-auto bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateTask;
