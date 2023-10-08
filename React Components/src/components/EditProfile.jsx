import { useState } from "react";
import axios from "axios";
import { useSpring, animated } from 'react-spring';

const EditProfile = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }, 
  });

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({ ProfilePic: false, CoverPic: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFiles = (e) => {
    const { name, files } = e.target;

    setErrors({ ...errors, [name]: false });

    if (Array.isArray(files) && files[0].size > 2097152)
      return setErrors({ ...errors, [name]: true });

    setValues({ ...values, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(values);
  
    let formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    const rsp = await axios
      .post("http://localhost:3001/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: "Infinity",
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    console.log(rsp);
  };

  return (
    <animated.div style={{ ...fadeIn }}>
    <div className="d-flex justify-content-center py-4">
      <form
        className="text-center border rounded px-5 py-3 bg-body-tertiary"
        style={{ minWidth: "70%" }}
        onSubmit={handleSubmit}
      >
        <h1 className="h3 mb-2 fw-normal">Personal Details</h1>
        <div className="row g-2 my-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="FirstName"
                placeholder="FirstName"
                name="FirstName"
                onChange={handleChange}
              />
              <label htmlFor="FirstName">First Name</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="LastName"
                placeholder="LastName"
                name="LastName"
                onChange={handleChange}
              />
              <label htmlFor="LastName">Last Name</label>
            </div>
          </div>
        </div>
        <div className="row g-2 my-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="JobTitle"
                placeholder="JobTitle"
                name="JobTitle"
                onChange={handleChange}
              />
              <label htmlFor="JobTitle">Job Title</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="CompanyName"
                placeholder="CompanyName"
                name="CompanyName"
                onChange={handleChange}
              />
              <label htmlFor="CompanyName">Company Name</label>
            </div>
          </div>
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control shadow-none"
            id="About"
            placeholder="About"
            name="About"
            onChange={handleChange}
          />
          <label htmlFor="About">About</label>
        </div>
        <div className="row g-2 my-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="email"
                className="form-control shadow-none"
                id="Email"
                placeholder="Email"
                name="Email"
                onChange={handleChange}
              />
              <label htmlFor="Email">Email</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="ContactNumber"
                placeholder="ContactNumber"
                name="ContactNumber"
                onChange={handleChange}
              />
              <label htmlFor="ContactNumber">Contact Number</label>
            </div>
          </div>
        </div>
        <div className="form-floating mt-3">
          <input
            type="url"
            className="form-control shadow-none"
            id="Website"
            placeholder="Website"
            name="Website"
            onChange={handleChange}
          />
          <label htmlFor="Website">Website</label>
        </div>
        <div className="row g-2 my-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="FaceBook"
                placeholder="FaceBook"
                name="FaceBook"
                onChange={handleChange}
              />
              <label htmlFor="FaceBook">FaceBook</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="LinkedIn"
                placeholder="LinkedIn"
                name="LinkedIn"
                onChange={handleChange}
              />
              <label htmlFor="LinkedIn">LinkedIn</label>
            </div>
          </div>
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control shadow-none"
            id="StreetAddress"
            placeholder="StreetAddress"
            name="StreetAddress"
            onChange={handleChange}
          />
          <label htmlFor="StreetAddress">Street Address</label>
        </div>
        <div className="row g-2 my-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="City"
                placeholder="City"
                name="City"
                onChange={handleChange}
              />
              <label htmlFor="City">City</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="State"
                placeholder="State"
                name="State"
                onChange={handleChange}
              />
              <label htmlFor="State">State</label>
            </div>
          </div>
        </div>
        <div className="row g-2 my-2">
          <div className="col-md">
            <div className="form-floating">
              <select
                className="form-select shadow-none"
                id="Country"
                name="Country"
                onChange={handleChange}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <label htmlFor="Country">Country</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control shadow-none"
                id="PostCode"
                placeholder="PostCode"
                name="PostCode"
                onChange={handleChange}
              />
              <label htmlFor="PostCode">Post Code</label>
            </div>
          </div>
        </div>
        <div className="row g-2 my-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="file"
                className={`form-control shadow-none ${
                  errors.ProfilePic && "is-invalid"
                }`}
                id="ProfilePic"
                placeholder="ProfilePic"
                name="ProfilePic"
                onChange={handleFiles}
              />
              <label htmlFor="ProfilePic">
                Profile Picture &#40;max. 2MB&#41;
              </label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="file"
                className={`form-control shadow-none ${
                  errors.CoverPic && "is-invalid"
                }`}
                id="CoverPic"
                placeholder="CoverPic"
                name="CoverPic"
                onChange={handleFiles}
              />
              <label htmlFor="CoverPic">Cover Picture &#40;max. 2MB&#41;</label>
            </div>
          </div>
        </div>
        <button className="btn btn-lg btn-success px-5 py-2 mt-3" type="submit">
          Save
        </button>
      </form>
    </div>
    </animated.div>
  );
};

const countries = [
  "Afghanistan",
  "Aland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, The Democratic Republic of The",
  "Cook Islands",
  "Costa Rica",
  "Cote D'ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-bissau",
  "Guyana",
  "Haiti",
  "Heard Island and Mcdonald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia, The Former Yugoslav Republic of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territory, Occupied",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Pierre and Miquelon",
  "Saint Vincent and The Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and The South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default EditProfile;
