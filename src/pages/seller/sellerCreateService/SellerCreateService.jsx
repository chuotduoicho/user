import React from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerCreateService.scss";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Overview from "../../../components/seller/sellerCreateService/overview/Overview";
import Package from "../../../components/seller/sellerCreateService/package/Package";
import ProductImg from "../../../components/seller/sellerCreateService/productImg/ProductImg";
import Confirm from "../../../components/seller/sellerCreateService/confirm/Confirm";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  fetchServices,
  selectNewServiceId,
  selectServiceById,
  selectServiceId,
  updateService,
} from "../../../redux/serviceSlice";
import { selectCurrentUser } from "../../../redux/userSlice";
import Alert from "@material-ui/lab/Alert";
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
    marginBottom: "10px",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "T????ng quan",
    "Go??i di??ch vu??",
    "Sa??n ph????m th???? nghi????m",
    "Xa??c nh????n ta??o di??ch vu??",
  ];
}

export default function SellerCreateService() {
  const { serviceId } = useParams();
  const serviceDetail = useSelector((state) =>
    selectServiceById(state, serviceId)
  );
  console.log("service", serviceDetail);
  const currentUser = useSelector(selectCurrentUser);
  const newServiceId = useSelector(selectNewServiceId);
  console.log("new service id", newServiceId);
  // const sellerId = currentUser.seller.id;
  // const packages = [...serviceDetail.packages].sort(
  //   (a, b) => a.price - b.price
  // );
  const [title, setTitle] = useState(serviceId ? serviceDetail.title : "");
  const [description, setDescription] = useState(
    serviceId ? serviceDetail.description : ""
  );
  const [subCateId, setSubCateId] = useState(
    serviceId ? serviceDetail.subcategory.id : ""
  );
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeSubcateId = (e) => {
    setSubCateId(e.target.value);
  };
  const [packages, setPackages] = useState(
    serviceId
      ? serviceDetail.packages
      : [
          {
            title: "",
            shortDescription: "",
            deliveryTime: "",
            price: "",
            contractCancelFee: "",
          },
        ]
  );
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    if (!checked) {
      setPackages([
        ...packages,
        {
          title: "",
          shortDescription: "",
          deliveryTime: "",
          price: "",
          contractCancelFee: "",
        },
        {
          title: "",
          shortDescription: "",
          deliveryTime: "",
          price: "",
          contractCancelFee: "",
        },
      ]);
      setChecked((prev) => !prev);
    } else if (checked && packages.length > 1) {
      const list = [...packages];
      list.pop();
      list.pop();
      setPackages(list);
      setChecked((prev) => !prev);
    }
  };
  function handlePackageChange(e, index) {
    const { name, value } = e.target;
    const list = [...packages];
    list[index][name] = value;
    setPackages(list);
  }
  console.log("packages", packages);
  const [galley1, setGallery1] = useState(
    "https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA"
  );
  const [galley2, setGallery2] = useState(null);
  const [galley3, setGallery3] = useState(null);
  const [document, setDocument] = useState(null);
  const handleChangeGallery1 = (e) => {
    setGallery1(e.target.value);
  };
  const handleChangeGallery2 = (e) => {
    setGallery2(e.target.value);
  };
  const handleChangeGallery3 = (e) => {
    setGallery3(e.target.value);
  };
  const handleChangeDocument = (e) => {
    setDocument(e.target.value);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Overview
            title={handleChangeTitle}
            description={handleChangeDes}
            subCateId={handleChangeSubcateId}
            titleDf={title}
            descriptionDf={description}
            subCateIdDf={subCateId}
          />
        );
      case 1:
        return (
          <Package
            packages={packages}
            checked={checked}
            handleChange={handleChange}
            handlePackageChange={handlePackageChange}
          />
        );

      case 2:
        return (
          <ProductImg
            galley1={handleChangeGallery1}
            galley2={handleChangeGallery2}
            galley3={handleChangeGallery3}
            document={handleChangeDocument}
          />
        );
      case 3:
        return <Confirm />;
      default:
        return "Unknown step";
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const steps = getSteps();
  const navigate = useNavigate();
  const handleNext = () => {
    setError("");
    if (activeStep == 0) {
      if (title == "") {
        setError("Ch??a nh????p ti??u ??????!");
      } else if (description == "") {
        setError("Ch??a nh????p m?? ta??!");
      } else if (subCateId == "") {
        setError("Ch??a cho??n danh mu??c!");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setError("");
      }
    }

    if (activeStep == 1) {
      const check = packages.map((p, index) => {
        if (p.title == "") {
          setError("Ch??a nh????p ti??u ?????? go??i " + (index + 1));
          return false;
        } else if (p.shortDescription == "") {
          setError("Ch??a nh????p sa??n ph????m ba??n giao go??i " + (index + 1));
          return false;
        } else if (
          p.shortDescription.length < 20 ||
          p.shortDescription.length > 500
        ) {
          setError(
            "Sa??n ph????m ba??n giao pha??i t???? 20 ??????n 500 ki?? t???? go??i " + (index + 1)
          );
          return false;
        } else if (p.deliveryTime == "") {
          setError("Ch??a nh????p s???? nga??y ba??n giao go??i " + (index + 1));
          return false;
        } else if (p.price == "") {
          setError("Ch??a nh????p chi phi?? ba??n giao go??i " + (index + 1));
          return false;
        } else if (p.contractCancelFee == "") {
          setError("Ch??a nh????p phi?? hu??y ba??n giao go??i " + (index + 1));
          return false;
        } else if (index == packages.length - 1) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });

      console.log("check", check);
    }

    if (activeStep == 2) {
      // if (title1 == "") {
      //   setError("Ch??a nh????p ti??u ??????!");
      // } else if (description1 == "") {
      //   setError("Ch??a nh????p sa??n ph????m ba??n giao!");
      // } else if (subCateId == "") {
      //   setError("Ch??a cho??n danh mu??c!");
      // } else {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      //   setError("");
      // }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setError("");
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dispath = useDispatch();

  const handleCreateActive = (e) => {
    e.preventDefault();
    const newService = {
      title: title,
      description: description,
      impression: 2,
      interesting: 2,
      status: "ACTIVE",
      subCategory: {
        id: subCateId,
      },
      gallery: {
        imageGallery1: galley1,
      },
      packages: packages,
    };
    console.log("new service ", newService);
    dispath(addService(newService))
      .unwrap()
      .then(() => {
        setSuccess("Ta??o di??ch vu?? tha??nh c??ng!");
        dispath(fetchServices());
      })
      .catch(() => {
        setError("Ta??o di??ch vu?? th????t ba??i !");
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleCreateDeactive = (e) => {
    e.preventDefault();
    const newService = {
      title: title,
      description: description,
      impression: 2,
      interesting: 2,
      status: "DEACTIVE",
      subCategory: {
        id: subCateId,
      },
      gallery: {
        imageGallery1: galley1,
      },
      packages: packages,
    };
    console.log("new service ", newService);
    dispath(addService(newService))
      .unwrap()
      .then(() => {
        setSuccess("Ta??o di??ch vu?? tha??nh c??ng!");
        dispath(fetchServices());
      })
      .catch(() => {
        setError("Ta??o di??ch vu?? th????t ba??i !");
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleUpdateService = (e) => {
    e.preventDefault();
    const newService = {
      title: title,
      description: description,
      impression: 2,
      interesting: 2,
      subCategory: {
        id: subCateId,
      },
      gallery: {
        imageGallery1: galley1,
      },
    };
    const obj = { service: newService, serviceId };
    dispath(updateService(obj))
      .unwrap()
      .then(() => {
        console.log("add service successfull");
        dispath(fetchServices());
      })
      .catch(() => {
        console.log("add service fail");
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleView = () => {
    navigate("/sellerHome/serviceDetail/" + newServiceId);
  };

  return (
    <div className="sellerHome">
      <SellerHeader />
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ textAlign: "center" }}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              T????t ca?? ca??c b??????c ??a?? hoa??n tha??nh
            </Typography>
            <Button onClick={handleView} className={classes.button}>
              Xem chi ti????t di??ch vu??
            </Button>
            {error !== "" && <Alert severity="error">{error}</Alert>}
            {success !== "" && <Alert severity="success">{success}</Alert>}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Tr???? la??i
              </Button>
              {activeStep === steps.length - 1 ? (
                <>
                  {serviceId ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateService}
                      className={classes.button}
                    >
                      C????p nh????t
                    </Button>
                  ) : (
                    <>
                      {" "}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateDeactive}
                        className={classes.button}
                      >
                        Ta??o m????i va?? ta??m d????ng
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateActive}
                        className={classes.button}
                      >
                        Ta??o m????i va?? m????
                      </Button>{" "}
                    </>
                  )}
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Ti????p tu??c
                </Button>
              )}
              {error !== "" && <Alert severity="error">{error}</Alert>}
              {success !== "" && <Alert severity="success">{success}</Alert>}
            </div>
          </div>
        )}
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
