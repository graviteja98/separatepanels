import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import axios from 'axios';
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
//import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');


  const countries = [
    {
      name: "USA",
      code: 'US',
      label: 'United States',
      phone: '1',
      states: [
        {
          name: "New York",
          cities: ["New York City", "Buffalo", "Rochester"],
        },
        {
          name: "California",
          cities: ["Los Angeles", "San Francisco", "San Diego"],
        },
      ],
    },
    {
      name: "Canada",
      code: 'CA',
      label: 'Canada',
      phone: '1',
      states: [
        {
          name: "Ontario",
          cities: ["Toronto", "Ottawa", "Mississauga"],
        },
        {
          name: "Quebec",
          cities: ["Montreal", "Quebec City", "Laval"],
        },
      ],
    },

    {
      name: "India",
      code: 'IN',
      label: 'India',
      phone: '91',
      states: [
        {
          name: "Madhya Pradesh",
          cities: ["Bhopal", "Indore", "Gwalior"],
        },
        {
          name: "Maharashtra",
          cities: ["Pune", " Solapur", "Mumbai"],
        },
        {
          name: "Chattisgarh",
          cities: ["Raipur", " Bilaspur"],
        },
        {
          name: "Andhra Pradesh",
          cities: ["Guntur", " Karnool"],
        },
        {
          name: "Telangana",
          cities: ["Hyderabad", " Secundrabad"],
        },
      ],
    },
  ];



  function getCitiesByState(CountryName, stateName) {
    const Country = countries.find((c) => c.name === CountryName);
    if (!Country) return [];
    const state = Country.states.find((s) => s.name === stateName);
    return state ? state.cities : [];
  }
  // interface CountryType {
  //   code: string;
  //   label: string;
  //   phone: string;
  //   suggested?: boolean;
  // }
  const handleCountryChange = (e,val) => {

    console.log(e,'the value is',val)
  }
  const formik = useFormik({
    initialValues: {
      EmailAddress: '',
     AbhyasiId: '',
      FirstName: '',
      LastName: '',
      Age: '',
      Gender: '',
      Country: '',
      Citizenship: '',
      GovtId: '',
      GovtIdNo: '',
      mobile: '',
      states: '',
      City: '',
      Lookingtostay: '',
     Preference: '',
      submit: null
    },
    validationSchema: yup.object({
     EmailAddress: yup
        .string()
        .email('Must be a valid email')
        .max(40)
        .required('Email is required'),
     AbhyasiId: yup
        .string()
        .max(40)
        .required('Abhyasi ID is required'),
      FirstName: yup.string().max(40).required('First name'),
      LastName: yup.string().max(40).required('Last name'),
      Age: yup.string().max(40).required('Age is required'),
      Gender: yup.string().max(40).required('Gender is required'),
      Country: yup.string().required('Country is required'),
      GovtId: yup.string().required('Government ID type is required'),
      Citizenship: yup.string().required('Citizenship is required'),
      GovtIdNo: yup.string().required('Government ID is required'),
      mobile: yup.string().required('Mobile number is required'),
      states: yup.string().required('State is required'),
      City: yup.string().required('City is required'),
      Lookingtostay: yup.string().required('Staying status is required'),
     Preference: yup.string().required('Stay Preference is required'),
    }),
    onSubmit: async (values, {resetForm}) => {
      // try {
      //   await auth.signIn(values.email, values.password);
      //   router.push('/');
      // } catch (err) {
      //   helpers.setStatus({ success: false });
      //   helpers.setErrors({ submit: err.messAge });
      //   helpers.setSubmitting(false);
      // }
      const apiInstance = axios.create({
        baseURL: 'http://10.244.3.187:5666/',
        timeout: 5000, // Adjust the timeout value as needed
      });
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your_token_here',
      };
      try{
      const response = await apiInstance.post('/register', values, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
      console.log(values);
      resetForm();
      
    }
  });

  function getStatesByCountry(CountryName) {
    const Country = countries.find((c) => c.name === CountryName);
    return Country ? Country.states : [];
  }

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );
  const theme = useTheme();
  const isBreakpointReached = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <Head>
        <title>
          User Registration 
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.dark',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            backgroundImage : 'url("https://e0.pxfuel.com/wallpapers/306/953/desktop-wallpaper-world-map-minimalist-map.jpg")',
            borderRadius: 8, // Border radius
            boxShadow: 8, // Elevation
            backgroundImage: 'url("https://e0.pxfuel.com/wallpapers/306/953/desktop-wallpaper-world-map-minimalist-map.jpg")',
            borderRadius: 8, // Border radius
            boxShadow: 10, // Elevation
            backgroundBlendMode : 'hard-light',
            backgroundColor : 'rgba(255,255,255,0.4)',
            maxWidth: '70%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            px: 7,
            py: 8,
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register here
              </Typography>
            </Stack>

            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the first row, first column */}
                    <TextField
                      error={!!(formik.touched.AbhyasiId && formik.errors.AbhyasiId)}
                      fullWidth
                      helperText={formik.touched.AbhyasiId && formik.errors.AbhyasiId}
                      label="Abhyasi ID"
                      name="AbhyasiId"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.AbhyasiId}
                      sx={{ m: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the first row, second column */}
                    <Stack direction={isBreakpointReached ? 'row' : 'column'}>
                      <TextField
                        error={!!(formik.touched.FirstName && formik.errors.FirstName)}
                        fullWidth
                        helperText={formik.touched.FirstName && formik.errors.FirstName}
                        label="First Name"
                        name="FirstName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.FirstName}
                        sx={{ m: 2 }}
                      />
                      <TextField
                        error={!!(formik.touched.LastName && formik.errors.LastName)}
                        fullWidth
                        helperText={formik.touched.LastName && formik.errors.LastName}
                        label="Last Name"
                        name="LastName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.last}
                        sx={{ m: 2 }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the first row, third column */}
                    <TextField
                      error={!!(formik.touched.Age && formik.errors.Age)}
                      fullWidth
                      helperText={formik.touched.Age && formik.errors.Age}
                      label="Age"
                      name="Age"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.Age}
                      sx={{ m: 2 }}
                    />
                  </Grid>

                  {/* Second Row */}
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the second row, first column */}
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <InputLabel id="Gender-label">Gender</InputLabel>
                      <Select
                        labelId="Gender-label"
                        id="Gender"
                        name="Gender"
                        value={formik.values.Gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Gender && !!formik.errors.Gender}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                    {formik.touched.Gender && formik.errors.Gender && (
                      <div style={{ 'color': 'red' }}>{formik.errors.Gender}</div>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} sm={4}>
                    {/* Content for the second row, second column */}
                    <Autocomplete
                      sx={{ m: 2 }}
                      
                      id="Country"
                      name="Country"
                      onBlur={formik.handleBlur}
                      options={countries.map(c => c.name)} // Replace with your actual options array
                      getOptionLabel={(option) => option}
                      value={formik.values.Country}
                      onChange={(event, value) => {
                        formik.setFieldValue('Country', value);
                        
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          error={formik.touched.Country && formik.errors.Country}
                          helperText={formik.touched.Country && formik.errors.Country}
                        />
                      )}
                    />
                    {/* <Autocomplete
                      sx={{ mx: 1, my: 2 }}
                      id="Country"
                      name="Country"
                      options={countries}
                      placeholder='Country'
                      getOptionLabel={(option) => option.name}
                      value={formik.values.Country}
                      onChange={(event, value) => {
                        formik.setFieldValue('Country', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          error={formik.touched.Country && formik.errors.Country}
                          helperText={formik.touched.Country && formik.errors.Country}
                        />
                      )}
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>    <TextField
                    error={!!(formik.touched.EmailAddress&& formik.errors.EmailAddress)}
                    fullWidth
                    helperText={formik.touched.EmailAddress && formik.errors.EmailAddress}
                    label="Email Address"
                    name="EmailAddress"
                    placeholder=''
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.EmailAddress}
                    sx={{ m: 2 }}
                  /></Grid>

                  {/* Third Row */}
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the third row, first column */}
                    <FormControl fullWidth sx={{ m: 2 }}>
                      <InputLabel id="GovtId">Govt. ID type</InputLabel>
                      <Select
                        labelId="GovtId"
                        id="GovtId"
                        name="GovtId"
                        value={formik.values.GovtId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.GovtId && !!formik.errors.GovtId}
                      >
                        <MenuItem value="male">Aadhar Card</MenuItem>
                        <MenuItem value="female">PAN Card</MenuItem>
                      </Select>
                    </FormControl>
                    {formik.touched.GovtId && formik.errors.GovtId && (
                      <div style={{ 'color': 'red' }}>{formik.errors.GovtId}</div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the third row, second column */}

                    <TextField
                      error={!!(formik.touched.GovtIdNo && formik.errors.GovtIdNo)}
                      fullWidth
                      helperText={formik.touched.GovtIdNo && formik.errors.GovtIdNo}
                      label="Government ID"
                      name="GovtIdNo"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.GovtIdNo}
                      sx={{ m: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the third row, third column */}
                    <TextField
                      error={!!(formik.touched.mobile && formik.errors.mobile)}
                      fullWidth
                      helperText={formik.touched.mobile && formik.errors.mobile}
                      label="Mobile"
                      name="mobile"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.mobile}
                      sx={{ m: 2 }}
                    />
                  </Grid>

                  {/* Fourth Row */}
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the fourth row, first column */}
                    <Autocomplete
                      sx={{ m: 2 }}
                      id="states"
                      name="states"
                      options={getStatesByCountry(formik.values.Country).map(s=>s.name)} // Replace with your actual options array
                      getOptionLabel={(option) => option}
                      value={formik.values.states}
                      onChange={(event, value) => {
                        formik.setFieldValue('states', value);
                        
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State"
                          error={formik.touched.states && formik.errors.states}
                          helperText={formik.touched.states && formik.errors.states}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the fourth row, second column */}
                    <Autocomplete
                      sx={{ mx: 1, my: 2 }}
                      onBlur={formik.handleBlur}
                      id="City"
                      name="City"
                      options={getCitiesByState(formik.values.Country,formik.values.states)}
                      placeholder='City'
                      getOptionLabel={(option) => option}
                      value={formik.values.City}
                      onChange={(event, value) => {
                        formik.setFieldValue('City', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          error={formik.touched.City && formik.errors.City}
                          helperText={formik.touched.City && formik.errors.City}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <FormControl component="fieldset" sx={{ m: 2 }}>
                      <FormLabel component="legend">Citizenship</FormLabel>
                      <RadioGroup
                        name="Citizenship"
                        value={formik.values.Citizenship}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel value="indian" control={<Radio />} label="Indian" />
                        <FormControlLabel value="oci" control={<Radio />} label="OCI" />
                      </RadioGroup>
                      {formik.touched.Citizenship && formik.errors.Citizenship && (
                        <div style={{ 'color': 'red' }}>{formik.errors.Citizenship}</div>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Fifth Row */}
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the fifth row, first column */}
                    <FormControl fullWidth>
                      <InputLabel id="Lookingtostay-label">Looking to Stay?</InputLabel>
                      <Select
                        labelId="Lookingtostay-label"
                        id="Lookingtostay"
                        name="Lookingtostay"
                        value={formik.values.Lookingtostay}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Lookingtostay && !!formik.errors.Lookingtostay}
                        fullWidth
                        sx={{ m: 2 }}
                      >
                        <MenuItem value='yes'>Yes</MenuItem>
                        <MenuItem value='no'>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the fifth row, second column */}
                    {formik.values.Lookingtostay ? 
                    (<FormControl fullWidth sx={{ m: 2 }}>
                      <InputLabel id="Preferencelabel">Stay Preference</InputLabel>
                      <Select
                        labelId="preference-label"
                        id="Preference"
                        name="Preference"
                        value={formik.values.Preference}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Preference && !!formik.errors.Preference}
                        helperText={formik.touched.Preference&& formik.errors.Preference}
                        fullWidth
                      >
                        <MenuItem value="eastpremiumdorm">East Premium dorm</MenuItem>
                        <MenuItem value="permanenttents">Permanent tents</MenuItem>
                        <MenuItem value="pearl">Pearl</MenuItem>
                        <MenuItem value="serviceapartments">Service Apartments</MenuItem>
                      </Select>
                      {formik.touched.Preference && formik.errors.Preference && (
                      <div style={{ 'color': 'red' }}>{formik.errors.Preference}</div>
                    )}
                    </FormControl>
                     )
                      
                    : 
                    ''}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    {/* Content for the fifth row, third column */}

                  </Grid>
                </Grid>

                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button

                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>

              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
