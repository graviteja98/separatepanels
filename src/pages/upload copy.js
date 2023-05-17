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


import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

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
  roots: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: 'dashed 2px #999',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(1),
  },
}));


// const classes = useStyles();
// const [files, setFiles] = useState([]);

// const handleDrop = (droppedFiles) => {
//   setFiles([...files, ...droppedFiles]);
// };

// const handleDelete = (fileToDelete) => {
//   setFiles(files.filter((file) => file !== fileToDelete));
// };

const Page = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const handleDrop = (droppedFiles) => {
    console.log('file uploaded are',droppedFiles)
    setFiles([...droppedFiles]);
  };

  const handleDelete = (fileToDelete) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  const handleUpload = async () => {
    console.log('File Details Are',files)
    try {
      // Create a FormData object
      // const formData = new FormData();
      // formData.append("file", files);

      console.log('Sending Form Details Are',formData)
  
      const formData = await new FormData();
      files.forEach((file) => {
        formData.append('files', file); // assuming you want to send multiple files and 'files' is the key for the file data in the backend
      });
      
      // Make a POST request with Axios
      const url = 'http://localhost:3000/addFileTest';
      // const config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // };


      // console.log('Sending Form Data Is ',formData)
      const response = await axios.post(url, formData);
  
      // Handle response
      console.log('Response:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }


    // alert('Upload Called With Details')
  }

  return (
  
  <>
    <Head>
      <title>
        Companies | ProofChain
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Companies
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
                onClick={handleUpload}
              >
                Upload Documents
              </Button>
            </div>
            <div>
            <div className={classes.roots} >
      <DropzoneArea
        acceptedFiles={['image/*', 'video/*']}
        filesLimit={5}
        maxFileSize={5000000}
        dropzoneText="Drag and drop files here or click to select"
        onChange={(droppedFiles) => handleDrop(droppedFiles)}
        onDelete={(fileToDelete) => handleDelete(fileToDelete)}
        showPreviewsInDropzone={true}
        showFileNamesInPreview={true}
      />
      <br></br>
       <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
                onClick={handleUpload}
              >
                Upload Documents To Ipfs
              </Button>
            {/* <CloudUploadIcon className={classes.icon} onClick={handleUpload}/> */}

    </div>
            </div>
          </Stack>
          <CompaniesSearch />
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
