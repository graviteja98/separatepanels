import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';


import React, { useState,useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
// import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { FilesCard } from 'src/sections/files/file-card';



// const FilesData = await axios.get("localhost:3000/listFiles");


const companies = [];

const useStyles = makeStyles((theme) => ({
  container: {
    // marginTop: theme.spacing(4),
    textAlign: "center",
  },
  dropZone: {
    // border: `2px dashed ${theme.palette.primary.main}`,
    // borderRadius: theme.shape.borderRadius,
    // padding: theme.spacing(4),
    cursor: "pointer",
  },
}));

// console.log('Received Files Data \n',FilesData)

// const classes = useStyles();
// const [files, setFiles] = useState([]);

// const handleDrop = (droppedFiles) => {
//   setFiles([...files, ...droppedFiles]);
// };

// const handleDelete = (fileToDelete) => {
//   setFiles(files.filter((file) => file !== fileToDelete));
// };

const Page = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleFileRemove = (file) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const handleUpload = () => {
    // Perform upload logic here
    console.log('Files:', files);

    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });

      // Make API call to upload file using Axios
    axios
      .post('http://localhost:3000/addFile', formData)
      .then((response) => {
        // Handle success
        console.log('File uploaded successfully:', response.data);
        window.location.reload()
        // Reset uploadedFile state
        // setUploadedFile(null);
        setFiles([])
      })
      .catch((error) => {
        // Handle error
        console.error('Error uploading file:', error);
      });
  };

  const [dropzoneEnabled, setDropzoneEnabled] = useState(false);

  const [datass, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:3000/listFiles`);
      console.log('Files Data',response.data)
      setData(response.data);
    }
    fetchData();
  }, []);

  console.log('Received File Data \n',datass)

  const handleButtonClick = () => {
    // setDropzoneEnabled(true);
    setDropzoneEnabled(!dropzoneEnabled);

  };

  const handleDropzoneChange = (files) => {
    setUploadedFile(files[0]);
  };

  // const handleUpload = () => {
  //   // Create FormData object to send the file
  //   const formData = new FormData();
  //   formData.append('file', uploadedFile);

  //   console.log('Adding File Details',formData)
  //   // Make API call to upload file using Axios
  //   axios
  //     .post('http://localhost:3000/addFileTest', formData)
  //     .then((response) => {
  //       // Handle success
  //       console.log('File uploaded successfully:', response.data);
  //       // Reset uploadedFile state
  //       setUploadedFile(null);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error('Error uploading file:', error);
  //     });
  // };

  return (
  
  <>
    <Head>
      <title>
        Filemanagement | ProofChain
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      {/* <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        File Upload
      </Typography>
      <Box
        className={classes.dropZone}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {fileName ? (
          <Typography>{fileName}</Typography>
        ) : (
          <Typography>Drag and drop a file here, or click to select a file</Typography>
        )}
      </Box>
      <input
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        ref={(input) => (fileInput = input)}
      />
      <Box mt={2}>
        <Typography variant="caption" color="textSecondary">
          Supported file types: JPG, PNG, GIF
        </Typography>
      </Box>
      <Box mt={2}>
        <button onClick={() => fileInput.click()} disabled={uploaded}>
          Choose File
        </button>
        <button onClick={handleUpload} disabled={!selectedFile || uploaded}>
          Upload
        </button>
      </Box>
      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      {uploaded && (
        <Typography color="success" align="center" gutterBottom>
          File uploaded successfully!
        </Typography>
      )}
    </Container> */}
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Documents
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                {/* <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button> */}
              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
                onClick={handleButtonClick}              >
                         

                Upload Documents
                {dropzoneEnabled ? null : ''}
              </Button>
            </div>
            
          </Stack>
{
  dropzoneEnabled &&
          <Stack>
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <DropzoneArea
        acceptedFiles={['image/*', 'application/pdf']}
        dropzoneText="Drag and drop an file here or click"
        // onChange={handleDropzoneChange}
        onChange={handleFileChange}
        onDelete={handleFileRemove}
        filesLimit={1}
      />
      <Button
        variant="contained"
        color="primary"
        // disabled={uploadedFile}
        onClick={handleUpload}
        mt={2}
      >
        Upload
      </Button>
            </Box>
          </Stack>
          
}

<Stack>
  
</Stack>


          {/* <CompaniesSearch /> */}
          <Grid
            container
            spacing={3}
          >
            {datass.map((company) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={company._id}
              >
                <FilesCard company={company} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box>
        </Stack>
        
      </Container>
    </Box>
  </>
  )
          };

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
