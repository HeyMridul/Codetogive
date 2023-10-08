import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    maxWidth: "430px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "arial",
    border: "#000000",
  },
  coverImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    position: "absolute",
    top: "170px",
    left: "calc(50% - 60px)",
    border: "4px solid #fff",
  },
  h1: {
    marginTop: "100px",
  },
  title: {
    color: "grey",
    fontSize: "18px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  btns: {
      borderRadius: "10px",
      color: "rgb(255, 255, 255)",
      margin: "2px",
      width: "80%",
      display: "inline-block",
      backgroundColor: "#000",
      border: "none",
      outline: "none",
      padding: "8px",
      cursor: "pointer",
      fontSize: "18px",
  },
  btns2: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "2px",
    marginRight: "2px",
  },

  btn: {
    border: "none",
    outline: "none",
    padding: "8px",
    color: "white",
    backgroundColor: "#000",
    textAlign: "center",
    cursor: "pointer",
    width: "48%",
    fontSize: "18px",
    margin: "7px",
  },
};

const Profile = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const downloadContact = () => {
    const blob = new Blob([`BEGIN:VCARD
    VERSION:3.0
    N:${data.FirstName + ' ' + data.LastName}
    ORG:${data.CompanyName}
    TEL:${data.ContactNumber}
    EMAIL:${data.Email}
    END:VCARD`], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

  useEffect(() => {
    (async () => {
      if (!props.user) {
        navigate("/login");
      } 
      else {
        const rsp = await axios
          .get(`http://localhost:3001/users/${props.user.email}`)
          .then((res) => res.data)
          .catch((err) => console.log(err));
        setData(rsp?.user);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;
  console.log(data)
  return (
    <div>
      <div style={styles.card}>
        <img style={styles.coverImage} src={data.CoverPic} alt="Cover Pic" />
        <img style={styles.profileImage} src={data.ProfilePic} alt= "Profile Picture"/>

        <h1 style={styles.h1}>{data.FirstName + ' ' + data.LastName}</h1>
        <p>{data.JobTitle}<br/>
        <b>{data.CompanyName}</b></p>
        <p style={styles.title}>{data.About}</p>
        <p >
          <a href={`sms:${data.ContactNumber}`} style={styles.btns}>Send message</a>
          <a href={`http://${data.Website}`} target="_blank" rel="noopener noreferrer">
            <button style={styles.btns}>Website</button>
          </a>
          <a href={data.FaceBook} target="_blank" rel="noopener noreferrer">
            <button style={styles.btns}>FaceBook</button>
          </a>
          <a href={data.LinkedIn} target="_blank" rel="noopener noreferrer">
            <button style={styles.btns}>LinkedIn</button>
          </a>
        </p>
        <div style={styles.btns2}>
          <button onClick={downloadContact} style={styles.btn}>Save Contact</button>
          <a href={`tel:${data.ContactNumber}`} style={styles.btn} >Call</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
