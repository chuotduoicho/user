import React, { useEffect, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerProfile.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  selectCurrentUser,
  updateUserProfile,
} from "../../../redux/userSlice";
import { clearMessage } from "../../../redux/message";
function format(date) {
  date = new Date(date);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return year + "-" + month + "-" + day;
}
export default function BuyerProfile() {
  const currentUser = useSelector(selectCurrentUser);
  const [successful, setSuccessful] = useState(false);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [gender, setGender] = useState(currentUser.gender);
  const [birthDate, setBirthDate] = useState(format(currentUser.birthDate));
  const [phone, setPhone] = useState(currentUser.phoneNumber);
  const [address, setAddress] = useState(currentUser.country);
  const [city, setCity] = useState(currentUser.city);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { message } = useSelector((state) => state.message);
  const [error, setError] = useState("");
  const [isChange, setIsChange] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const handleUpdate = () => {
    const id = currentUser.id;
    setSuccessful(false);
    setError("");
    if (!/^[0-9]\d{9}$/.test(phone)) {
      setError("S???? ??i????n thoa??i pha??i co?? ?????? da??i 10 s????!");
    } else {
      dispatch(
        updateUserProfile({
          id,
          firstName,
          lastName,
          gender,
          birthDate,
          phone,
          address,
          city,
        })
      )
        .unwrap()
        .then(() => {
          setSuccessful(true);
          setError("C????p nh????t th??ng tin tha??nh c??ng!");
        })
        .catch(() => {
          setSuccessful(false);
          <Alert severity="error">C????p nh????t th????t ba??i!</Alert>;
        });
    }
  };
  const handleChangePassword = () => {
    dispatch(clearMessage());
    setSuccessful(false);
    if (newPassword.length < 6) {
      setError("M????t kh????u pha??i co?? i??t nh????t 6 ki?? t????!");
    } else if (confirmPassword != newPassword) {
      setError("Xa??c nh????n m????t kh????u pha??i tru??ng v????i m????t kh????u!");
    } else {
      console.log({ oldPassword, newPassword, confirmPassword });
      dispatch(changePassword({ oldPassword, newPassword, confirmPassword }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(format(currentUser.birthDate));
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Th??ng tin ca?? nh??n</h1>
      <div className="sections_profile">
        <Container maxWidth="sm" className="form">
          <div className="form_left">
            <Avatar
              className="image"
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            />
            <TextField
              required
              id="standard-required"
              className="text_field"
              type="file"
            />
          </div>
          <div className="form_right">
            <div className="form_right_row">
              <TextField
                id="outlined-basic"
                label="Ho??"
                variant="outlined"
                className="form_right_row_input"
                defaultValue={currentUser.firstName}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setIsChange(false);
                }}
              />

              <TextField
                id="outlined-basic"
                label="T??n"
                variant="outlined"
                className="form_right_row_input"
                defaultValue={currentUser.lastName}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setIsChange(false);
                }}
              />
              <FormControl
                component="fieldset"
                className="form_right_row_input"
              >
                <FormLabel component="legend">Gi????i ti??nh</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  defaultValue={gender}
                  className="form_right_row_input_radio"
                  onChange={(e) => {
                    setGender(e.target.value);
                    setIsChange(false);
                  }}
                >
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio />}
                    label="N????"
                  />

                  {/* <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  /> */}
                </RadioGroup>
              </FormControl>
            </div>
            <div className="form_right_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                className="form_right_row_input"
                defaultValue={currentUser.email}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="S???? ??i????n thoa??i"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                className="form_right_row_input"
                defaultValue={currentUser.phoneNumber}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setIsChange(false);
                }}
                type="number"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="date"
                label="Nga??y sinh"
                InputLabelProps={{
                  shrink: true,
                }}
                className="form_right_row_input"
                defaultValue={format(currentUser.birthDate)}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setIsChange(false);
                }}
              />
            </div>
            <div className="form_right_row">
              <TextField
                id="outlined-basic"
                label="Tha??nh ph????"
                variant="outlined"
                className="form_right_row_input_country"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUser.country}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setIsChange(false);
                }}
              />
              <TextField
                id="outlined-basic"
                label="??i??a chi??"
                variant="outlined"
                className="form_right_row_input_adress"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUser.city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setIsChange(false);
                }}
              />
            </div>
            <div className="form_right_row">
              <Button
                variant="contained"
                color="primary"
                className="form_right_row_btn"
                onClick={handleUpdate}
                disabled={isChange}
              >
                C????p nh????t
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="form_right_row_btn"
                onClick={handleOpen}
              >
                ??????i m????t kh????u
              </Button>
            </div>

            {open ? (
              <div className="form_right_row">
                {" "}
                <TextField
                  className="input"
                  variant="outlined"
                  type="password"
                  label="M????t kh????u cu??"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <TextField
                  className="input"
                  variant="outlined"
                  type="password"
                  label="M????t kh????u m????i"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <TextField
                  className="input"
                  variant="outlined"
                  type="password"
                  label="Xa??c nh????n m????t kh????u"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  className="btn"
                  color="primary"
                  style={{ height: "55px" }}
                  onClick={handleChangePassword}
                >
                  Xa??c nh????n
                </Button>
              </div>
            ) : (
              ""
            )}
            <div className="form_right_row">
              {message && (
                <div
                  className={successful ? "login_success" : "login_error"}
                  role="alert"
                >
                  {message}
                </div>
              )}
              {error != "" && (
                <div
                  className={successful ? "login_success" : "login_error"}
                  role="alert"
                >
                  {error}
                </div>
              )}
            </div>
          </div>
        </Container>

        <Contact />
      </div>
    </div>
  );
}
