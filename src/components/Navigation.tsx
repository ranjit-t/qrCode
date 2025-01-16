import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #444;
    }

    &.active {
      background-color: #007bff;
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    ul {
      gap: 1rem;
    }

    a {
      font-size: 1rem;
      padding: 0.4rem 0.8rem;
    }
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">Request</Link>
        </li>
        <li>
          <Link to="/status">Check Status</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;
