import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import {createOrder, createOrderItem, editOrderItem} from '../store'
import {Button, Box, Grid, CardActionArea, CardActions, InputLabel, MenuItem, FormControl, TextField, Select} from '@material-ui/core'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import IconButton from '@material-ui/core/IconButton';
import ProductCard from "./ProductCard";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";



const faces = [
  "https://upload.wikimedia.org/wikipedia/commons/1/17/Orecchiette_Pasta.JPG",
  "https://chefsmandala.com/wp-content/uploads/2018/02/Orzo-Pasta-shutterstock_110331179.jpg",
  "https://image.freepik.com/free-photo/uncooked-vermicelli-pasta-background_245047-192.jpg",
  "https://businesstimesnow.com/wp-content/uploads/2020/10/Enjoy-Your-Evening-with-Bucatini-Pasta-Dish-1.jpg"
];

const styles = muiBaseTheme => ({
  card: {
    minWidth: 400,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});
const _CategoriesTest = ({ products, categories, classes}) => {

const history = useHistory();

if (products.length === 0) return '...loading'

return (
<div>
  {
    categories.map(category => {
      return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            "https://media3.giphy.com/media/LwHgwANvfvsR5XxCyD/giphy.gif?cid=ecf05e47vior8d4tj8ev0er7pti2jkbb2yki87zdypygyxun&rid=giphy.gif&ct=g"
          }
        />
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {category.name}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            This category is a pasta thing.
          </Typography>
          <Divider className={classes.divider} light />
          {faces.map(face => (
            <Avatar className={classes.avatar} key={face} src={face} />
          ))}
        </CardContent>
      </Card>

      )
    })
  }
</div>
  );
};
const CategoriesTest = withStyles(styles)(_CategoriesTest)

export default connect((state) => state)(CategoriesTest);
