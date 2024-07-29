import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const backendUrl: string = "http://localhost:9000";

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, username }),
    });

    if (res.status !== 201) {
      const { msg } = await res.json();
      Swal.fire({
        title: msg,
        icon: "error",
        confirmButtonText: "Done",
      });
      return false;
    }

    const { msg } = await res.json();
    Swal.fire({
      title: msg,
      icon: "success",
      confirmButtonText: "Done",
    });
    setEmail("");
    setName("");
    setUsername("");
    setPassword("");
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <form
        className="w-[25%] flex flex-col items-center justify-between bg-white rounded-lg shadow-lg shadow-purple-400 gap-10 py-[2rem]"
        onSubmit={handleRegister}
      >
        <h1>REGISTER</h1>
        <div className="w-[60%] flex flex-col items-center gap-5">
          <TextField
            variant="outlined"
            color="secondary"
            sx={{ width: "100%" }}
            label="Email"
            value={email}
            onChange={({ target }: { target: { value: string } }) => setEmail(target.value)}
          />
          <TextField
            variant="outlined"
            color="secondary"
            sx={{ width: "100%" }}
            label="Username"
            value={username}
            onChange={({ target }: { target: { value: string } }) => setUsername(target.value)}
          />
          <TextField
            variant="outlined"
            color="secondary"
            sx={{ width: "100%" }}
            label="Name"
            value={name}
            onChange={({ target }: { target: { value: string } }) => setName(target.value)}
          />
          <TextField
            variant="outlined"
            color="secondary"
            sx={{ width: "100%" }}
            label="Password"
            value={password}
            onChange={({ target }: { target: { value: string } }) => setPassword(target.value)}
          />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;
