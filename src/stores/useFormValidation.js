// src/composables/useFormValidation.js

export function useFormValidation(form, errors) {
  const validateClubName = () => {
    if (form.badmintonClub.badmintonClubName.length < 3) {
      errors.clubName = "Club name must be at least 3 characters long";
      return false;
    } else if (form.badmintonClub.badmintonClubName.length > 100) {
      errors.clubName = "Club name must not exceed 100 characters";
      return false;
    } else {
      errors.clubName = "";
      return true;
    }
  };

  const validateDescription = () => {
    if (form.badmintonClub.description.length < 10) {
      errors.description = "Description must be at least 10 characters long";
      return false;
    } else if (form.badmintonClub.description.length > 1000) {
      errors.description = "Description must not exceed 1000 characters";
      return false;
    } else {
      errors.description = "";
      return true;
    }
  };

  const validateCourts = () => {
    if (form.courtList.some(court => court.courtName.trim() === "")) {
      errors.courts = "All court names must be filled";
      return false;
    } else {
      errors.courts = "";
      return true;
    }
  };

  const validateAddress = () => {
    if (!form.address.unitNumber.trim()) {
      errors.unitNumber = 'Address is required';
      return false;
    } else if (form.address.unitNumber.length < 5) {
      errors.unitNumber = 'Address must be at least 5 characters long';
      return false;
    } else {
      errors.unitNumber = '';
      return true;
    }
  };

  const validateTimeSlot = (slot) => {
    if (slot.starTime && slot.endTime) {
      const start = new Date(`2000-01-01T${slot.starTime}`);
      const end = new Date(`2000-01-01T${slot.endTime}`);
      if (start >= end) {
        slot.timeError = "End time must be after start time";
        return false;
      } else {
        slot.timeError = "";
        return true;
      }
    } else {
      slot.timeError = "Time cannot be empty";
      return false;
    }
  };

  const validatePrice = (subform, priceType) => {
    const price = parseInt(subform[priceType]);
    if (isNaN(price) || price < 0) {
      subform.priceError = "Price must be a non-negative number";
      return false;
    } else {
      subform.priceError = "";
      return true;
    }
  };

  const validateLocation = (address) => {
    let isValid = true;
  
    if (!address.selectedCity) {
      errors.city = 'City is required';
      isValid = false;
    } else {
      errors.city = '';
    }
  
    if (!address.selectedDistrict) {
      errors.district = 'District is required';
      isValid = false;
    } else {
      errors.district = '';
    }
  
    if (!address.selectedWard) {
      errors.ward = 'Ward is required';
      isValid = false;
    } else {
      errors.ward = '';
    }
  
    if (!address.unitNumber || address.unitNumber.trim() === '') {
      errors.unitNumber = 'Unit number is required';
      isValid = false;
    } else {
      errors.unitNumber = '';
    }
    
    return isValid;
  };

  return {
    validateClubName,
    validateDescription,
    validateCourts,
    validateAddress,
    validateTimeSlot,
    validatePrice,
    validateLocation
  };
}