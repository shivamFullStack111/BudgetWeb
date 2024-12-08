import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/query/query";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../store/slices/userSlice";
import { AppDispatch } from "../../store/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginUser, { loading, data, error, refetch }] =
    useLazyQuery(LOGIN_USER);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      dispatch(setLoading(true));
      localStorage.setItem("token", data?.loginUser.token);
      dispatch(setUser(data?.loginUser));
      dispatch(setLoading(false));
    }
  }, [data, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if email and password are provided
    if (email && password) {
      if (data) {
        refetch({ variables: { email, password } });
      } else {
        loginUser({
          variables: {
            email,
            password,
          },
        });
      }
    } else {
      console.log("Please enter valid credentials.");
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
            Login
          </Typography>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
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
              setPassword(e.target.value)
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
            {loading ? "Logging In..." : "Login"}
          </Button>
          {error && <div>Error: {error.message}</div>}
        </Box>
      </div>
    </div>
  );
};

export default Login;
