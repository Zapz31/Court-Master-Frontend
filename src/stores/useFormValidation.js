// src/composables/useFormValidation.js

export function useFormValidation(form, errors) {
  const validateClubName = () => {
    if (!form.badmintonClub.badmintonClubName || form.badmintonClub.badmintonClubName.trim() === "") {
      errors.clubName = "Thiếu tên câu lạc bộ";
      return false;
    } else if (form.badmintonClub.badmintonClubName.length < 3) {
      errors.clubName = "Tên câu lạc bộ phải ít nhất 3 ký tự";
      return false;
    } else if (form.badmintonClub.badmintonClubName.length > 20) {
      errors.clubName = "Tên câu lạc bộ không quá 20 ký tự";
      return false;
    } else {
      errors.clubName = ""; // Xóa lỗi khi hợp lệ
      return true;
    }
  };

  const validateDescription = () => {
    if (form.badmintonClub.description.length > 0) {
      if (form.badmintonClub.description.length < 3) {
        errors.description = "Mô tả phải ít nhất 3 ký tự";
        return false;
      } else if (form.badmintonClub.description.length > 1000) {
        errors.description = "Mô tả không quá 1000 ký tự";
        return false;
      } else {
        errors.description = ""; // Xóa lỗi khi hợp lệ
        return true;
      }
    } else {
      errors.description = ""; // Xóa lỗi nếu không có mô tả
      return true;
    }
  };

  const validateAddress = () => {
    if (!form.address.unitNumber.trim()) {
      errors.unitNumber = 'Thiếu địa chỉ chi tiết';
      return false;
    } else if (form.address.unitNumber.length < 5) {
      errors.unitNumber = 'Địa chỉ chi tiết phải ít nhất 5 ký tự';
      return false;
    } else {
      errors.unitNumber = ''; // Xóa lỗi khi hợp lệ
      return true;
    }
  };

  const validateTimeSlot = (slot) => {
    if (slot.starTime && slot.endTime) {
      const start = new Date(`2000-01-01T${slot.starTime}`);
      const end = new Date(`2000-01-01T${slot.endTime}`);
      if (start >= end) {
        slot.timeError = "Giờ kết thúc phải sau giờ bắt đầu";
        return false;
      } else {
        slot.timeError = ""; // Xóa lỗi khi hợp lệ
        return true;
      }
    } else if (!slot.starTime || !slot.endTime) {
      slot.timeError = "Thiếu thời gian bắt đầu/kết thúc";
      return false;
    } else {
      slot.timeError = ""; // Xóa lỗi khi hợp lệ
      return true;
    }
  };

  const validatePrice = (subform) => {
    const oneTimePlay = parseInt(subform.oneTimePlay);
    const flexible = parseInt(subform.flexible);
    const fixed = parseInt(subform.fixed);

    if (isNaN(oneTimePlay) || isNaN(flexible) || isNaN(fixed) ||
      oneTimePlay <= 0 || flexible <= 0 || fixed <= 0) {
      subform.priceError = "Tất cả các loại giá phải là số lớn hơn 0";
      return false;
    } else {
      subform.priceError = ""; // Xóa lỗi khi hợp lệ
      return true;
    }
  };

  const validateLocation = (address) => {
    let isValid = true;
    if (!address.selectedCity) {
      errors.city = 'Thiếu tỉnh/thành phố';
      isValid = false;
    } else {
      errors.city = '';
    }
    if (!address.selectedDistrict) {
      errors.district = 'Thiếu quận/huyện';
      isValid = false;
    } else {
      errors.district = '';
    }
    if (!address.selectedWard) {
      errors.ward = 'Thiếu phường/thị trấn/xã';
      isValid = false;
    } else {
      errors.ward = '';
    }
    if (!address.unitNumber || address.unitNumber.trim() === '') {
      errors.unitNumber = 'Thiếu địa chỉ chi tiết';
      isValid = false;
    } else if (address.unitNumber.length < 5) {
      errors.unitNumber = 'Địa chỉ chi tiết phải ít nhất 5 ký tự';
      isValid = false;
    } else {
      errors.unitNumber = '';
    }
    return isValid;
  };

  const validateCourts = () => {
    if (form.courtList.length === 0) {
      errors.courts = "Phải có ít nhất 1 sân";
      return false;
    }
    for (let court of form.courtList) {
      if (!court.courtName || court.courtName.trim() === "") {
        errors.courts = "Thiếu tên sân";
        return false;
      } else if (court.courtName.trim().length < 3) {
        errors.courts = "Tên sân phải ít nhất 3 ký tự";
        return false;
      } else if (court.courtName.trim().length > 20) {
        errors.courts = "Tên sân không quá 20 ký tự";
        return false;
      }
    }
    errors.courts = ""; // Xóa lỗi khi hợp lệ
    return true;
  };

  const validateAppliedDays = (subform) => {
    if (subform.selectedDays.length === 0) {
      subform.dayError = "Vui lòng chọn ít nhất một ngày";
      return false;
    } else {
      subform.dayError = ""; // Xóa lỗi khi hợp lệ
      return true;
    }
  };

  return {
    validateClubName,
    validateDescription,
    validateAddress,
    validateTimeSlot,
    validatePrice,
    validateLocation,
    validateCourts,
    validateAppliedDays
  };
}