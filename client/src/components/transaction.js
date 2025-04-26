import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from './utils/Navbar';

import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import LoadingSpinner from './utils/LoadingCom';

const API_BASE_URL = 'http://localhost:5000/api/transactions'; // Adjust if your backend runs on a different port
const STUDENTS_API_URL = 'http://localhost:5000/api/students'; // Adjust if your backend runs on a different port

function Transactions() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [error, setError] = useState(null);
    const [newTransactionMonth, setNewTransactionMonth] = useState('');
    const currentYearMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        if (selectedStudentId) {
            fetchTransactions(selectedStudentId);
        } else {
            setTransactions([]);
        }
    }, [selectedStudentId]);

    const fetchStudents = async () => {
        setLoadingStudents(true);
        setError(null);
        try {
            const response = await axios.get(STUDENTS_API_URL, {
                withCredentials: true
            });
            const data = response.data;
            setStudents(data.filter(student => student.isActive)); // Only show active students
        } catch (err) {
            navigate("/");
            toast.error('unAuthorized User', {
                duration: 5000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
            });
            setError(err.message);
            console.error("Error fetching active students:", err);
        } finally {
            setLoadingStudents(false);
        }
    };

    const fetchTransactions = async (studentId) => {
        setLoadingTransactions(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/student/${studentId}`, {
                withCredentials: true
            });
            setTransactions(response.data);
        } catch (err) {
           
            setError(err.message);
            console.error("Error fetching transactions:", err);
        } finally {
            setLoadingTransactions(false);
        }
    };

    const handleLogout = async() => {
        try {
          const response = await axios.post(
            'http://localhost:5000/api/auth/signout',
            {}, 
          {
            withCredentials: true 
          }
          );
      
          const data = response.data;
          navigate('/signin');
          console.log(data);
        } catch (error) {
          console.error('Sign Out failed:', error);
        }
      };

    const handleStudentClick = (studentId) => {
        setSelectedStudentId(studentId);
        setEditingTransaction(null);
    };

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setPaymentStatus(transaction.paid ? 'paid' : 'unpaid');
    };
    const handleDeleteClick = async (id) => {
        try {
          const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setTransactions(prev => prev.filter(txn => txn._id !== id));

            toast.success("Transaction Deleted Sucessfully", {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
            });


        } catch (err) {
          setError(err.message);
          console.error("Error deleting transaction:", err);
            toast.success(" Error in Deleteing Transaction", {
                duration: 3000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
            });
        }
      };
      
    const handlePaymentStatusChange = (event) => {
        setPaymentStatus(event.target.value);
    };

    const handleSaveEdit = async () => {
    if (!editingTransaction) return;
    try {
        const response = await axios.put(
            `${API_BASE_URL}/${editingTransaction._id}`,
            { paid: paymentStatus === 'paid' },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );
        const updatedTransaction = response.data;
        const updatedTransactions = transactions.map(trans =>
            trans._id === updatedTransaction._id ? updatedTransaction : trans
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);

        toast.success("Transaction Edited Sucessfully", {
            duration: 3000, // shows for 5 seconds
            position: 'top-center', // can be top-left, bottom-center, etc.
        });

    } catch (err) {
        setError(err.message);
        console.error("Error updating transaction:", err);
        toast.error("Error in  Editing Transaction", {
            duration: 3000, // shows for 5 seconds
            position: 'top-center', // can be top-left, bottom-center, etc.
        });
    }
    };

    const handleAddTransaction = async () => {
        if (!selectedStudentId || !newTransactionMonth) {
            alert('Please select a student and a month to add a transaction.');
            return;
        }
        try {
            const response = await axios.post(
                API_BASE_URL,
                {
                    studentId: selectedStudentId,
                    month: newTransactionMonth,
                    paid: false, // Default to unpaid when adding manually
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if(response.data.message==="Transaction Added Sucessfully")
            {
                const newTransaction = response.data.transactionNew;
                setTransactions([...transactions, newTransaction]);
                setNewTransactionMonth('');

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
            console.error("Error adding transaction:", err);
        }
    };

    if (loadingStudents) {
        return <div><LoadingSpinner/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid bg-light ">
            <Navbar/>

            <div className="container mt-4 min-vh-100">
                <h2>Transactions</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="list-group">
                            <h4>Active Students</h4>
                            {students.map(student => (
                                <button
                                    key={student._id}
                                    className={`list-group-item list-group-item-action ${selectedStudentId === student._id ? 'active' : ''}`}
                                    onClick={() => handleStudentClick(student._id)}
                                >
                                    {student.name}
                                </button>
                            ))}
                            {loadingStudents && <div className="text-muted"><LoadingSpinner/></div>}
                            {students.length === 0 && !loadingStudents && <div className="text-muted">No active students available.</div>}
                        </div>
                        {selectedStudentId && (
                            <div className="mt-3">
                                <h4>Add New Transaction</h4>
                                <div className="mb-3">
                                    <label htmlFor="newTransactionMonth" className="form-label">Month (YYYY-MM)</label>
                                    <input
                                        type="month"
                                        className="form-control"
                                        id="newTransactionMonth"
                                        value={newTransactionMonth}
                                        onChange={(e) => setNewTransactionMonth(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-sm btn-success" onClick={handleAddTransaction}>
                                    Add Transaction (Unpaid)
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <h4>Transaction History</h4>
                        {selectedStudentId ? (
                            loadingTransactions ? (
                                <p><LoadingSpinner/></p>
                            ) : transactions.length > 0 ? (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Status</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map(transaction => (
                                            <tr key={transaction._id}>
                                                <td>{transaction.month}</td>
                                                <td>{transaction.paid ? <span className="badge bg-success">Paid</span> : <span className="badge bg-danger">Unpaid</span>}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning px-2 py-1"
                                                        onClick={() => handleEditClick(transaction)}
                                                        disabled={editingTransaction !== null}
                                                    >
                                                        <MdEditSquare size={22}/>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-danger px-2 py-1"
                                                        onClick={() => handleDeleteClick(transaction._id)}
                                                        disabled={editingTransaction !== null}
                                                    >
                                                        <RiDeleteBin6Fill size={20}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-muted">No transaction history available for this student.</p>
                            )
                        ) : (
                            <p className="text-muted">Select an active student to view their transaction history.</p>
                        )}

                        {/* Edit Modal */}
                        {editingTransaction && (
                            <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Transaction</h5>
                                            <button type="button" className="btn-close" onClick={() => setEditingTransaction(null)} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Editing transaction for month: <strong>{editingTransaction.month}</strong></p>
                                            <div className="mb-3">
                                                <label htmlFor="paymentStatus" className="form-label">Payment Status:</label>
                                                <select
                                                    className="form-select"
                                                    id="paymentStatus"
                                                    value={paymentStatus}
                                                    onChange={handlePaymentStatusChange}
                                                >
                                                    <option value="paid">Paid</option>
                                                    <option value="unpaid">Unpaid</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingTransaction(null)}>Cancel</button>
                                            <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {editingTransaction && <div className="modal-backdrop fade show"></div>}
                    </div>
                </div>
            </div>

            <footer className="bg-dark text-light text-center py-3 mt-5">
                <p>&copy; 2025 BeatBox Studio. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Transactions;