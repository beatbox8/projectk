import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from './utils/LoadingCom';
import { FaSquareWhatsapp } from "react-icons/fa6";
import Navbar from './utils/Navbar';
const API_BASE_URL = 'https://beat-box-backend.onrender.com/api/transactions';
const WHATSAPP_API_URL = 'https://beat-box-backend.onrender.com/api/whatsapp/send-whatsapp'; // Backend endpoint for sending WhatsApp

function Reminders() {
    const navigate = useNavigate();
    const [unpaidStudents, setUnpaidStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentMonthYear = new Date().toISOString().slice(0, 7);

    console.log("Month : ",currentMonthYear);

    useEffect(() => {
        fetchUnpaidStudentsForCurrentMonth();
    }, [currentMonthYear]);

    const fetchUnpaidStudentsForCurrentMonth = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/unpaid/${currentMonthYear}`, {
                withCredentials: true
            });
            console.log(response);
            setUnpaidStudents(response.data);

        } catch (err) {
            navigate("/");
            toast.error('unAuthorized User', {
                duration: 5000, // shows for 5 seconds
                position: 'top-center', // can be top-left, bottom-center, etc.
            });
            setError(err.message);
            console.error("Error fetching unpaid students for current month:", err);
        } finally {
            setLoading(false);
        }
    };
    

      const sendWhatsAppMessage = async (phoneNumber, message) => {
        if (!phoneNumber) {
          console.error("Error: Phone number is missing.");
          return;
        }
      
        try {
          const response = await axios.post(
            WHATSAPP_API_URL,
            {
              phoneNumber: phoneNumber.replace('+', ''), // Remove '+' if present
              message,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Important for sending cookies if needed
            }
          );
      
          console.log('WhatsApp message sent:', response.data);
          return true;
        } catch (error) {
          console.error("Error sending WhatsApp message:", error.response?.data || error.message);
          alert(`Failed to send WhatsApp message to ${phoneNumber}.`);
          return false;
        }
      };

    const handleSendReminder = async (student) => {
        const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
        const defaultMessage = `Hi ${student.studentId.name}, this is a friendly reminder that your fees for ${currentMonthName} are pending. Please clear them at your earliest convenience. Thank you! - BeatBox Studio`;
        await sendWhatsAppMessage(student.studentId.mobile, defaultMessage);
    };

    const handleSendReminderAll = async () => {
        const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
        const defaultMessageAll = `Hi there! This is a general reminder from BeatBox Studio regarding pending fees for ${currentMonthName}. Kindly clear your dues as soon as possible to continue your classes without interruption. Thank you!`;
        let successCount = 0;
        for (const student of unpaidStudents) {
            const sent = await sendWhatsAppMessage(student.studentId.mobile, defaultMessageAll);
            if (sent) {
                successCount++;
            }
        }
        alert(`Attempted to send reminders to ${unpaidStudents.length} students. ${successCount} messages sent.`);
    };

    if (loading) {
        return <div><LoadingSpinner/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid bg-light ">
            <Navbar/>
            <div className="container mt-4 min-vh-100">
                <h2 className="mb-3">Unpaid Students for {new Date().toLocaleString('default', { month: 'long' })}</h2>

                {unpaidStudents.length === 0 ? (
                    <p>No unpaid students for the current month.</p>
                ) : (
                    <ul className="list-group mb-3">
                        {unpaidStudents.map(student => (
                            <li key={student._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {student.studentId.name} - Phone: {student.studentId.mobile}
                                <button className="btn btn-sm btn-success p-0"  onClick={() => handleSendReminder(student)}>
                                    <FaSquareWhatsapp size={36} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {unpaidStudents.length > 0 && (
                    <button className="btn btn-primary" onClick={handleSendReminderAll}>
                        Remind All Unpaid Students
                    </button>
                )}
            </div>

            <footer className="bg-dark text-light text-center py-3 mt-5">
                <p>&copy; 2025 BeatBox Studio. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Reminders;
