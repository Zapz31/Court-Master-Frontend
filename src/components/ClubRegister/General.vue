<template>
  <div class="general-form">
    <h1 class="title"><strong>I. General</strong></h1>

    <h4 class="sub-title">
      <strong><em>Club Name</em></strong>
    </h4>
    <textarea
      v-model="form.clubName"
      class="input-field"
      @input="validateClubName"
    ></textarea>
    <p v-if="errors.clubName" class="error-message">{{ errors.clubName }}</p>

    <h4 class="sub-title">
      <strong><em>Description</em></strong>
    </h4>
    <textarea
      v-model="form.description"
      class="input-field description-input"
      @input="validateDescription"
    ></textarea>
    <p v-if="errors.description" class="error-message">
      {{ errors.description }}
    </p>

    <h4 class="sub-title">
      <strong><em>Avatar Image</em></strong>
    </h4>
    <input
      type="file"
      @change="onAvatarUpload"
      accept="image/*"
      class="file-input"
      ref="avatarInput"
    />
    <p v-if="errors.avatar" class="error-message">{{ errors.avatar }}</p>
    <div v-if="form.avatarPreview" class="image-container avatar-container">
      <img
        :src="form.avatarPreview"
        alt="Avatar Preview"
        class="image-preview avatar-preview"
      />
      <button @click="removeAvatar" class="remove-button">×</button>
    </div>

    <h4 class="sub-title">
      <strong><em>Description Images</em></strong>
    </h4>
    <input
      type="file"
      @change="onDescriptionImagesUpload"
      accept="image/*"
      multiple
      class="file-input"
    />
    <p v-if="errors.descriptionImages" class="error-message">
      {{ errors.descriptionImages }}
    </p>
    <div class="image-grid">
      <div
        v-for="(image, index) in form.descriptionImages"
        :key="index"
        class="image-container"
      >
        <img
          :src="image.preview"
          alt="Description Image"
          class="description-image"
        />
        <button @click="removeImage(index)" class="remove-button">×</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  clubName: "",
  description: "",
  avatar: null,
  avatarPreview: null,
  descriptionImages: [],
});

const errors = reactive({
  clubName: "",
  description: "",
  avatar: "",
  descriptionImages: "",
});

const avatarInput = ref(null);

const validateClubName = () => {
  if (form.clubName.length < 3) {
    errors.clubName = "Club name must be at least 3 characters long";
  } else if (form.clubName.length > 100) {
    errors.clubName = "Club name must not exceed 100 characters";
  } else {
    errors.clubName = "";
  }
};

const validateDescription = () => {
  if (form.description.length < 10) {
    errors.description = "Description must be at least 10 characters long";
  } else if (form.description.length > 1000) {
    errors.description = "Description must not exceed 1000 characters";
  } else {
    errors.description = "";
  }
};

const onAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      errors.avatar = "Avatar image must not exceed 5MB";
      return;
    }
    form.avatar = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      form.avatarPreview = e.target.result;
    };
    reader.readAsDataURL(file);
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

const onDescriptionImagesUpload = (event) => {
  const files = event.target.files;
  if (files) {
    if (form.descriptionImages.length + files.length > 20) {
      errors.descriptionImages =
        "You can upload a maximum of 20 description images";
      return;
    }
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        errors.descriptionImages = "Each description image must not exceed 5MB";
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        form.descriptionImages.push({
          file: file,
          preview: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    });
    errors.descriptionImages = "";
  }
};

const removeImage = (index) => {
  form.descriptionImages.splice(index, 1);
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

.general-form {
  max-width: 810px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0px -1px 2px 1px rgba(0, 0, 0, 0.1);
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
  color: #555;
}

.input-field {
  width: 790px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 15px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.description-input {
  min-height: 100px;
}

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
</style>