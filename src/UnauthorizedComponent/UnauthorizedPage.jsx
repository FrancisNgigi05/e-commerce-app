import React from 'react'
import { Link } from 'react-router-dom';

function UnauthorizedPage() {
  return (
    <div style={{textAlign: 'center', marginTop: "10vh"}}>
      <h1>403-Unauthorized</h1>
      <p>You do not have permission to view this page</p>
      <Link to="/login">Go to login Page</Link>
    </div>
  )
}

export default UnauthorizedPage;
