import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function NotificationDetailPage() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`/notification/${id}`); // Replace `/notification/${id}` with the actual API endpoint for fetching a single notification
      setNotification(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {notification ? (
        <div>
          <h2>Notification Detail</h2>
          <p>From: {notification.fromName}</p>
          <p>To Be: {notification.toBe}</p>
          <p>Additional Details: {notification.additionalDetails}</p>
          {/* Render other details as per your notification schema */}
        </div>
      ) : (
        <p>Loading notification...</p>
      )}
    </div>
  );
}
