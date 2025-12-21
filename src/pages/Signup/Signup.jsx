import { useCallback } from "react";
import styles from "./Signup.module.css";
import PageNav from "../../components/PageNav/PageNav";
import Button from "../../components/Button/Button";
import { AuthContextConsumer } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useFormValidation } from "../../hooks/useFormValidation";
import { VALIDATION_RULES } from "../../data/Helpers";



export default function Signup() {
    const { signup } = AuthContextConsumer();
    const navigate = useNavigate();

    const { values, errors, handleChange, isValid } = useFormValidation(
        { email: "", password: "", phone: "" },
        VALIDATION_RULES
    );


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (isValid()) {
            try {
                await signup(values.email, values.password, values.phone);
                navigate("/login");
            } catch (error) {
                console.error("Signup failed:", error);
            }
        }
    }, [isValid, values, signup, navigate]);

    return (
        <main className={styles.Signup}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Email address"
                    type="email"
                    id="email"
                    onChange={handleChange('email')}
                    value={values.email}
                    error={errors.email}
                />

                <Input
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange('password')}
                    value={values.password}
                    error={errors.password}
                />

                <Input
                    label="Phone"
                    type="text"
                    id="phone"
                    onChange={handleChange('phone')}
                    value={values.phone}
                    error={errors.phone}
                />

                <div className={styles.btnContainer}>
                    <Button type="primary" disabled={!isValid()}>
                        Signup
                    </Button>
                    <p>If you have an account please click here to <Link to="/login">Login</Link></p>
                </div>
            </form>
        </main>
    );
}