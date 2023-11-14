import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoleContext from '../pages/RoleContext.js';

const ChangePasswordForm = () => {
    const { role } = useContext(RoleContext);
    const navigate = useNavigate();

    const [passwordChangeFormData, setPasswordChangeFormData] = useState({
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
    });
  
    const [error, setError] = useState('');
  
    const handleChangePasswordChange = (e) => {
      setPasswordChangeFormData({ ...passwordChangeFormData, [e.target.name]: e.target.value });
  };
  
  const handleChangePasswordFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/api/"+role+"/changePassword", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordChangeFormData.oldPassword,
          newPassword: passwordChangeFormData.newPassword,
          reNewPassword: passwordChangeFormData.reNewPassword,
        }),
        withCredentials: true,
        credentials : `include`
      });
      
      if (!response.ok) {
        // If response status is not ok, handle it differently
        const errorText = await response.text();
        setError(`Error: ${response.status} - ${errorText}`);
        return;
      }
  
      const data = await response.json();
              if (response.ok) {
              // Reset error state and move back to the login step
                setError('');
              // Clear the passwordChangeFormData fields
                setPasswordChangeFormData({
                  oldPassword: '',
                  newPassword: '',
                  reNewPassword: '',
                });
              // Navigate to the login page after successful password reset
                navigate('/'+role+'/home');
              } else {
                  setError(data.error || 'An error occurred during password verification');
              }
            // Redirect or handle response as needed
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };
  
  return (
    <div className="form-container">
    <h3>Change Password</h3>
    <form onSubmit={handleChangePasswordFormSubmit}>
      <label>
        Enter Old Password:
        <input
          type="password"
          name="oldPassword"
          value={passwordChangeFormData.oldPassword}
          onChange={handleChangePasswordChange}
          required
        />
      </label>
      <br />
      <label>
        Enter New Password:
          <input
            type="password"
            name="newPassword"
            value={passwordChangeFormData.newPassword}
            onChange={handleChangePasswordChange}
            required
          />
        </label>
        <br />
        <label>
          Re-Enter New Password:
          <input
            type="password"
            name="reNewPassword"
            value={passwordChangeFormData.reNewPassword}
            onChange={handleChangePasswordChange}
            required
          />
          </label>
          <br />
          <button className='button' type="submit">Change Password</button>
    </form>
    </div>
  );
}

export default ChangePasswordForm;
