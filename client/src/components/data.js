import React, { useState, useEffect } from 'react';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from './utils/LoadingCom';
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import Navbar from './utils/Navbar';

const API_BASE_URL = 'https://beat-box-backend.onrender.com/api/students'; // Adjust if your backend runs on a different port

function Data() {
    
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: '',
        fatherName: '',
        mobile: '',
        email: '',
        isActive: true,
    });
    const [editingIndex, setEditingIndex] = useState(-1);
    const [showAddStudent,setShowAddStudent] = useState(false)
    const [editStudent, setEditStudent] = useState({
        _id: '', // Include the ID for updates
        name: '',
        fatherName: '',
        mobile: '',
        email: '',
        isActive: true,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                API_BASE_URL,
            {
              withCredentials: true 
            }
            );
            const data = response.data;
            setStudents(data);
            console.log(data);
          } catch (err) {
            navigate("/");
            toast.error('unAuthorized User', {
                duration: 5000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
            });
            setError(err.message);
            console.error("Error fetching students:", err);
        } finally {
            setLoading(false);
        }

    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewStudent({
            ...newStudent,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddStudent = async (event) => {

        if(!newStudent.name||!newStudent.fatherName,!newStudent.email,!newStudent.mobile,!newStudent.isActive)
        {
            toast.error('All Fields Required', {
                duration: 3000,
                position: 'top-center',
            });
            return;
        }

        event.preventDefault();
        
        try {
          const response = await axios.post(
            API_BASE_URL, 
            newStudent,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true 
            }
          );
      
          
          const data = response.data;

          console.log("data here : ",data)
          
          if(data.message==="Student Added Sucessfully")
          {
            setStudents([...students, data.student]); 
            setNewStudent({ name: '', fatherName: '', mobile: '', email: '', isActive: true }); 

            toast.success(response.data.message, {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
              });

          }
          else{

            toast.error(response.data.message, {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
              });
          }

        } catch (err) {
            setError(err.message); 
            console.error("Error adding student:", err);
            

           
                toast.error('Error in Adding Student', {
                    duration: 5000,
                    position: 'top-center',
                    });
            
          }          
      };

      const handleDeleteStudent = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`, {
                withCredentials: true
            });
            setStudents(students.filter(student => student._id !== id));
            toast.success('Student Deleted Sucessfully', {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
              });
        } catch (err) {
            setError(err.message);
            console.error("Error deleting student:", err);
            toast.error('Error in Deleting Student', {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
              });
        }
    };

    const handleEdit = (index, student) => {
        setEditingIndex(index);
        setEditStudent({ ...student });
    };

    const handleEditInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setEditStudent({
            ...editStudent,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveEdit = async (index) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/${editStudent._id}`, 
                editStudent,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            const updatedStudent = response.data;
            const updatedStudents = students.map(stu =>
                stu._id === updatedStudent._id ? updatedStudent : stu
            );
            setStudents(updatedStudents);
            setEditingIndex(-1);
            toast.success('Student Edited Sucessfully', {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
              });
        } catch (err) {
            setError(err.message);
            console.error("Error updating student:", err);
            toast.success('Error in Editing Student', {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
              });
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(-1);
    };

    if (loading) {
        return <div><LoadingSpinner/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid bg-light ">
            {/* Navbar (same as before) */}
            <Navbar/>

            <div className="container mt-4 min-vh-100">

                
                {!showAddStudent &&
                    (<div className="card shadow-sm p-0 my-3">
                        <button className="btn btn-primary w-100" onClick={()=>{setShowAddStudent(!showAddStudent)}}>Add Student</button>
                    </div>)

                }

                {showAddStudent &&

                (<div className="card shadow-sm p-5 my-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <h2 className="mb-0">Add New Student</h2>
                        </div>
                        <button className="btn btn-danger m-0 p-0" onClick={()=>{setShowAddStudent(!showAddStudent)}} style={{ position: 'absolute', right: 50 }}>
                            <MdCancel size={36}/>
                        </button>
                    </div>
                    <form onSubmit={handleAddStudent} className="mb-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={newStudent.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fatherName" className="form-label">Father's Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fatherName"
                                name="fatherName"
                                value={newStudent.fatherName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Mobile</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                value={newStudent.mobile}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={newStudent.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isActive"
                                name="isActive"
                                checked={newStudent.isActive}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="isActive">Active</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Add Student</button>
                    </form>
                </div>)

                }

                <h2 className='my-3 text-center'>List of Students</h2>
                {students.length === 0 ? (
                <p>No students added yet.</p>
                ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Father's Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action1</th>
                        <th>Action2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                        <tr key={student._id}>
                            {editingIndex === index ? (
                            <>
                                <td><input type="text" className="form-control" name="name" value={editStudent.name} onChange={handleEditInputChange} /></td>
                                <td><input type="text" className="form-control" name="fatherName" value={editStudent.fatherName} onChange={handleEditInputChange} /></td>
                                <td><input type="tel" className="form-control" name="mobile" value={editStudent.mobile} onChange={handleEditInputChange} /></td>
                                <td><input type="email" className="form-control" name="email" value={editStudent.email} onChange={handleEditInputChange} /></td>
                                <td>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id={`editIsActive-${index}`} name="isActive" checked={editStudent.isActive} onChange={handleEditInputChange} />
                                    <label className="form-check-label" htmlFor={`editIsActive-${index}`}>{editStudent.isActive ? 'Active' : 'Inactive'}</label>
                                </div>
                                </td>
                                <td>
                                <button className="btn btn-sm btn-success me-2 px-0 py-0" onClick={() => handleSaveEdit(index)}><IoIosSave size={32} /></button>
                                </td>
                                <td>
                                <button className="btn btn-sm btn-secondary px-0 py-0" onClick={handleCancelEdit}><MdCancel size={32} /></button>
                                </td>
                            </>
                            ) : (
                            <>
                                <td>{student.name}</td>
                                <td>{student.fatherName}</td>
                                <td>{student.mobile}</td>
                                <td>{student.email}</td>
                                <td>
                                <span className={student.isActive ? 'text-success' : 'text-danger'}>
                                    {student.isActive ? 'Active' : 'Inactive'}
                                </span>
                                </td>
                                <td>
                                <button className="btn btn-sm btn-primary me-2 px-2 py-1" onClick={() => handleEdit(index, student)}><MdEditSquare size={20} /></button>
                                </td>
                                <td>
                                <button className="btn btn-sm btn-danger px-2 py-1" onClick={() => handleDeleteStudent(student._id)}><RiDeleteBin6Fill size={20} /></button>
                                </td>
                            </>
                            )}
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                )}
            </div>

            {/* Footer (same as before) */}
            <footer className="bg-dark text-light text-center py-3 mt-5">
                <p>&copy; 2025 BeatBox Studio. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Data;
