import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Constant from '../../util/Constant.js';

export default function SignUp() {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
    const defaultList = {
        "email": signupInfo.email,
        "value": {
            "TATA": [
                "TATACHEM.BSE",
                "TATACOMM.BSE",
                "TATAELXSI.BSE",
                "TATAPOWER.BSE",
                "TATASTEEL.BSE",
                "TATACONSUM.BSE",
                "TATAINVEST.BSE",
                "TATAMOTORS.BSE",
                "TATAMTRDVR.BSE",
                "TATAYODOGA.BSE"
            ]
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({
            ...signupInfo,
            [name]: value
        });
    }

    const addDefaultWatchlist = async () => {
        const response = await fetch(`${Constant.BASE_URL}/watchlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defaultList),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
            return;
        }

        console.log("Default list added.");
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const URL = `${Constant.BASE_URL}/auth/signup`;

            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await res.json();

            if (result.success) {
                addDefaultWatchlist();

                setTimeout(() => {
                    navigate('/signin');
                }, 500);
            } else {
                alert("Error occurred");
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="auth">
                <div id="signup" className="auth--container">
                    <div className="auth--heading">
                        <h1>Sign Up</h1>
                    </div>
                    <form onSubmit={handleSignUp} className="auth--form">
                        <div className="auth--form--field">
                            <label htmlFor='name'>Name</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='name'
                                autoFocus
                                placeholder="Enter Name"
                                value={signupInfo.name}
                                required
                            />
                        </div>
                        <div className="auth--form--field">
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder="Enter Email"
                                value={signupInfo.email}
                                required
                            />
                        </div>
                        <div className="auth--form--field">
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder="Enter Password"
                                value={signupInfo.password}
                                required
                            />
                        </div>
                        <button className='auth-btn' type='submit'>Sign Up</button>
                        <div className="auth--link">
                            <span>
                                Already have an account?
                                <Link to="/signin">  Sign In</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}