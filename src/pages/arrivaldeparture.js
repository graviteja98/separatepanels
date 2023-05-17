import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    Autocomplete,
    Checkbox
} from '@mui/material';
import axios from 'axios';
import { useAuth } from 'src/hooks/use-auth';
import { DatePicker } from '@mui/x-date-pickers';

const Page = () => {

    const validationSchema = Yup.object().shape({
        ArrivalDate: Yup.string().required('Arrival Date is required'),
        TransportationArrivalTime: Yup.string().required('Arrival Time is required'),
        PickupPoint: Yup.string().required('Pickup Point is required'),
        NeedTransport: Yup.string().required('Transportation selection is required'),
        DepartureDate: Yup.string().required('Departure Date is required'),
        EmergencyContact: Yup.string().required('Emergency Contact is required'),
        Volunteer: Yup.string().required('Volunteer selection is required'),
        TrainerName: Yup.string().required('Trainer Name is required'),
        TrainerMobile: Yup.string().required('Mobile is required'),
        TraierEmailId: Yup.string().email('Invalid email').required('Email is required'),
        TransportationDepartureTime: Yup.string().required('Departure Time is required'),
        PersonName: Yup.string().required('Person Name is required'),
        DropPoint: Yup.string().required('Drop Point is required'),
        Transport: Yup.string().required('Transport is required'),
        AbhyasiId: Yup
            .string()
            .max(255)
            .required('Abhyasi ID  is required'),
    });

    const initialValues = {
        AbhyasiId: '',
        ArrivalDate: '',
        TransportationArrivalTime: '',
        PickupPoint: '',
        NeedTransport: '',
        DepartureDate: '',
        EmergencyContact: '',
        Volunteer: '',
        TrainerName: '',
        TrainerMobile: '',
        TraierEmailId: '',
        TransportationDepartureTime: '',
        PersonName: '',
        DropPoint: '',
        Transport: '',
    };


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values,{resetForm}) => {
            const apiInstance = axios.create({
                baseURL: 'http://10.244.3.187:5666/',
                timeout: 5000, // Adjust the timeout value as needed
              });
              const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer your_token_here',
              };
              try{
              const response = await apiInstance.post('/arrivaldeparture ', values, { headers });
              console.log('I think this is response',response.data);
            } catch (error) {
              console.error(error);
            }
           // console.log(values); 
            resetForm();// Handle form submission
        },
    });

    const router = useRouter();
    return (
        <>
            <Head>
                <title>
                    Arrival Departure 
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
                                Enter your Arrival and Departure details here
                            </Typography>
                        </Stack>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            {/* First Row */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Typography variant="subtitle2">Abhyasi ID/ Phone</Typography>
                                <TextField
                                    error={!!(formik.touched.AbhyasiId && formik.errors.AbhyasiId)}
                                    fullWidth
                                    helperText={formik.touched.AbhyasiId && formik.errors.AbhyasiId}
                                    
                                    name="AbhyasiId"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.AbhyasiId}

                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the first row, first column */}
                                <Typography variant="subtitle2">Arrival Date</Typography>
                                <TextField
  onBlur={formik.handleBlur}
                                    fullWidth
                                    id="ArrivalDate"
                                    name="ArrivalDate"
                                    type="date"
                                    value={formik.values.ArrivalDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.ArrivalDate && Boolean(formik.errors.ArrivalDate)}
                                    helperText={formik.touched.ArrivalDate && formik.errors.ArrivalDate}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the first row, second column */}
                                <Typography variant="subtitle2">Departure Time</Typography>
                                <TextField
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    id="DepartureDate"
                                    name="DepartureDate"
                                    type="date"
                                    value={formik.values.DepartureDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.DepartureDate && Boolean(formik.errors.DepartureDate)}
                                    helperText={formik.touched.DepartureDate && formik.errors.DepartureDate}
                                />


                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the first row, third column */}
                                <Typography variant="subtitle2">Emergency Contact</Typography>
                                <TextField
                                    fullWidth
                                    id="EmergencyContact"
                                    name="EmergencyContact"
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    value={formik.values.EmergencyContact}
                                    onChange={formik.handleChange}
                                    error={formik.touched.EmergencyContact && Boolean(formik.errors.EmergencyContact)}
                                    helperText={formik.touched.EmergencyContact && formik.errors.EmergencyContact}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the second row, second column */}
                                <Typography variant="subtitle2">Arrival Time</Typography>
                                <TextField
                                    fullWidth
                                    id="TransportationArrivalTime"
                                    name="TransportationArrivalTime"
                                    onBlur={formik.handleBlur}
                                    type="time"
                                    value={formik.values.TransportationArrivalTime}
                                    onChange={formik.handleChange}
                                    error={formik.touched.TransportationArrivalTime && Boolean(formik.errors.TransportationArrivalTime)}
                                    helperText={formik.touched.TransportationArrivalTime && formik.errors.TransportationArrivalTime}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the third row, second column */}
                                <Typography variant="subtitle2">Trainer Name</Typography>
                                <TextField
                                    fullWidth
                                    id="TrainerName"
                                    name="TrainerName"
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    value={formik.values.TrainerName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.TrainerName && Boolean(formik.errors.TrainerName)}
                                    helperText={formik.touched.TrainerName && formik.errors.TrainerName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Typography variant="subtitle2">Trainer Mobile Number</Typography>
                                <TextField
                                    fullWidth
                                    id="TrainerMobile"
                                    name="TrainerMobile"
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    value={formik.values.TrainerMobile}
                                    onChange={formik.handleChange}
                                    error={formik.touched.TrainerMobile && Boolean(formik.errors.TrainerMobile)}
                                    helperText={formik.touched.TrainerMobile && formik.errors.TrainerMobile}
                                />


                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the third row, first column */}
                                <Typography variant="subtitle2">Trainer Email ID</Typography>
                                <TextField
                                    error={!!(formik.touched.TraierEmailId && formik.errors.TraierEmailId)}
                                    fullWidth
                                    helperText={formik.touched.TraierEmailId && formik.errors.TraierEmailId}
                                
                                    name="TraierEmailId"
                                    placeholder=''
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.TraierEmailId}

                                />

                            </Grid>

                            {/* Second Row */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Typography variant="subtitle2">Emergency Contact Name</Typography>
                                <TextField
                                    fullWidth
                                    id="PersonName"
                                    name="PersonName"
                                    onBlur={formik.handleBlur}
                                    type="text"
                                    value={formik.values.PersonName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.PersonName && Boolean(formik.errors.PersonName)}
                                    helperText={formik.touched.PersonName && formik.errors.PersonName}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the third row, third column */}
                                <Typography variant="subtitle2">Train/Flight/Others Departure Time</Typography>
                                <TextField
                                    fullWidth
                                    id="TransportationDepartureTime"
                                    name="TransportationDepartureTime"
                                    type="time"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.TransportationDepartureTime}
                                    onChange={formik.handleChange}
                                    error={formik.touched.TransportationDepartureTime && Boolean(formik.errors.TransportationDepartureTime)}
                                    helperText={formik.touched.TransportationDepartureTime && formik.errors.TransportationDepartureTime}
                                />

                            </Grid>

                            {/* Fourth Row */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the fourth row, first column */}
                                <Typography variant="subtitle2">Pickup Point</Typography>
                                <FormControl fullWidth>
                                   
                                    <Select
                                        labelId="PickupPoint-label"
                                        id="PickupPoint"
                                        name="PickupPoint"
                                        value={formik.values.PickupPoint}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik.touched.PickupPoint && Boolean(formik.errors.PickupPoint)}
                                    >
                                        <MenuItem value="hyderabad">Hyderabad</MenuItem>
                                        <MenuItem value="secundrabad">Secundrabad</MenuItem>
                                        <MenuItem value="vikarabad">Vikarabad</MenuItem>
                                        <MenuItem value="mumbai">Mumbai</MenuItem>
                                        <MenuItem value="solapur">Solapur</MenuItem>
                                    </Select>
                                </FormControl>
                                {formik.errors.PickupPoint && formik.touched.PickupPoint ? <div style={{'color':'red'}}>{formik.errors.PickupPoint}</div> : ''}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the fifth row, first column */}
                                <Typography variant="subtitle2">Drop Point</Typography>
                                <FormControl fullWidth>
                                  
                                    <Select
                                        labelId="DropPoint-label"
                                        id="DropPoint"
                                        name="DropPoint"
                                        onBlur={formik.handleBlur}
                                        value={formik.values.DropPoint}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DropPoint && Boolean(formik.errors.DropPoint)}
                                    >
                                        <MenuItem value="secundrabad">Secundrabad</MenuItem>
                                        <MenuItem value="kacheguda">Kacheguda</MenuItem>
                                        <MenuItem value="shadnagar">Shadnagar</MenuItem>
                                        <MenuItem value="vikarabad">Vikarabad</MenuItem>
                                        <MenuItem value="airport">Airport</MenuItem>
                                    </Select>
                                </FormControl>
                                {formik.errors.DropPoint && formik.touched.DropPoint ? <div style={{'color':'red'}}>{formik.errors.DropPoint}</div> : ''}
                            </Grid>
                           
                            
                            {/* Fifth Row */}
                            
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the fifth row, second column */}
                                <Typography variant="subtitle2">Train / Flight / Transport</Typography>
                                <FormControl fullWidth>

                                    <Select
                                        labelId="Transport-label"
                                        id="Transport"
                                        onBlur={formik.handleBlur}
                                        name="Transport"
                                        value={formik.values.Transport}
                                        onChange={formik.handleChange}
                                        error={formik.touched.Transport && Boolean(formik.errors.Transport)}
                                    >
                                        <MenuItem value="train">Train</MenuItem>
                                        <MenuItem value="flight">Flight</MenuItem>
                                        <MenuItem value="Transport">Transport</MenuItem>
                                    </Select>
                                </FormControl>
                                {formik.errors.Transport && formik.touched.Transport ? <div style={{'color':'red'}}>{formik.errors.Transport}</div> : ''}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the fifth row, third column */}
                                <Typography variant="subtitle2">Want to be a Volunteer?</Typography>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="Volunteer-label"
                                        id="Volunteer"
                                        name="Volunteer"
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Volunteer}
                                        onChange={formik.handleChange}
                                        error={formik.touched.Volunteer && Boolean(formik.errors.Volunteer)}
                                    >
                                        <MenuItem value='yes'>Yes</MenuItem>
                                        <MenuItem value='no'>No</MenuItem>
                                    </Select>
                                </FormControl>
                                {formik.errors.Volunteer && formik.touched.Volunteer ? <div style={{'color':'red'}}>{formik.errors.Volunteer}</div> : ''}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {/* Content for the fourth row, second column */}
                                <Typography variant="subtitle2">Need Transport to reach Kanha?</Typography>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="NeedTransport"
                                        id="NeedTransportSelect"
                                        name="NeedTransport"
                                        onBlur={formik.handleBlur}
                                        value={formik.values.NeedTransport}
                                        onChange={formik.handleChange}
                                        error={formik.touched.NeedTransport && Boolean(formik.errors.NeedTransport)}
                                    >
                                        <MenuItem value='yes'>Yes</MenuItem>
                                        <MenuItem value='no'>No</MenuItem>

                                    </Select>
                                </FormControl>
                                {formik.errors.NeedTransport && formik.touched.NeedTransport ? <div style={{'color':'red'}}>{formik.errors.NeedTransport}</div> : ''}
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
                </Box>
            </Box>
        </>
    )
}
Page.getLayout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default Page;