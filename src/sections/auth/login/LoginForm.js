import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useAddLoginMutation } from '../../../redux/services/login/LoginService';
import { authTokenAction, authAction } from '../../../redux/auth/AuthReducer';
import { showToast } from '../../../utils/toast';

// ----------------------------------------------------------------------
const customId = "custom-id-yes";
export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [AddLogin, AddLoginInfo] = useAddLoginMutation();


  if (AddLoginInfo.isError) {
    showToast("error", AddLoginInfo.error.data.msg);
    AddLoginInfo.reset();
  }
  const successToast = async () => {
    await showToast("success", "Welcome to edjobster !! ")

  }
  useEffect(() => {
    if (AddLoginInfo.isSuccess) {
      dispatch(authTokenAction(AddLoginInfo.data.access));
      successToast()
      navigate('/dashboard/app', { replace: true });
    }
  }, [AddLoginInfo, dispatch, navigate])


  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      AddLogin({
        username: values.username,
        password: values.password
      })
      dispatch(authAction(true));

    },
  });

  const { errors, touched, values, isSubmitting, handleChange, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            value={values.username}
            onChange={handleChange}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={AddLoginInfo.isLoading}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
