<template>
    <div class="club-registration-form">
        <!-- General Information Section -->
        <div class="general-form">
            <h1 class="title"><strong>I. Thông tin chung</strong></h1>
            <h4 class="sub-title">
                <strong><em>Tên câu lạc bộ</em></strong>
            </h4>
            <input v-model="form.badmintonClub.badmintonClubName" @input="validateClubName" class="input-field"
                type="text">
            <p v-if="errors.clubName" class="error-message">{{ errors.clubName }}</p>

            <h4 class="sub-title">
                <strong><em>Mô tả</em></strong>
            </h4>
            <textarea v-model="form.badmintonClub.description" @input="validateDescription"
                class="input-field description-input"></textarea>
            <p v-if="errors.description" class="error-message">
                {{ errors.description }}
            </p>

            <!-- Court section -->
            <div class="court-section">
                <h4 class="sub-title">
                    <strong><em>Tên sân</em></strong>
                </h4>
                <div v-for="(court, courtIndex) in form.courtList" :key="courtIndex" class="court-input">
                    <input v-model="court.courtName" @input="validateCourts" type="text" placeholder="Nhập tên sân">
                    <button v-if="courtIndex > 0" @click="removeCourt(courtIndex)" class="remove-court-btn">Bỏ</button>
                </div>
                <button @click="addCourt" class="add-court-btn">+</button>
                <p v-if="errors.courts" class="error-message">{{ errors.courts }}</p>
            </div>

            <h4 class="sub-title">
                <strong><em>Ảnh chính</em></strong>
            </h4>
            <input type="file" @change="onAvatarUpload" accept="image/*" class="file-input" ref="avatarInput" />
            <p v-if="errors.avatar" class="error-message">{{ errors.avatar }}</p>
            <div v-if="form.avatarPreview" class="image-container avatar-container">
                <img :src="form.avatarPreview" alt="Avatar Preview" class="image-preview avatar-preview" />
                <button @click="removeAvatar" class="remove-button">×</button>
            </div>

            <h4 class="sub-title">
                <strong><em>Ảnh phụ</em></strong>
            </h4>
            <input type="file" @change="onDescriptionImagesUpload" accept="image/*" multiple class="file-input" />
            <p v-if="errors.descriptionImages" class="error-message">
                {{ errors.descriptionImages }}
            </p>
            <div class="image-grid">
                <div v-for="(image, index) in form.descriptionImages" :key="index" class="image-container">
                    <img :src="image.preview" alt="Description Image" class="description-image" />
                    <button @click="removeImage(index)" class="remove-button">×</button>
                </div>
            </div>
        </div>

        <!-- Location Section -->
        <div class="location-form">
            <h1 class="title"><strong>II. Địa chỉ</strong></h1>
            <div class="grid-container">
                <div class="grid-item">
                    <h4 class="sub-title"><strong><em>Tỉnh/Thành phố</em></strong></h4>
                    <select v-model="form.address.selectedCity" class="dropdown" @change="onCityChange">
                        <option value="">Select City</option>
                        <option v-for="city in citiesList" :key="city" :value="city">{{ city }}</option>
                    </select>
                    <p v-if="errors.city" class="error-message">{{ errors.city }}</p>
                </div>
                <div class="grid-item">
                    <h4 class="sub-title"><strong><em>Quận/Huyện</em></strong></h4>
                    <select v-model="form.address.selectedDistrict" class="dropdown" @change="onDistrictChange">
                        <option value="">Select District</option>
                        <option v-for="district in districtsList" :key="district" :value="district">{{ district }}
                        </option>
                    </select>
                    <p v-if="errors.district" class="error-message">{{ errors.district }}</p>
                </div>
                <div class="grid-item">
                    <h4 class="sub-title"><strong><em>Phường/Thị trấn/Xã</em></strong></h4>
                    <select v-model="form.address.selectedWard" class="dropdown" @change="onWardChange">
                        <option value="">Select Ward</option>
                        <option v-for="ward in wardsList" :key="ward" :value="ward">{{ ward }}</option>
                    </select>
                    <p v-if="errors.ward" class="error-message">{{ errors.ward }}</p>
                </div>
            </div>
            <div class="address-container">
                <h4 class="sub-title"><strong><em>Địa chỉ chi tiết (số nhà/tòa nhà/tên đường/khu phố)</em></strong></h4>
                <textarea v-model="form.address.unitNumber" @input="validateAddress"
                    class="input-field address-input"></textarea>
                <p v-if="errors.unitNumber" class="error-message">{{ errors.unitNumber }}</p>
            </div>
        </div>

        <!-- Booking Type Section -->
        <div class="booking-type">
            <h1><strong>III. Khung giờ</strong></h1>
            <div v-for="(slot, slotIndex) in slots" :key="slotIndex" class="slot-section">
                <div class="slot-container">
                    <h2><strong>Khung giờ {{ slot.number }}</strong></h2>
                    <div class="time-slots">
                        <div class="time-slot">
                            <h4><i>Bắt đầu lúc</i></h4>
                            <input type="time" v-model="slot.starTime" @change="validateTimeSlot(slot)" step="1800">
                        </div>
                        <div class="time-slot">
                            <h4><i>Kết thúc lúc</i></h4>
                            <input type="time" v-model="slot.endTime" @change="validateTimeSlot(slot)" step="1800">
                        </div>
                    </div>
                    <p v-if="slot.timeError" class="error-message">{{ slot.timeError }}</p>

                    <!-- Price and Apply for subform -->
                    <div v-for="(subform, subformIndex) in slot.subforms" :key="subformIndex" class="subform">
                        <div class="price-section">
                            <h3><strong>Giá cả:</strong></h3>
                            <div class="price-options">
                                <div class="price-row" v-for="type in priceTypes" :key="type.value">
                                    <h4>{{ type.label }}</h4>
                                    <div class="price-input">
                                        <input type="text" v-model="subform[type.value]"
                                            @input="validatePrice(subform, type.value)" @keypress="allowOnlyNumbers" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p v-if="subform.priceError" class="error-message">{{ subform.priceError }}</p>
                        <div class="apply-for-section">
                            <h3><strong>Áp dụng cho:</strong></h3>
                            <div class="weekday-checkboxes">
                                <label v-for="day in weekdays" :key="day" class="weekday-checkbox">
                                    <input type="checkbox" v-model="subform.selectedDays" :value="day">
                                    {{ day }}
                                </label>
                            </div>
                        </div>
                        <p v-if="subform.dayError" class="error-message">{{ subform.dayError }}</p>
                    </div>

                    <!-- Subform buttons -->
                    <div class="button-group">
                        <button @click="removeSubform(slot)" class="remove-subform-btn"
                            :disabled="slot.subforms.length === 1">
                            Bỏ Giá
                        </button>
                        <button @click="addSubform(slot)" class="add-subform-btn">
                            Thêm Giá
                        </button>
                    </div>
                </div>
            </div>

            <!-- Slot buttons -->
            <div class="button-group">
                <button @click="removeTimeSlot" class="remove-slot-btn" :disabled="slots.length === 1">
                    Bỏ khung giờ
                </button>
                <button @click="addTimeSlot" class="add-slot-btn">Thêm khung giờ</button>
            </div>
        </div>

        <!-- Confirmation and Submit Section -->
        <div class="confirmation-section">
            <label class="confirmation-label">
                <input type="checkbox" v-model="isConfirmed">
                <em>Tôi cam đoan tất cả những thông tin trên là đúng</em>
            </label>
            <button @click="submitForm" class="submit-btn" :disabled="!isConfirmed || isLoading">
                {{ isLoading ? 'Đang xử lý...' : 'Đăng ký câu lạc bộ' }}
            </button>
        </div>

        <!-- Thêm một thông báo loading nếu cần -->
        <div v-if="isLoading" class="loading-overlay">
            Đang xử lý, vui lòng đợi...
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAddressFilter } from '../../stores/addressFilter'; // Điều chỉnh đường dẫn nếu cần
import { storeToRefs } from 'pinia';
import { useClubRegister } from '../../stores/ClubRegister';
import imageCompression from 'browser-image-compression';
import { useAuthStore } from '../../stores/auth';
import { useFormValidation } from '../../stores/useFormValidation'; // Import auth store

const errors = reactive({
    clubName: "",
    description: "",
    avatar: "",
    descriptionImages: "",
    courts: "",
    city: "",
    district: "",
    ward: "",
    unitNumber: ""
});

const form = reactive({
    badmintonClub: {
        badmintonClubName: "",
        description: "",
    },
    address: {
        unitNumber: "",
        selectedCity: '',
        selectedDistrict: '',
        selectedWard: '',
    },
    courtList: [{ courtName: "" }],
    descriptionImages: [],
    avatar: null,
    avatarPreview: null,
});

const addressStore = useAddressFilter();
const clubRegister = useClubRegister();
const authStore = useAuthStore();
const error = ref(null);

const {
    validateClubName,
    validateDescription,
    validateCourts,
    validateAddress,
    validateTimeSlot,
    validatePrice,
    validateLocation
} = useFormValidation(form, errors);

const { citiesList, districtsList, wardsList } = storeToRefs(addressStore);
const { fetchCities, fetchDistrict, fetchWards } = addressStore;
const getCourtManagerId = computed(() => authStore.user.userId || '');
const isLocationValid = computed(() => {
    const cityValid = !!form.address.selectedCity;
    const districtValid = !!form.address.selectedDistrict;
    const wardValid = !!form.address.selectedWard;
    const unitNumberValid = !!form.address.unitNumber && form.address.unitNumber.trim() !== "";

    console.log("Selected City:", form.address.selectedCity);
    console.log("Selected District:", form.address.selectedDistrict);
    console.log("Selected Ward:", form.address.selectedWard);
    console.log("Unit Number:", form.address.unitNumber);

    console.log("City valid:", cityValid);
    console.log("District valid:", districtValid);
    console.log("Ward valid:", wardValid);
    console.log("Unit number valid:", unitNumberValid);

    const result = cityValid && districtValid && wardValid && unitNumberValid;
    console.log("isLocationValid:", result);

    return result;
});

const isLoading = ref(false);
const isConfirmed = ref(false);

const compressImage = async (file) => {
    const options = {
        maxSizeMB: 1, // Giảm kích thước tối đa xuống 1MB
        maxWidthOrHeight: 1024, // Giảm kích thước ảnh xuống
        useWebWorker: true
    };
    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error("Error compressing image:", error);
        return file;
    }
};

const formData = reactive({
    badmintonClub: {
        badmintonClubName: "",
        description: "",
        courtManagerId: ""
    },
    address: {
        unitNumber: "",
        ward: "",
        district: "",
        province: ""
    },
    courts: [],
    timeFrames: [],
    images: []
});

const slots = ref([createSlot(1)]);

const priceTypes = [
    { value: "oneTimePlay", label: "One time" },
    { value: "flexible", label: "Flexible" },
    { value: "fixed", label: "Fix" },
];

const weekdays = [
    "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật",
];

const avatarInput = ref(null);

// Functions
function createSlot(number) {
    return {
        number,
        starTime: "",
        endTime: "",
        timeError: "",
        subforms: [createSubform()]
    };
}

function createSubform() {
    return {
        oneTimePlay: 0,
        flexible: 0,
        fixed: 0,
        selectedDays: [], // Mảng để lưu các ngày được chọn
        priceError: "",
        dayError: ""
    };
}

const addCourt = () => {
    form.courtList.push({ courtName: "" });
};

const removeCourt = (index) => {
    if (form.courtList.length > 1) {
        form.courtList.splice(index, 1);
    } else {
        errors.courts = "You must have at least one court";
    }
};

const onAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            const compressedFile = await compressImage(file);
            form.avatar = compressedFile;
        } else {
            form.avatar = file;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            form.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(form.avatar);
        errors.avatar = "";
    }
};

const removeAvatar = () => {
    form.avatar = null;
    form.avatarPreview = null;
    if (avatarInput.value) {
        avatarInput.value.value = "";
    }
};

const onDescriptionImagesUpload = async (event) => {
    const files = event.target.files;
    if (files) {
        if (form.descriptionImages.length + files.length > 20) {
            errors.descriptionImages = "You can upload a maximum of 20 description images";
            return;
        }
        for (let file of files) {
            if (file.size > 5 * 1024 * 1024) {
                const compressedFile = await compressImage(file);
                file = compressedFile;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                form.descriptionImages.push({
                    file: file,
                    preview: e.target.result,
                });
            };
            reader.readAsDataURL(file);
        }
        errors.descriptionImages = "";
    }
};

const removeImage = (index) => {
    form.descriptionImages.splice(index, 1);
};

const images = [
    { imageUrl: form.avatarPreview, isMainAvatar: 1 },
    ...form.descriptionImages.map(img => ({ imageUrl: img.preview, isMainAvatar: 0 }))
];
formData.images = images;



const onCityChange = async () => {
    console.log("City changed to:", form.address.selectedCity);
    form.address.selectedDistrict = '';
    form.address.selectedWard = '';
    if (form.address.selectedCity) {
        await fetchDistrict(form.address.selectedCity);
    }
    validateLocation(form.address);
};

const onDistrictChange = async () => {
    console.log("District changed to:", form.address.selectedDistrict);
    form.address.selectedWard = '';
    if (form.address.selectedDistrict) {
        await fetchWards(form.address.selectedCity, form.address.selectedDistrict);
    }
    validateLocation(form.address);
};

const onWardChange = () => {
    console.log("Ward changed to:", form.address.selectedWard);
    validateLocation(form.address);
};

const addTimeSlot = () => {
    slots.value.push(createSlot(slots.value.length + 1));
};

const removeTimeSlot = () => {
    if (slots.value.length > 1) {
        slots.value.pop();
    }
};

const addSubform = (slot) => {
    if (slot && slot.subforms) {
        slot.subforms.push(createSubform());
    }
};

const removeSubform = (slot) => {
    if (slot && slot.subforms && slot.subforms.length > 1) {
        slot.subforms.pop();
    }
};

const allowOnlyNumbers = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
};

const convertDayToEng = (day) => {
    const dayMap = {
        "Thứ Hai": "Mon",
        "Thứ Ba": "Tue",
        "Thứ Tư": "Wed",
        "Thứ Năm": "Thu",
        "Thứ Sáu": "Fri",
        "Thứ Bảy": "Sat",
        "Chủ Nhật": "Sun"
    };
    return dayMap[day] || day;
};

const isFormValid = computed(() => {
    const isGeneralValid = form.badmintonClub.badmintonClubName &&
        form.badmintonClub.description &&
        getCourtManagerId.value &&
        form.courtList.length > 0 &&
        form.courtList.every(court => court.courtName.trim() !== "") &&
        form.avatar &&
        form.descriptionImages.length > 0;
    console.log("isGeneralValid:", isGeneralValid);

    const isLocationValid0 = isLocationValid.value; // Sử dụng giá trị của computed property isLocationValid
    console.log("isLocationValid:", isLocationValid0);

    const isBookingTypeValid = slots.value.every(slot =>
        slot.starTime &&
        slot.endTime &&
        !slot.timeError &&
        slot.subforms.every(subform =>
            subform.selectedDays.length > 0 &&
            (subform.oneTimePlay > 0 || subform.flexible > 0 || subform.fixed > 0) &&
            !subform.priceError &&
            !subform.dayError
        )
    );
    console.log("isBookingTypeValid:", isBookingTypeValid);

    const isErrorFree = Object.values(errors).every(error => error === "");
    console.log("isErrorFree:", isErrorFree);

    return isGeneralValid && isLocationValid && isBookingTypeValid && isErrorFree;
});

const submitForm = async () => {
    console.log("isFormValid:", isFormValid.value);
    console.log("isConfirmed:", isConfirmed.value);
    if (!isFormValid.value || !isConfirmed.value) {
        console.log("Form is not valid or not confirmed");
        return;
    }

    const courtManagerId = getCourtManagerId.value;
    if (!courtManagerId) {
        error.value = 'Court Manager ID is missing';
        console.error(error.value);
        return;
    }

    isLoading.value = true;
    error.value = null;

    try {
        const clubData = {
            badmintonClub: {
                badmintonClubName: form.badmintonClub.badmintonClubName,
                description: form.badmintonClub.description,
                courtManagerId: courtManagerId
            },
            address: {
                unitNumber: form.address.unitNumber,
                ward: form.address.selectedWard,
                district: form.address.selectedDistrict,
                province: form.address.selectedCity
            },
            courtList: form.courtList.map(court => ({ courtName: court.courtName })),
            timeFramesList: formatTimeFrames(),
            avatar: form.avatar,
            descriptionImages: form.descriptionImages.map(img => img.file)
        };
        
        console.log('Submitting data:', JSON.stringify(clubData, null, 2));
        const response = await clubRegister.registerClub(clubData);
        console.log('Form submitted successfully:', response);
        // Xử lý phản hồi thành công (ví dụ: hiển thị thông báo, chuyển hướng, etc.)
    } catch (err) {
        console.error('Error submitting form:', err);
        error.value = err.message || 'An error occurred while submitting the form';
    } finally {
        isLoading.value = false;
    }
};

// Cập nhật hàm formatTimeFrames để đảm bảo thời gian ở định dạng 24 giờ
const formatTimeFrames = () => {
    return slots.value.map(slot => ({
        starTime: slot.starTime,
        endTime: slot.endTime,
        clubPricingRegister: slot.subforms.flatMap(subform =>
            subform.selectedDays.map(day => ({
                dateOfWeek: convertDayToEng(day),
                oneTimePlay: parseInt(subform.oneTimePlay) || 0,
                flexible: parseInt(subform.flexible) || 0,
                fixed: parseInt(subform.fixed) || 0
            }))
        )
    }));
};

// Mounted hook
onMounted(async () => {
    await fetchCities();
    form.badmintonClub.courtManagerId = authStore.user.userId;
});
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20px;
    z-index: 1000;
}

/* General styles */
.club-registration-form {
    max-width: 810px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;
}

.sub-title {
    font-weight: bold;
    font-style: italic;
    margin-top: 25px;
    margin-bottom: 10px;
    color: #7f7e7e;
}

.input-field {
    width: 775px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.input-field:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

textarea.input-field {
    resize: vertical;
    min-height: 15px;
}

.description-input {
    min-height: 100px;
}

.error-message {
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
}

/* Court section styles */
.court-section {
    margin-top: 20px;
    margin-bottom: 20px;
}

.court-input {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.court-input input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 10px;
}

.add-court-btn,
.remove-court-btn {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.add-court-btn {
    background-color: #28a745;
    color: white;
}

.add-court-btn:hover {
    background-color: #218838;
}

.remove-court-btn {
    background-color: #dc3545;
    color: white;
}

.remove-court-btn:hover {
    background-color: #c82333;
}

/* Image upload styles */
.file-input {
    margin-bottom: 15px;
    cursor: pointer;
}

.file-input::file-selector-button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.file-input::file-selector-button:hover {
    background-color: #0056b3;
}

.image-container {
    position: relative;
    margin-bottom: 20px;
}

.avatar-container {
    width: 200px;
    height: 200px;
}

.image-preview,
.description-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: transform 0.3s ease;
}

.image-preview:hover,
.description-image:hover {
    transform: scale(1.05);
}

.avatar-preview {
    max-width: 200px;
    max-height: 200px;
}

.remove-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.remove-button:hover {
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.image-container {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Location styles */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.grid-item {
    display: flex;
    flex-direction: column;
}

.dropdown {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.dropdown:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.dropdown:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

.address-container {
    margin-top: 20px;
}

.address-input {
    min-height: 60px;
}

/* Booking Type styles */
.slot-section {
    width: 100%;
    margin-bottom: 20px;
}

.slot-container {
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 20px;
    background-color: #fff;
}

.time-slots {
    display: flex;
    justify-content: space-around;
}

.time-slot {
    width: 30%;
}

.time-slot h4 {
    color: #7f7e7e;
}

.time-slot input[type="time"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.price-section {
    margin-top: 20px;
}

.price-options {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.price-row {
    display: flex;
    width: 100%;
    max-width: 400px;
    color: #7f7e7e;
    font-weight: bold;
    font-style: italic;
}

.price-input {
    display: flex;
    align-items: center;
    margin-left: auto;
    position: relative;
    width: 290px;
}

.price-input input {
    width: 100%;
    padding: 10px;
    padding-right: 55px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.price-input::after {
    content: "VNĐ/h";
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
    background-color: white;
    padding-left: 5px;
}

.weekdays {
    display: flex;
    flex-wrap: wrap;
}

.weekday {
    margin-right: 15px;
    margin-bottom: 10px;
}

.apply-for-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
}

.apply-for-section h3 {
    margin-bottom: 10px;
}

.select-container {
    width: 140px;
}

select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 0.65em auto;
}

/* Button styles */
.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.add-slot-btn,
.remove-slot-btn,
.add-subform-btn,
.remove-subform-btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 20px;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.add-slot-btn,
.add-subform-btn {
    background-color: #007bff;
    color: white;
}

.add-slot-btn:hover,
.add-subform-btn:hover {
    background-color: #0056b3;
}

.remove-slot-btn,
.remove-subform-btn {
    background-color: #dc3545;
    color: white;
}

.remove-slot-btn:hover,
.remove-subform-btn:hover {
    background-color: #c82333;
}

.remove-slot-btn:disabled,
.remove-subform-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

/* Confirmation and Submit styles */
.confirmation-section {
    margin-top: 20px;
    text-align: center;
}

.confirmation-label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.confirmation-label input[type="checkbox"] {
    margin-right: 10px;
}

.submit-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #0056b3;
}

.submit-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.apply-for-section {
    margin-top: 20px;
}

.weekday-checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
}

.weekday-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-basis: calc(33.333% - 10px);
    /* 3 checkboxes per row on wide screens */
}

.weekday-checkbox input[type="checkbox"] {
    margin-right: 5px;
}

/* Responsive design */
@media (max-width: 480px) {
    .weekday-checkbox {
        flex-basis: 100%;
        /* 1 checkbox per row on very small screens */
    }
}

@media (max-width: 768px) {
    .weekday-checkbox {
        flex-basis: calc(50% - 10px);
        /* 2 checkboxes per row on smaller screens */
    }

    .grid-container {
        grid-template-columns: 1fr;
    }

    .time-slots {
        flex-direction: column;
    }

    .time-slot {
        width: 100%;
        margin-bottom: 10px;
    }

    .price-row {
        flex-direction: column;
    }

    .price-input {
        width: 100%;
    }

}
</style>