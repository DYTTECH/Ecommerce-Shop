import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

import { Rating } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { BlackText, FooterGrayText } from "../../../Style/StyledComponents/Typography";

const OrderSteps = () => {
  return (
   
      <Timeline  sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1,
        },
      }}>
        <TimelineItem>
          <TimelineOppositeContent color="#212121">
            09:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <BlackText
            >
              Order Confirmed{" "}
            </BlackText>
            <FooterGrayText>
              the order has been successfully confirmed by our team
            </FooterGrayText>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="#212121">
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <BlackText
             
            >
              Order Packed{" "}
            </BlackText>
            <FooterGrayText>All order from your were packed</FooterGrayText>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="#212121">
            12:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <BlackText
              
            >
              Package send{" "}
            </BlackText>
            <FooterGrayText>Your package has been sent from our company</FooterGrayText>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="#212121">
            9:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <BlackText
             
            >
              Packed received{" "}
            </BlackText>
            <FooterGrayText>Packed successfully received by recipient</FooterGrayText>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="#212121">
            9:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <BlackText
              
            >
              Don’t forget to rate{" "}
            </BlackText>
            <FooterGrayText>successfully left a review</FooterGrayText>
            <Rating value={3} />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
   
  );
}

export default OrderSteps
