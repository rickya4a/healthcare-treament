import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Heading,
  VStack,
  useToast,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from '@chakra-ui/react';
import { createTreatment } from '../api/treatmentService';

const TREATMENT_OPTIONS = [
  'Physical Therapy',
  'Speech Therapy',
  'Occupational Therapy',
  'Chemotherapy',
  'Radiation Therapy',
  'Surgery',
  'Psychotherapy',
  'Massage',
  'Acupuncture',
  'Chiropractic',
];

const MEDICATION_OPTIONS = [
  'Ibuprofen',
  'Acetaminophen',
  'Aspirin',
  'Lisinopril',
  'Atorvastatin',
  'Metformin',
  'Amlodipine',
  'Metoprolol',
  'Levothyroxine',
  'Omeprazole',
];

const TreatmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    dateOfTreatment: '',
    treatmentDescription: [],
    medicationsPrescribed: [],
    costOfTreatment: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const resetForm = () => {
    setFormData({
      patientName: '',
      patientId: '',
      dateOfTreatment: '',
      treatmentDescription: [],
      medicationsPrescribed: [],
      costOfTreatment: '',
    });
    setErrors({});
  };

  const handleCostChange = (valueAsString) => {
    setFormData({
      ...formData,
      costOfTreatment: valueAsString,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientId) {
      newErrors.patientId = 'Patient ID is required';
    }

    if (!formData.dateOfTreatment) {
      newErrors.dateOfTreatment = 'Date of treatment is required';
    }

    if (formData.treatmentDescription.length === 0) {
      newErrors.treatmentDescription = 'At least one treatment must be selected';
    }

    if (!formData.costOfTreatment) {
      newErrors.costOfTreatment = 'Cost of treatment is required';
    } else if (parseFloat(formData.costOfTreatment) <= 0) {
      newErrors.costOfTreatment = 'Cost must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTreatmentSelect = (e) => {
    const value = e.target.value;
    if (value && !formData.treatmentDescription.includes(value)) {
      setFormData({
        ...formData,
        treatmentDescription: [...formData.treatmentDescription, value],
      });
    }
  };

  const handleMedicationSelect = (e) => {
    const value = e.target.value;
    if (value && !formData.medicationsPrescribed.includes(value)) {
      setFormData({
        ...formData,
        medicationsPrescribed: [...formData.medicationsPrescribed, value],
      });
    }
  };

  const removeTreatment = (treatment) => {
    setFormData({
      ...formData,
      treatmentDescription: formData.treatmentDescription
        .filter(t => t !== treatment),
    });
  };

  const removeMedication = (medication) => {
    setFormData({
      ...formData,
      medicationsPrescribed: formData.medicationsPrescribed
        .filter(m => m !== medication),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        await createTreatment(formData);
        toast({
          title: 'Treatment record created.',
          description: "The treatment record has been successfully saved.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        resetForm();
      } catch (error) {
        toast({
          title: 'Error.',
          description: error.response?.data?.message || "Unable to create treatment record.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Box
      maxWidth="800px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb={6} size="lg" textAlign="center">Treatment Record Form</Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={errors.patientName} isRequired>
            <FormLabel>Patient Name</FormLabel>
            <Input
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              placeholder="Enter patient name"
            />
            <FormErrorMessage>{errors.patientName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.patientId} isRequired>
            <FormLabel>Patient ID</FormLabel>
            <Input
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              placeholder="Enter patient ID"
            />
            <FormErrorMessage>{errors.patientId}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.dateOfTreatment} isRequired>
            <FormLabel>Date of Treatment</FormLabel>
            <Input
              name="dateOfTreatment"
              type="datetime-local"
              value={formData.dateOfTreatment}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.dateOfTreatment}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.treatmentDescription}>
            <FormLabel>Treatment Description</FormLabel>
            <Select
              placeholder="Select treatment"
              onChange={handleTreatmentSelect}
              value=""
            >
              {TREATMENT_OPTIONS.map((treatment) => (
                <option key={treatment} value={treatment}>{treatment}</option>
              ))}
            </Select>
            <Box mt={2}>
              <HStack spacing={2} wrap="wrap">
                {formData.treatmentDescription.map((treatment) => (
                  <Tag
                    key={treatment}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                    my={1}
                  >
                    <TagLabel>{treatment}</TagLabel>
                    <TagCloseButton onClick={() => removeTreatment(treatment)} />
                  </Tag>
                ))}
              </HStack>
            </Box>
            <FormErrorMessage>{errors.treatmentDescription}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Medications Prescribed</FormLabel>
            <Select
              placeholder="Select medication"
              onChange={handleMedicationSelect}
              value=""
            >
              {MEDICATION_OPTIONS.map((medication) => (
                <option key={medication} value={medication}>{medication}</option>
              ))}
            </Select>
            <Box mt={2}>
              <HStack spacing={2} wrap="wrap">
                {formData.medicationsPrescribed.map((medication) => (
                  <Tag
                    key={medication}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                    my={1}
                  >
                    <TagLabel>{medication}</TagLabel>
                    <TagCloseButton onClick={() => removeMedication(medication)} />
                  </Tag>
                ))}
              </HStack>
            </Box>
          </FormControl>

          <FormControl isInvalid={errors.costOfTreatment} isRequired>
            <FormLabel>Cost of Treatment</FormLabel>
            <NumberInput
              min={0}
              value={formData.costOfTreatment}
              onChange={handleCostChange}
            >
              <NumberInputField
                name="costOfTreatment"
                placeholder="Enter cost of treatment"
              />
            </NumberInput>
            <FormErrorMessage>{errors.costOfTreatment}</FormErrorMessage>
          </FormControl>

          <Button
            mt={6}
            colorScheme="teal"
            type="submit"
            width="full"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Submit Treatment Record
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TreatmentForm;