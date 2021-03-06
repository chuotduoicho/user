import { React, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./serviceDetail.scss";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, ButtonGroup } from "@material-ui/core";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  selectServiceById,
  updateService,
} from "../../../redux/serviceSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function SellerServiceDetail() {
  const { serviceId } = useParams();
  const serviceDetail = useSelector((state) =>
    selectServiceById(state, serviceId)
  );
  console.log("service", serviceDetail);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [selected, setSelected] = useState(false);

  console.log(selected);
  const dispatch = useDispatch();
  const handlePauseService = () => {
    const service = {
      title: serviceDetail.title,
      description: serviceDetail.description,
      status: "DEACTIVE",
    };
    const obj = { service, serviceId };
    dispatch(updateService(obj))
      .unwrap()
      .then(() => {
        // console.log("add service successfull");
        dispatch(fetchServices());
      })
      .catch(() => {
        console.log("update service fail");
      });
  };
  const handleOpenService = () => {
    const service = {
      title: serviceDetail.title,
      description: serviceDetail.description,
      status: "ACTIVE",
    };
    const obj = { service, serviceId };
    console.log(obj);
    dispatch(updateService(obj))
      .unwrap()
      .then(() => {
        // console.log("add service successfull");
        dispatch(fetchServices());
      })
      .catch(() => {
        console.log("update service fail");
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const navigate = useNavigate();
  const packages = [...serviceDetail.packages].sort(
    (a, b) => a.price - b.price
  );
  return (
    <div className="service_detail">
      <SellerHeader />
      <div className="service_detail2">
        <div className="detail_left">
          <h2>{serviceDetail.title}</h2>
          <div className="seller_header">
            <img
              src={
                serviceDetail.avatar
                  ? serviceDetail.avatar
                  : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
              }
              alt=""
              className="avatar"
            />
            <p>
              {serviceDetail.firstName} {serviceDetail.lastName} |{" "}
              {serviceDetail.rankSeller} | T????ng s???? ????n:{" "}
              {serviceDetail.totalOrder}
            </p>
          </div>
          <img
            src={
              serviceDetail.gallery.imageGallery1
                ? serviceDetail.gallery.imageGallery1
                : "https://elements-video-cover-images-0.imgix.net/files/127924249/previewimg.jpg?auto=compress&crop=edges&fit=crop&fm=jpeg&h=800&w=1200&s=13978d17ddbcd5bafe3a492797e90465"
            }
            alt=""
          ></img>
          <h2>M?? ta??</h2>
          <p>{serviceDetail.description}</p>
          <h2>Bi??nh lu????n && ??a??nh gia??</h2>
          <Paper style={{ padding: "40px 20px", marginBottom: "30px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  Michel Michel | 9???
                </h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                  vehicula laoreet. Suspendisse congue vulputate lobortis.
                  Pellentesque at interdum tortor. Quisque arcu quam, malesuada
                  vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
                  ligula nec faucibus. In elit metus, efficitur lobortis nisi
                  quis, molestie porttitor metus. Pellentesque et neque risus.
                  Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
                  vehicula urna, nec feugiat quam lectus vitae ex.{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  Michel Michel | 3???
                </h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                  vehicula laoreet. Suspendisse congue vulputate lobortis.
                  Pellentesque at interdum tortor. Quisque arcu quam, malesuada
                  vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
                  ligula nec faucibus. In elit metus, efficitur lobortis nisi
                  quis, molestie porttitor metus. Pellentesque et neque risus.
                  Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
                  vehicula urna, nec feugiat quam lectus vitae ex.{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className="detail_right">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            style={{ float: "right", marginBottom: "20px" }}
          >
            <Button
              onClick={() => navigate("/sellerHome/updateService/" + serviceId)}
            >
              S????a
            </Button>
            {serviceDetail.status === "ACTIVE" ? (
              <Button
                onClick={handlePauseService}
                style={{ backgroundColor: "yellow" }}
              >
                Ta??m d????ng
              </Button>
            ) : (
              <Button
                onClick={handleOpenService}
                style={{ backgroundColor: "yellowgreen" }}
              >
                M????
              </Button>
            )}
          </ButtonGroup>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="C?? ba??n" {...a11yProps(0)} />
              <Tab label="N??ng cao" {...a11yProps(1)} />
              <Tab label="Cao c????p" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{ border: "2px groove #d8d0d2" }}
          >
            {packages.map((item, index) => {
              return (
                <TabPanel value={value} index={index} dir={theme.direction}>
                  <div style={{ display: "flex" }}>
                    <h1>{item.price}$ </h1>
                  </div>
                  <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                    {item.title}
                  </p>
                  <h4>?????? {item.deliveryTime} Day Delivery</h4>
                  <p>?????? {item.shortDescription}</p>
                  {/* <p>?????? Sa??n ph????m ba??n giao 2</p> */}
                  <h3>
                    Phi?? hu??y h????p ??????ng :{item.contractCancelFee}% T????ng chi phi??
                  </h3>
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </div>
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
