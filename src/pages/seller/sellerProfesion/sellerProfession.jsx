import React, { useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerProfession.scss";

import { Button, Container, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { Add, Delete } from "@material-ui/icons";
import { fetchCurrentUser, joinSeller } from "../../../redux/userSlice";
import Alert from "@material-ui/lab/Alert";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";

export default function SellerProfession() {
  // const currentUser = useSelector(selectCurrentUser);
  const [descriptionBio, setDescriptionBio] = useState("");
  const [brandName, setBrandName] = useState("");
  const [skills, setSkills] = useState([]);
  const [edus, setEdus] = useState([
    { title: "", universityName: "", fromDate: "", major: "", toDate: "" },
  ]);

  const [certificates, setCertificates] = useState([
    { title: "", name: "", linkCer: "" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setSkills([...skills, { name: value }]);
    e.target.value = "";
  }

  function removeSkill(index) {
    setSkills(skills.filter((el, i) => i !== index));
  }

  const handleEduChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...edus];
    list[index][name] = value;
    setEdus(list);
  };

  const handleEduAdd = () => {
    setEdus([
      ...edus,
      { title: "", universityName: "", major: "", fromDate: "", toDate: "" },
    ]);
  };

  const handleEduRemove = (index) => {
    const list = [...edus];
    list.splice(index, 1);
    setEdus(list);
  };
  const handleCerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...certificates];
    list[index][name] = value;
    setCertificates(list);
  };

  const handleCerAdd = () => {
    setCertificates([...certificates, { title: "", name: "", linkCer: "" }]);
  };

  const handleCerRemove = (index) => {
    const list = [...certificates];
    list.splice(index, 1);
    setCertificates(list);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const info = {
    descriptionBio: descriptionBio,
    brandName: brandName,
    skills: skills,
    educations: edus,
    certificates: certificates,
  };
  const handleSaveInfo = () => {
    setError("");
    setSuccess("");
    console.log("brandName", brandName);
    console.log("descriptionBio", descriptionBio);
    console.log("skills", skills);
    console.log("edus", edus);
    console.log("certificates", certificates);
    let check = true;
    if (descriptionBio == "") {
      setError("Ch??a nh????p l????i gi????i thi????u !");
      check = false;
      return;
    } else if (brandName == "") {
      setError("Ch??a nh????p t??n th????ng hi????u !");
      check = false;
      return;
    } else if (skills.length == 0) {
      setError("Ch??a nh????p ki?? n??ng !");
      check = false;
      return;
    } else {
      edus.map((item, index) => {
        if (item.title == "") {
          setError("Ch??a nh????p ti??u ?????? cu??a ho??c v????n " + parseInt(index + 1));
          check = false;
          return;
        } else if (item.universityName == "") {
          setError("Ch??a nh????p t??n tr??????ng cu??a ho??c v????n " + parseInt(index + 1));
          check = false;
          return;
        } else if (item.major == "") {
          setError("Ch??a nh????p t??n nga??nh cu??a ho??c v????n " + parseInt(index + 1));
          check = false;
          return;
        } else if (item.fromDate == "") {
          setError("Ch??a nh????p nga??y b????t ??????u cu??a ho??c v????n " + parseInt(index + 1));
          check = false;
          return;
        } else if (item.toDate == "") {
          setError(
            "Ch??a nh????p nga??y k????t thu??c cu??a ho??c v????n " + parseInt(index + 1)
          );
          check = false;
          return;
        }
      });
      certificates.map((item, index) => {
        if (item.title == "") {
          setError("Ch??a nh????p ti??u ?????? cu??a ch????ng chi?? " + parseInt(index + 1));
          check = false;
          return;
        } else if (item.name == "") {
          setError("Ch??a nh????p t??n cu??a ch????ng chi?? " + parseInt(index + 1));
          check = false;
          return;
        } else if (item.linkCer == "") {
          setError("Ch??a nh????p link cu??a ch????ng chi?? " + parseInt(index + 1));
          check = false;
          return;
        }
      });
    }
    if (check) {
      dispatch(joinSeller(info))
        .unwrap()
        .then(() => {
          // setSuccessful(true);
          dispatch(fetchCurrentUser());
          navigate("/sellerHome/createService");
        })

        .catch(() => {
          setError("L??u th??ng tin th????t ba??i");
        });
    }
  };
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Th??ng tin n??ng cao</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Gi????i thi????u"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setDescriptionBio(e.target.value)}
          />
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="T??n th????ng hi????u"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>
        <div className="profession_row">
          {" "}
          {/* <h2>Ki?? n??ng</h2> */}
          <div className="tags-input-container">
            {skills.map((skill, index) => (
              <div className="tag-item" key={index}>
                <span className="text">{skill.name}</span>
                <span className="close" onClick={() => removeSkill(index)}>
                  &times;
                </span>
              </div>
            ))}
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className="tags-input"
              placeholder="Nh????p ki?? n??ng"
            />
          </div>
        </div>
        <div
          className="profession_row"
          style={{ border: "2px solid  rgb(238, 225, 225)" }}
        >
          <h2 style={{ marginTop: "10px" }}>
            Ho??c v????n{" "}
            <Button
              variant="contained"
              style={{ marginBottom: "10px" }}
              onClick={handleEduAdd}
            >
              Th??m <Add />
            </Button>
          </h2>
          {edus.map((edu, index) => (
            <div className="profession_row_item">
              <TextField
                id="outlined-basic"
                label="Ti??u ??????"
                variant="outlined"
                style={{ width: "29%" }}
                name="title"
                onChange={(e) => handleEduChange(e, index)}
              />

              <TextField
                id="outlined-basic"
                label="Tr??????ng"
                variant="outlined"
                name="universityName"
                style={{ width: "25%" }}
                onChange={(e) => handleEduChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="Nga??nh"
                variant="outlined"
                name="major"
                style={{ width: "20%" }}
                onChange={(e) => handleEduChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="N??m b????t ??????u "
                variant="outlined"
                type="date"
                style={{ width: "10%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="fromDate"
                onChange={(e) => handleEduChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="N??m t????t nghi????p "
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "10%" }}
                name="toDate"
                onChange={(e) => handleEduChange(e, index)}
              />
              {edus.length !== 1 && (
                <Button
                  variant="contained"
                  style={{ width: "5%", height: "55px" }}
                  onClick={() => handleEduRemove(index)}
                >
                  Xo??a <Delete />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div
          className="profession_row"
          style={{ border: "2px solid  rgb(238, 225, 225)" }}
        >
          {" "}
          <h2 style={{ marginTop: "10px" }}>
            Ch????ng chi??{" "}
            <Button
              variant="contained"
              style={{ marginBottom: "10px" }}
              onClick={handleCerAdd}
            >
              {" "}
              Th??m <Add />
            </Button>
          </h2>
          {certificates.map((cer, index) => (
            <div className="profession_row_item">
              <TextField
                id="outlined-basic"
                label="N????i dung"
                variant="outlined"
                style={{ width: "20%" }}
                name="title"
                onChange={(e) => handleCerChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="T??n ch????ng chi??"
                variant="outlined"
                style={{ width: "20%" }}
                name="name"
                onChange={(e) => handleCerChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="N??m"
                variant="outlined"
                style={{ width: "10%" }}
              />
              <TextField
                id="outlined-basic"
                label="Li??n k????t"
                variant="outlined"
                style={{ width: "40%" }}
                name="linkCer"
                onChange={(e) => handleCerChange(e, index)}
              />
              <Button
                variant="contained"
                style={{ width: "10%", height: "55px" }}
                onClick={() => handleCerRemove(index)}
              >
                Xo??a <Delete />
              </Button>
            </div>
          ))}
        </div>
        <div className="profession_row">
          {" "}
          <Button variant="contained" color="primary" onClick={handleSaveInfo}>
            L??u th??ng tin
          </Button>
        </div>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
