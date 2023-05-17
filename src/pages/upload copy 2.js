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

// const FilesData = await axios.get("localhost:3000/listFiles");


const companies = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Dropbox',
    downloads: '594'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Medium Corporation',
    downloads: '625'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    logo: '/assets/logos/logo-slack.png',
    title: 'Slack',
    downloads: '857'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'Lyft',
    downloads: '406'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    logo: '/assets/logos/logo-github.png',
    title: 'GitHub',
    downloads: '835'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    logo: '/assets/logos/logo-squarespace.png',
    title: 'Squarespace',
    downloads: '835'
  }
];

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

  const [dropzoneEnabled, setDropzoneEnabled] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:3000/listFiles`);
      console.log('Files Data',response.data)
      setData(response.data);
    }
    fetchData();
  }, []);

  console.log('Received File Data \n',data)

  const handleButtonClick = () => {
    // setDropzoneEnabled(true);
    setDropzoneEnabled(!dropzoneEnabled);

  };

  const handleDropzoneChange = (files) => {
    setUploadedFile(files[0]);
  };

  const handleUpload = () => {
    // Create FormData object to send the file
    const formData = new FormData();
    formData.append('file', uploadedFile);

    // Make API call to upload file using Axios
    axios
      .post('http://localhost:3000/addFileTest', formData)
      .then((response) => {
        // Handle success
        console.log('File uploaded successfully:', response.data);
        // Reset uploadedFile state
        setUploadedFile(null);
      })
      .catch((error) => {
        // Handle error
        console.error('Error uploading file:', error);
      });
  };

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
                {dropzoneEnabled ? '.' : ''}
              </Button>
            </div>
            
          </Stack>
{
  dropzoneEnabled &&
          <Stack>
          <div>
            <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText="Drag and drop an file here or click"
        onChange={handleDropzoneChange}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!uploadedFile}
        onClick={handleUpload}
      >
        Upload
      </Button>
            </div>
          </Stack>
          
}

<Stack>
  
</Stack>


          {/* <CompaniesSearch /> */}
          <Grid
            container
            spacing={3}
          >
            {companies.map((company) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={company.id}
              >
                <CompanyCard company={company} />
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
