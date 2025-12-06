import React from 'react';

export const SignupForm = () => {
    return (
        <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div onClick={() => alert('submit')}>Sign Up</div>
        </form>
    );
};
