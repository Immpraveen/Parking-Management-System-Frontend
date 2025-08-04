import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';

const ResolveSecurityIncident = () => {
  const [id, setId] = useState('');
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/securityincidents/resolve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        comments,
        status,
      }),
    });

    if (response.ok) {
      alert("Security Incident Updated");
      window.location.reload();
      const resolvedSecurityIncident = await response.json();
      console.log(resolvedSecurityIncident);
    } else {
      console.error(response.statusText);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Incident ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter incident ID"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter comments"
            value={comments}
            onChange={(event) => setComments(event.target.value)}
          />
        </Form.Group>
        <Form.Check
                  type="radio"
                  label="Resolved"
                  name="status"
                  id="resolved"
                  checked={status}
                  onChange={() => setStatus(true)}
                />
                <Form.Check
                  type="radio"
                  label="Unresolved"
                  name="status"
                  id="unresolved"
                  checked={!status}
                  onChange={() => setStatus(false)}
                />

        <Button variant="primary" type="submit" className="my-3">
          Submit
        </Button>
      </Form>

      
    </div>
  );
};

export default ResolveSecurityIncident;