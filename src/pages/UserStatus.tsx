import { useState } from "react";
import QRCode from "react-qr-code";
import styled from "@emotion/styled";
import { Request } from "../types";

const StyledStatus = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }

  h1 {
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .qr-container {
    margin: 20px 0;
  }

  button {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 250px;
    max-width: 100%;
  }

  .status {
    margin-top: 20px;
    padding: 20px;
    border-radius: 4px;
    word-break: break-word;

    &.approved {
      background: #d4edda;
      color: #155724;
    }

    &.rejected {
      background: #f8d7da;
      color: #721c24;
    }

    &.pending {
      background: #fff3cd;
      color: #856404;
    }
  }

  svg {
    max-width: 100%;
    height: auto;
  }
`;

function UserStatus() {
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState<Request | null>(null);

  const checkStatus = (e: React.FormEvent) => {
    e.preventDefault();
    const requests = JSON.parse(
      localStorage.getItem("requests") || "[]"
    ) as Request[];
    const userRequest = requests.find((req) => req.email === email);
    setRequest(userRequest || null);
  };

  const qrData =
    request?.status === "approved"
      ? JSON.stringify({
          email: request.email,
          name: `${request.firstName} ${request.lastName}`,
        })
      : null;

  return (
    <StyledStatus>
      <h1>Check Request Status</h1>
      <form onSubmit={checkStatus}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Check Status</button>
      </form>

      {request && (
        <div className={`status ${request.status}`}>
          <h2>Status: {request.status}</h2>
          <p>
            Name: {request.firstName} {request.lastName}
          </p>
          <p>Submitted: {new Date(request.createdAt).toLocaleDateString()}</p>
          {request.status === "approved" && qrData && (
            <div className="qr-container">
              <h3>Your QR Code:</h3>
              <QRCode value={qrData} />
            </div>
          )}
        </div>
      )}
    </StyledStatus>
  );
}

export default UserStatus;
