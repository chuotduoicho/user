import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  makeStyles,
  Toolbar,
  Typography,
  List,
  ListItem,
  InputAdornment,
  ListItemText,
  ListItemAvatar,
  Avatar,
  FormControl,
} from "@material-ui/core";
import { Close, CloudUpload, AddSharp, RemoveSharp } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import { selectAllCategories } from "../../../redux/categorySlice";
import { addRequest, fetchRequestsBuyer } from "../../../redux/requestSlice";

import { selectTopSellers } from "../../../redux/userSlice";
import "./buyerCreateRequest.scss";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function BuyerCreateRequest() {
  const topSeller = useSelector(selectTopSellers);
  const listCategory = useSelector(selectAllCategories);
  const [cateId, setCateId] = useState(listCategory[0].id);
  const [subCateId, setSubCateId] = useState("");
  const [recruitLevel, setRecruitLevel] = useState("BEGINNER");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [inviteUsers, setInviteUsers] = useState([]);
  const [stages, setStages] = useState([
    { startDate: "", endDate: "", description: "", milestoneFee: 0 },
  ]);
  const [cancleFee, setCancleFee] = useState(0);
  const request = {
    categoryId: cateId,
    subCategoryId: subCateId,
    recruitLevel: recruitLevel,
    skillsName: skills,
    jobTitle: jobTitle,
    shortRequirement: description,
    milestoneContracts: stages,
    contractCancelFee: cancleFee,
    invitedUsers: inviteUsers,
  };
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // ssssssss
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setError("");
    let check1 = false;
    let check2 = true;
    let check3 = true;
    stages.map((item, index) => {
      if (item.startDate == "") {
        check3 = false;
        setError("Ch??a nh????p nga??y b????t ??????u cu??a giai ??oa??n " + parseInt(index + 1));
      } else if (item.endDate == "") {
        check3 = false;
        setError(
          "Ch??a nh????p nga??y k????t thu??c cu??a giai ??oa??n " + parseInt(index + 1)
        );
      } else if (item.description == "") {
        check3 = false;
        setError(
          "Ch??a nh????p sa??n ph????m ba??n giao cu??a giai ??oa??n " + parseInt(index + 1)
        );
      } else if (item.milestoneFee == 0) {
        check3 = false;
        setError("Ch??a nh????p chi phi?? cu??a giai ??oa??n " + parseInt(index + 1));
      }
    });
    if (subCateId == "") {
      setError("Ch??a cho??n danh mu??c con!");
    } else if (jobTitle == "") {
      setError("Ch??a nh????p ti??u ??????!");
    } else if (description == "") {
      setError("Ch??a nh????p m?? ta??!");
    } else if (cancleFee == 0) {
      setError("Ch??a nh????p phi?? hu??y h????p ??????ng!");
    } else {
      check1 = true;

      skills.map((item, index) => {
        if (item == "") {
          check2 = false;
          setError("Ch??a nh????p ki?? n??ng " + parseInt(index + 1));
        }
      });
    }

    if (check2 && check1 && check3) {
      setOpen(true);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(addRequest(request))
      .unwrap()
      .then(() => {
        dispatch(fetchRequestsBuyer());
        setSuccess("Ta??o y??u c????u tha??nh c??ng!");
      })
      .catch(() => {
        setError("Ta??o y??u c????u th????t ba??i!");
      });
    setOpen(false);
  };

  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const handleFullScreenOpen = () => {
    setFullScreenOpen(true);
  };
  const handleFullScreenClose = (e) => {
    e.preventDefault();
    dispatch(addRequest(request))
      .unwrap()
      .then(() => {
        dispatch(fetchRequestsBuyer());
        setSuccess("Ta??o y??u c????u tha??nh c??ng!");
      })
      .catch(() => {
        setError("Ta??o y??u c????u th????t ba??i!");
      });
    setFullScreenOpen(false);
    setOpen(false);
  };

  const handleStageChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index][name] = value;
    setStages(list);
  };

  const handleStageAdd = () => {
    setStages([
      ...stages,
      { startDate: "", endDate: "", description: "", milestoneFee: 0 },
    ]);
  };

  const handleStageRemove = () => {
    if (stages.length > 1) {
      const list = [...stages];
      list.pop();
      setStages(list);
    }
  };

  console.log("inviteUsers", inviteUsers);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setSkills([...skills, value]);
    e.target.value = "";
  }

  function removeSkill(index) {
    setSkills(skills.filter((el, i) => i !== index));
  }

  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Ta??o y??u c????u</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          <TextField
            id="outlined-select-currency"
            select
            label="Cho??n danh mu??c"
            value={cateId}
            onChange={(e) => setCateId(e.target.value)}
            style={{ width: "30%", margin: "10px" }}
            variant="outlined"
          >
            {listCategory.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Cho??n danh mu??c con"
            value={subCateId}
            onChange={(e) => setSubCateId(e.target.value)}
            style={{ width: "30%", margin: "10px" }}
            variant="outlined"
          >
            {listCategory
              .find((val) => {
                return val.id == cateId;
              })
              .subCategories.map((subCategory, index) => (
                <MenuItem key={index} value={subCategory.id}>
                  {subCategory.name}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-select-currency"
            select
            label="Tri??nh ?????? ng??????i ba??n"
            defaultValue="BEGINNER"
            name="level"
            onChange={(e) => setRecruitLevel(e.target.value)}
            style={{ width: "23%", margin: "10px" }}
            variant="outlined"
          >
            <MenuItem value="BEGINNER">BEGINNER</MenuItem>
            <MenuItem value="ADVANCED">ADVANCED</MenuItem>
            <MenuItem value="COMPETENT">COMPETENT</MenuItem>
            <MenuItem value="PROFICIENT">PROFICIENT</MenuItem>
            <MenuItem value="EXPERT">EXPERT</MenuItem>
          </TextField>
          <div className="tags-input-container">
            {skills.map((skill, index) => (
              <div className="tag-item" key={index}>
                <span className="text">{skill}</span>

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
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Ti??u ??????"
            variant="outlined"
            style={{ width: "62%" }}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="M?? ta??"
            variant="outlined"
            multiline
            rows={6}
            style={{ width: "62%" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="profession_row">
          {" "}
          <FormControl className="request_form_control">
            <input
              accept="image/*,.doc,.docx,.xlsx,.xls,.csv,.pdf,text/plain"
              className="request_form_input"
              id="request-input-file"
              multiple
              type="file"
              hidden
            />
            <label htmlFor="request-input-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUpload />}
              >
                FILE ????NH K??M
              </Button>
            </label>{" "}
          </FormControl>
        </div>
        <div className="profession_row">
          {" "}
          <Button style={{ height: "70px" }} onClick={handleStageRemove}>
            <RemoveSharp />
          </Button>
          <TextField
            id="outlined-basic"
            label="S???? giai ??oa??n"
            variant="outlined"
            type="number"
            value={stages.length}
            style={{ width: "8%", margin: "10px" }}
            disabled
          />
          <Button style={{ height: "70px" }} onClick={handleStageAdd}>
            <AddSharp />
          </Button>
        </div>
        {stages.map((stage, index) => (
          <div className="profession_itemStage" key={index}>
            <div className="profession_row">
              {stages.length > 1 && <h3>Giai ??oa??n {index + 1}</h3>}
            </div>
            <div className="profession_row">
              <TextField
                id="outlined-basic"
                label="Nga??y b????t ??????u"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "30%", margin: "10px" }}
                name="startDate"
                onChange={(e) => handleStageChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="Nga??y k????t thu??c"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "30%", margin: "10px" }}
                name="endDate"
                onChange={(e) => handleStageChange(e, index)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Sa??n ph????m ba??n giao"
                variant="outlined"
                multiline
                rows={3}
                style={{ width: "62%" }}
                name="description"
                onChange={(e) => handleStageChange(e, index)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Chi phi??"
                variant="outlined"
                type="number"
                style={{ width: "30%", margin: "10px" }}
                inputProps={{ min: 0 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
                name="milestoneFee"
                onChange={(e) => handleStageChange(e, index)}
              />
            </div>
          </div>
        ))}
        <div className="profession_row">
          <Typography variant="h4">
            T????ng chi phi?? :{" "}
            {stages.reduce(
              (total, item) => total + parseInt(item.milestoneFee),
              0
            )}{" "}
            $
          </Typography>
          <TextField
            id="outlined-basic"
            label="Phi?? hu??y h????p ??????ng"
            variant="outlined"
            type="number"
            style={{ width: "30%", margin: "10px" }}
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  % T????ng chi phi?? (={" "}
                  {(stages.reduce(
                    (total, item) => total + parseInt(item.price),
                    0
                  ) *
                    cancleFee) /
                    100}
                  $)
                </InputAdornment>
              ),
            }}
            onChange={(e) => setCancleFee(e.target.value)}
          />
        </div>
        <div className="profession_row">
          {" "}
          <Button
            variant="contained"
            color="primary"
            className="form_right_row_btn"
            onClick={handleOpen}
          >
            G????i y??u c????u
          </Button>
        </div>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="dialod-title">
            {"B???n c?? mu???n g???i l???i ?????n ng?????i b??n kh??ng?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Y??u c???u ???? ???????c t???o th??nh c??ng!H??y g???i l???i m???i ?????n nh???ng ng?????i b??n
              ti???m n??ng ch??ng t??i t??m ???????c.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Kh??ng</Button>
            <Button onClick={handleFullScreenOpen} color="primary">
              C??
            </Button>
            <Dialog
              fullScreen
              open={fullScreenOpen}
              onClose={handleFullScreenClose}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleFullScreenClose}
                    aria-label="close"
                  >
                    <Close />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Ng?????i b??n ti???m n??ng
                  </Typography>
                  <Button color="inherit" onClick={handleFullScreenClose}>
                    Ho??n th??nh
                  </Button>
                </Toolbar>
              </AppBar>
              <List
                style={{
                  width: "50%",
                  margin: "0 auto",
                  border: " 2px solid rgb(238, 225, 225)",
                }}
              >
                {topSeller.map((item, index) => {
                  return (
                    <ListItem button key={index}>
                      <ListItemAvatar>
                        <Avatar alt="buyer image" src={item.user.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.user.firstName + " " + item.user.lastName}
                        secondary={item.skills.map((skill) => skill.name)}
                      />

                      {inviteUsers.find((i) => i.id === item.user.id) ? (
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() =>
                            setInviteUsers(
                              inviteUsers.filter((el) => el.id !== item.user.id)
                            )
                          }
                        >
                          Hoa??n ta??c
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            setInviteUsers([
                              ...inviteUsers,
                              { id: item.user.id },
                            ])
                          }
                        >
                          M????i
                        </Button>
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </Dialog>
          </DialogActions>
        </Dialog>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
