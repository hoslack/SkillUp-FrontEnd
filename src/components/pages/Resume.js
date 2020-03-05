import React, {useState} from 'react'
import {
  Paper,
  Grid,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles'
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    maxWidth: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: '100vh',
    overflow: 'scroll'
  },
  grid: {
    marginTop: '50px'
  }
}));

const Resume = () => {
  const classes = useStyles();
  let commentsArray = new Array(10).fill({'content':'Sample comment from the CV array Sample ' +
      'comment from the CV array Sample comment from the CV array'})

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={5}>
          <Container className={classes.paper}>
            {commentsArray.map((comment) => {
              return (
                <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                 href=''>
                  <Typography className={classes.heading} component={'h5'}>{comment.content}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography component={'p'}>
                    {comment.content}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>)
            })}
          </Container>
        </Grid>
        <Grid item xs={6} >
          <Paper elevation={3}>
            <Document
          file="/Hoslack_Resume.pdf"
          onLoadSuccess={e=>{}}
            >
              <Page pageNumber={1} />
            </Document>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Resume
