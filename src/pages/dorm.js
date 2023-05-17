import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
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
    Checkbox,
    Paper
} from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';
import { DatePicker } from '@mui/x-date-pickers';

const Page = () => {
    const [status,setStatus] = useState('Pending')
    const validationSchema = Yup.object().shape({
        AbhyasiId: Yup
            .string()
            .max(255)
            .required('Abhyasi ID  is required'),
        DormOptions: Yup.string().required('Dorm Option is requierd'),
        BirthOptions: Yup.string().required('Berth Option is required'),
    })
    const initialValues = {
        AbhyasiId: '',
        DormOptions: '',
        BirthOptions: ''
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const apiInstance = axios.create({
                baseURL: 'http://10.244.3.187:5666/',
                timeout: 5000, // Adjust the timeout value as needed
              });
              const headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer your_token_here',
              };
              try{
              const response = await apiInstance.post('/dorm', {...values, Status : status}, { headers });
              console.log('I think this is response',response.data);
            } catch (error) {
              console.error(error);
            }
            //console.log(values);
            resetForm();// Handle form submission
        },
    });

    return (
        <>
            <Head>
                <title>
                    Dorm Register
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
                        backgroundBlendMode: 'hard-light',
                        backgroundColor: 'rgba(255,255,255,0.4)',
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
                                Dorm Register
                            </Typography>
                        </Stack>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            {/* First Row */}
                            <Grid item xs={12} sm={4}>
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

                                />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* Content for the first row, second column */}
                                <FormControl fullWidth
                                    variant="standard">
                                    <InputLabel>Dorm Options</InputLabel>
                                    <Select
                                        labelId="DormOptions-label"
                                        id="DormOptions"
                                        name="DormOptions"
                                        label="Dorm Options"
                                        value={formik.values.DormOptions}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DormOptions && Boolean(formik.errors.DormOptions)}
                                    >
                                        <MenuItem value="sisters_dorm">Sisters Dorm</MenuItem>
                                        <MenuItem value="brothers_dorm">Brothers Dorm</MenuItem>
                                        <MenuItem value="family_dorm">Family Dorm</MenuItem>
                                    </Select>
                                </FormControl>
                                {formik.errors.DormOptions && formik.touched.DormOptions ? <div style={{'color':'red'}}>{formik.errors.DormOptions}</div> : ''}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* Content for the first row, third column */}
                                <FormControl fullWidth
                                    variant="standard">
                                    <InputLabel>Berth Options</InputLabel>
                                    <Select
                                        labelId=" BirthOptions-label"
                                        id="BirthOptions"
                                        name="BirthOptions"
                                        label="Berth Options"
                                        value={formik.values.BirthOptions}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik.touched.BirthOptions && Boolean(formik.errors.BirthOptions)}
                                    >
                                        <MenuItem value="upper_berth">Upper Berth</MenuItem>
                                        <MenuItem value="lower_berth">Lower Berth</MenuItem>
                                        <MenuItem value="near_bathroom">Near Bathroom</MenuItem>
                                        <MenuItem value="no">No Preference</MenuItem>

                                    </Select>
                                </FormControl>
                                {formik.errors.BirthOptions && formik.touched.BirthOptions ? <div style={{'color':'red'}}>{formik.errors.BirthOptions}</div> : ''}
                            </Grid>

                            {/* Second Row */}
                            <Grid item xs={12} sm={4}>
                                {/* Content for the second row, first column */}
                                <Stack>
                                <Typography variant="overline"
                                sx={{
                                fontSize:15}}>Status:</Typography>
                                <Paper
                                sx={{
                                    borderRadius : 1,
                                    backgroundColor : '#312E81',
                                    p:1,
                                    px:5,
                                    color:'white',
                                }}
                                elevation={10}
                                > <Typography variant="h5">{status}</Typography> </Paper>
                            </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* Content for the second row, second column */}
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