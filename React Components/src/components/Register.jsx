import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
function Register(props) {
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [formData, setFormData] = useState({
        profilePic: null,
        coverPic: null,
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        additionalInfo: '',
        jobTitle: '',
        company: '',
        password: '',
        confirmPassword: '',
        address: '',
        address2: '',
        country: null, // You may need to initialize this with the default country value
        city: '',
        state: '',
        postCode: '',
        website: '',
        instagram: '',
        linkedin: '',
        check1: false,
        check2: false,
    });

    const navigate = useNavigate()
    // const handleFiles = (e) => {
    //     const { name, files } = e.target;
    //     if (Array.isArray(files) )
    //     setFormData({ ...formData, [name]: files[0] });
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let values = {
            ProfilePic: formData.profilePic,
            CoverPic: formData.coverPic,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Email: formData.email,
            ContactNumber: formData.contactNumber,
            About: formData.additionalInfo,
            JobTitle: formData.jobTitle,
            CompanyName: formData.company,
            StreetAddress: formData.address,
            Country: formData.country, // You may need to initialize this with the default country value
            City: formData.city,
            State: formData.state,
            PostCode: formData.postCode,
            Website: formData.website,
            FaceBook: formData.instagram,
            LinkedIn: formData.linkedin,
        }
        console.log(values)


        await axios.post("http://localhost:3001/auth/register", { email: formData.email, password: formData.password })
        const rsp = await axios.post("http://localhost:3001/users", values).then(res => res.data).catch(err => console.log(err))
        if (rsp && rsp.status == "success") {
            props.setUser(rsp?.user)
            navigate("/login");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className='Main m-5'>
            <h2>Registration Form<br /></h2>
            <p>
                Note that to modify shared data, you must initiate contact with the administrators, incurring an associated editing fee.
            </p>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="profilePic" className="form-label">
                        Profile Picture:
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="profilePic"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="coverPic" className="form-label">
                        Cover Picture:
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="coverPic"
                        name="coverPic"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {/* Display error message for invalid email */}
                    {!isValidEmail && (
                        <div className="invalid-feedback">Please enter a valid email address.</div>
                    )}
                </div>
                <div className="col-md-6">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Eg +44 7474747474"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="additionalInfo" className="form-label">
                        Additional Information (Character limit: 150)
                    </label>
                    <textarea
                        className="form-control"
                        id="additionalInfo"
                        name="additionalInfo"
                        rows="4"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="col-md-6">
                    <label htmlFor="jobTitle" className="form-label">Job Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="company" className="form-label">Company</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className={`form-control ${formData.password === formData.confirmPassword ? '' : 'is-invalid'}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {/* Display error message for password mismatch */}
                    {formData.password !== formData.confirmPassword && (
                        <div className="invalid-feedback">Passwords do not match.</div>
                    )}
                </div>

                <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="1234 Main St"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="address2" className="form-label">Address 2</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address2"
                        name="address2"
                        placeholder="Apartment, studio, or floor"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="country" className="form-label">
                        Country
                    </label>
                    {/* Replace the following Select component with your implementation */}
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-2">
                    <label htmlFor="postCode" className="form-label">PostCode</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postCode"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input
                        type="text"
                        className="form-control"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="instagram" className="form-label">FaceBook</label>
                    <input
                        type="text"
                        className="form-control"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="linkedin" className="form-label">Linkedin</label>
                    <input
                        type="text"
                        className="form-control"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="gridCheck1"
                            name="check1"
                            checked={formData.check1}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="gridCheck1">
                            Check me out
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="gridCheck2"
                            name="check2"
                            checked={formData.check2}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="gridCheck2">
                            To modify shared data, you must initiate contact with the administrators, incurring an associated editing fee.
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
