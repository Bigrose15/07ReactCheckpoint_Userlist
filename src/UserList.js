import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

document.body.style.background = "linear-gradient(to bottom, lightblue, white)";

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]); // State to store users

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your details
        const me = {
          name: "Lawrence Ugo",
          gender: "Male",
          email: "luonatech@gmail.com",
          phone: "08100332516",
          website: "https://luonatech.com",
          country: "Nigeria",
          image:
            "https://media.licdn.com/dms/image/v2/D4E03AQETQzvkrWOw1Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728067342626?e=1737590400&v=beta&t=7uwlv6hxnMbMrVTY-5pw_QdM6J2EGutzTE1qc2LYGFg", // Your profile image
        };

        // Fetch random user data from the API
        const userResponse = await axios.get(
          "https://randomuser.me/api/?results=11"
        );

        // Combine your details with the fetched users
        const users = [
          me,
          ...userResponse.data.results.map((user, index) => ({
            id: index + 1, // Creating a unique ID for each user
            name: `${user.name.first} ${user.name.last}`,
            gender: user.gender,
            email: `${user.name.first}@gmail.com`,
            phone: user.phone,
            website: `${user.name.last}.com`,
            country: user.location.country,
            image: user.picture.large, // Use the user's profile image
          })),
        ];

        setListOfUser(users); // Save the combined list of users
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
      }
    };

    fetchData();
  }, []);

  // Conditional rendering: Show loading text or user cards
  if (listOfUser.length === 0) {
    return <p>Loading users...</p>;
  }

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col xs={12}>
          <h1 className="text-center">User List</h1>
        </Col>
      </Row>
      <Row className="g-4 justify-content-center">
        {listOfUser.map((user) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={user.id}
            className="d-flex justify-content-center"
          >
            {/* main card */}
            <Card
              style={{
                width: "15rem",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                boxShadow: "5px 2px  rgba(0, 0, 0, 0.1)", // Lighter shadow
              }}
            >
              {/* image div */}
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                  height: "80px", // Reserve a fixed space for the image
                }}
              >
                {user.image ? (
                  <Card.Img
                    variant="top"
                    src={user.image}
                    alt="User avatar"
                    style={{
                      borderRadius: "50%",
                      height: "40px", // Fixed height
                      width: "40px", // Fixed width
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc", // Placeholder background
                      display: "inline-block",
                    }}
                  />
                )}
              </div>
              <Card.Body
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Spread content evenly
                }}
              >
                <div>
                  <Card.Title
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    {user.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "0.8rem",
                      lineHeight: "1.7",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <p style={{ margin: "0" }}>Gender: {user.gender}</p>
                    <p style={{ margin: "0" }}>Email: {user.email}</p>
                    <p style={{ margin: "0" }}>Phone: {user.phone}</p>
                    <p style={{ margin: "0" }}>Website: {user.website}</p>
                    <p style={{ margin: "0" }}>Country: {user.country}</p>
                  </Card.Text>
                </div>
                <Button
                  variant="secondary"
                  href={`https://${user.website}`}
                  target="_blank"
                  style={{
                    fontSize: "0.8rem",
                    padding: "5px 10px",
                  }}
                >
                  Connect +
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserList;
