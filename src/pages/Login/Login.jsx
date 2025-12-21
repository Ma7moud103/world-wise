import { useCallback, useState, useEffect } from "react";
import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";
import Button from "../../components/Button/Button";
import { AuthContextConsumer } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { VALIDATION_RULES } from "../../data/Helpers";
import { useFormValidation } from "../../hooks/useFormValidation";
import Input from "../../components/Input/Input";

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const { values, errors, handleChange, isValid } = useFormValidation(
    { email: "", password: "" },
    VALIDATION_RULES
  );

  const { signin, isLoading, isAuthenticated } = AuthContextConsumer();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoginError(null);

      if (isValid()) {
        const result = await signin(values.email, values.password);

        if (!result.success) {
          setLoginError(result.error || "Login failed. Please try again.");
        }
        // Navigation handled by useEffect when isAuthenticated changes
      }
    },
    [isValid, values, signin]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        {loginError && (
          <div className={styles.errorAlert}>
            {loginError}
          </div>
        )}

        <Input
          label="Email address"
          type="email"
          id="email"
          onChange={handleChange("email")}
          value={values.email}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          onChange={handleChange("password")}
          value={values.password}
          error={errors.password}
        />

        <div className={styles.btnContainer}>
          <Button type="primary" disabled={!isValid() || isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <p>
            If you don't have an account, please{" "}
            <Link to="/signup">sign up</Link>
          </p>
        </div>
      </form>
    </main>
  );
}