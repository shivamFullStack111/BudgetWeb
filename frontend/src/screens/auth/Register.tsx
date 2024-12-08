import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutation/mutations";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const [createUser, { loading }] = useMutation(REGISTER_USER); // register
  if (loading) return "Loading...";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser({
        variables: { name, email, password },
      });
      console.log("User created successfully:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div
        className="w-full h-full bg-white 400px:w-[400px] 400px:h-[90vh] 400px:rounded-xl flex justify-center items-center"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            maxWidth: "400px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setname(e.target.value)
            }
            id="name"
            label="Name"
            variant="outlined"
            type="name"
            required
            sx={{
              height: 50,
            }}
          />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setemail(e.target.value)
            }
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            required
            sx={{
              height: 50,
            }}
          />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setpassword(e.target.value)
            }
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            required
            sx={{
              height: 50,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              height: 50,
              marginTop: 2,
            }}
          >
            Register
          </Button>{" "}
          <div className="text-center ">
            Not have an account?{" "}
            <Link to={"/login"} className="text-blue-500 inline cursor-pointer">
              Login
            </Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Register;
