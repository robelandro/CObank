import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f0f2f5",
    borderRadius: "10px",
    padding: theme.spacing(4),
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#1877f2",
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    color: "#333333",
    lineHeight: "1.5",
    marginTop: theme.spacing(2),
  },
}));

const AboutUs = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          About Our Modern Community Bank
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          At our modern community bank, we believe in redefining banking for the
          digital age. We are committed to providing our customers with
          innovative financial solutions, personalized service, and a seamless
          banking experience.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Our mission is to empower individuals and businesses by leveraging
          cutting-edge technology and a customer-centric approach. We strive to
          make banking convenient, secure, and transparent, so you can focus on
          what matters most to you.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          With our state-of-the-art mobile and online banking platforms, you can
          manage your accounts, make transactions, and access a wide range of
          financial services anytime, anywhere. We combine the convenience of
          digital banking with the warmth and personal touch of a local
          community bank.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          As a community bank, we are deeply rooted in the neighborhoods we
          serve. We are proud to support local businesses, organizations, and
          initiatives that contribute to the growth and well-being of our
          community. Building strong relationships with our customers and
          understanding their unique financial goals is at the heart of what we
          do.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Join us on our journey to transform banking. Experience the modern way
          of banking with our community bank, where technology meets personalized service.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
