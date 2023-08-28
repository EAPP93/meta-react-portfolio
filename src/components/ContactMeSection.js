import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const initialValues = {
    firstName: "",
    email: "",
    type: "hireMe",
    comment: "",
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    type: Yup.string().required(),
    comment: Yup.string()
      .min(25, 'Must be at least 25 characters')
      .required('Required'),
  });

  const onSubmit = (values) => {
    submit("http://localhost:3000/", values)
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === 'success') {
        formik.resetForm();
      }
    }
  }, [response])

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit} >
            <VStack spacing={4}>
              <FormControl isInvalid={formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps('firstName')}
                />
                <FormErrorMessage>
                  {
                    formik.touched.firstName && formik.errors.firstName ?
                      (<div>{formik.errors.firstName}</div>) : null
                  }
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>
                  {
                    formik.touched.email && formik.errors.email ?
                      (<div>{formik.errors.email}</div>) : null
                  }
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" >
                  <option value="hireMe" >Freelance project proposal</option>
                  <option value="openSource" >Open source consultancy session</option>
                  <option value="other" >Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps('comment')}
                />
                <FormErrorMessage>
                  {
                    formik.touched.comment && formik.errors.comment ?
                      (<div>{formik.errors.comment}</div>) : null
                  }
                </FormErrorMessage>
              </FormControl>
              {
                isLoading ?
                  <Spinner />
                  :
                  <Button type="submit" colorScheme="purple" width="full">
                    Submit
                  </Button>
              }
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
