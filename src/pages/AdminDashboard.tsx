import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Request } from "../types";
import { useNavigate } from "react-router-dom";

const StyledTable = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background: #f5f5f5;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  button {
    padding: 8px 16px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.approve {
      background: #28a745;
      color: white;
    }

    &.reject {
      background: #dc3545;
      color: white;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

function AdminDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
      return;
    }

    const storedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    setRequests(storedRequests);
  }, [navigate]);

  const handleStatus = (id: string, status: "approved" | "rejected") => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
  };

  return (
    <StyledTable>
      <h1>Requests Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.email}</td>
              <td>{`${request.firstName} ${request.lastName}`}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              <td>
                {request.status === "pending" ? (
                  <>
                    <button
                      className="approve"
                      onClick={() => handleStatus(request.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => handleStatus(request.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>No actions available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
}

export default AdminDashboard;
