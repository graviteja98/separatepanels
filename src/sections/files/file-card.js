import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import React, { useState, useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Snackbar } from '@material-ui/core';

// import Divider from '@mui/material/Divider';


import ArticleIcon from '@mui/icons-material/Article';
import SourceIcon from '@mui/icons-material/Source';
import KeyIcon from '@mui/icons-material/Key';
import { FileCopy } from '@material-ui/icons';
import QuizIcon from '@mui/icons-material/Quiz';
import { IconButton, Fade, Paper } from '@material-ui/core';
import { Close as CloseIcon, Remove as MinimizeIcon } from '@material-ui/icons';
import Backdrop from '@mui/material/Backdrop';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import CardActions from '@mui/material/CardActions';

import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { Document, Page, pdfjs } from '@react-pdf/renderer';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export const FilesCard = (props) => {
  const { company } = props;
  const MAX_CHARACTERS = 15; // Maximum number of characters to display

  console.log('Display File Details', company)

  const [textToCopy, setTextToCopy] = useState('');

  const [showBox, setShowBox] = useState(false);

  const imgStyle = {
    maxWidth: '100%',
    maxHeight: '300px',
  };

  const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    media: {
      maxWidth: '100%',
      maxHeight: 375,
      objectFit: 'contain',
    },
  };

  const handleInfoClick = () => {
    setShowBox(!showBox); // toggle showBox state
  }
  // const [open, setOpen] = React.useState(false);

  const modalRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDownload = async () => {
    console.log('Download Logic', company.CID)
    const imageURL = `http://127.0.0.1:8080/ipfs/${company.CID}`;
  

    const response = await fetch(imageURL);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
  // Create a virtual link element
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `${company.CID}.png`; // Specify the desired filename for the downloaded image
  link.target = '_blank'; // Open the download in a new tab/window
  // link.rel = 'noopener noreferrer';
  // Simulate a click on the link element to trigger the download
  document.body.appendChild(link);
  // URL.revokeObjectURL(blobUrl);

  link.click();
  document.body.removeChild(link);

  };
  const handlePrint = () => {

    console.log('Print Logic', company.CID)
    // window.print();
    printElement(modalRef.current);


    // if (modalRef.current) {
    //   const imageElement = modalRef.current;
    //   const imageWindow = window.open('', '_blank');
    //   imageWindow.document.write(imageElement.outerHTML);
    //   imageWindow.document.close();
    //   imageWindow.print();
    // }

  };


  const printElement = (element) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<img src="' + element.querySelector('img').src + '"  style = "height:375px; width: 100%"/>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);





  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);


  const handleCopyClick = () => {
    if (contentRef.current) {
      const contentElement = contentRef.current;
      contentElement.select();
      document.execCommand('copy');
    }
  };

  const handleCopyToClipboard = (input) => {
    console.log('Copied Content', input)
    navigator.clipboard.writeText(textToCopy);
  };




  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >

          {company.FileType === 'application/pdf' ? (
            <Avatar
              src="assets/logos/pdf.png"
              variant="square"
              sx={{ width: 96, height: 96 }}
            />
          ) : (
            <Avatar
              src="assets/logos/image.png"
              variant="square"
              sx={{ width: 96, height: 96 }}
            />
          )}

        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          <Div>{company.Filename}</Div>
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" startIcon={<InfoIcon />} onClick={handleInfoClick}>
            File info
          </Button>
          <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={handleOpen}>
            View File
          </Button>
        </Box>
        {showBox ?


          <Box id="box" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary={company.Filename} />
                    <ListItemIcon onClick={handleCopyClick}>
                      <FileCopy />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <KeyIcon />
                    </ListItemIcon>
                    <ListItemText primary={company.CID.length > MAX_CHARACTERS ? `${company.CID.substring(0, MAX_CHARACTERS)}...` : company.CID} />
                    <ListItemIcon>
                      <FileCopy />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <WatchLaterIcon />
                    </ListItemIcon>
                    <ListItemText primary={company.createdAt.length > MAX_CHARACTERS ? `${company.createdAt.substring(0, MAX_CHARACTERS)}...` : company.createdAt} />
                    <ListItemIcon>
                      <FileCopy />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SourceIcon />
                    </ListItemIcon>
                    <ListItemText primary={company.FileSize} />
                    <ListItemIcon>
                      <FileCopy />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <QuizIcon />
                    </ListItemIcon>
                    <ListItemText primary={company.FileType} />
                    <ListItemIcon>
                      <FileCopy />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>

          </Box> : ' '
        }
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />


      <Modal open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        ref={modalRef} 
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <div className={`modal ${minimized ? 'minimized' : ''}`} >
            <Box sx={style}>
              <div className="header">
                {/* <IconButton onClick={handleMinimize}>
                  <MinimizeIcon />
                </IconButton> */}

                <AppBar position="static" >
                  <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {company.Filename}
                    </Typography>
                    <IconButton onClick={handleClose}>
                      <CloseIcon />

                    </IconButton>


                  </Toolbar>
                </AppBar>

              </div>
              <div className="body">
                <Card sx={{ minWidth: 275, maxHeight: 700 }}>
                  {/* <iframe
                    title="Responsive Iframe"
                    src={`http://127.0.0.1:8080/ipfs/${company.CID}`}
                    style={{ width: '100%', height: '300%', border: 'none' }}
                  /> */}

                  {company.FileType === 'application/pdf' ? (
                    <embed src={`http://127.0.0.1:8080/ipfs/${company.CID}`} type="application/pdf" width="100%" height="375px" />

                  ) : (

                    <img
                      src={`http://127.0.0.1:8080/ipfs/${company.CID}`}
                      alt={company.Filename}
                      style={imgStyle}
                    // loading="lazy"
                    />
                  )}

                  {company.FileType === 'application/pdf' ?

                    null
                    :
                    <CardActions>
                      <Stack direction="row" spacing={2}>
                      <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleDownload}> Download </Button>
                      <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>Print</Button>
                      </Stack>
                    </CardActions>
                  }

                </Card>
              </div>
            </Box>
          </div>
        </Fade>
      </Modal>

    </Card>
  );
};

FilesCard.propTypes = {
  company: PropTypes.object.isRequired
};
