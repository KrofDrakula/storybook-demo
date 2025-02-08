import { Button, Card, Input } from "@mui/material";
import styles from "./login.module.css";
import { useCallback, useState } from "react";

export const Login = ({ onSubmit }: { onSubmit: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const onClick = useCallback(() => {
    setErrors({ email: !email, password: !password });
    if (email && password) {
      onSubmit();
    }
  }, [email, password, onSubmit]);

  return (
    <Card elevation={1} sx={{ padding: 2, maxWidth: 320 }}>
      <div className={styles.list}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onInput={(ev) => setEmail((ev.target as HTMLInputElement).value)}
          error={errors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onInput={(ev) => setPassword((ev.target as HTMLInputElement).value)}
          error={errors.password}
        />
        <Button onClick={onClick}>Log in</Button>
      </div>
    </Card>
  );
};
