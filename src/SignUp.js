import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Log form data (replace with API call in production)
    console.log('Sign Up Data:', formData);
    // TODO: Implement API call to submit form data
  };

  return (
      <div className="sign-up">
        <div className="form-container">
          <h2 className="sign-up-text">회원가입</h2>
          <div className="email-pw-nick">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sign-up-email">
                이메일:
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="sign-up-email-input"
                  placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="password" className="sign-up-password">
                비밀번호:
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="sign-up-password-input"
                  placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="nickname" className="sign-up-nickname">
                닉네임:
              </label>
              <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                  className="sign-up-nickname-input"
                  placeholder="닉네임을 입력하세요"
              />
            </div>
            <button
                type="submit"
                className="sign-up-button"
            >
              회원가입
            </button>
          </form>
          </div>
        </div>
      </div>
  );
}

export default SignUp;