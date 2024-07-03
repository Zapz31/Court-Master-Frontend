<template>
  <div class="general-form">
    <h1 class="title"><strong>I. General</strong></h1>
    
    <h4 class="sub-title"><strong><em>Club Name</em></strong></h4>
    <textarea v-model="clubName" class="input-field"></textarea>
    
    <h4 class="sub-title"><strong><em>Description</em></strong></h4>
    <textarea v-model="description" class="input-field description-input"></textarea>
    
    <h4 class="sub-title"><strong><em>Avatar Image</em></strong></h4>
    <input type="file" @change="onAvatarUpload" accept="image/*" class="file-input" ref="avatarInput" />
    <div v-if="avatarPreview" class="image-container avatar-container">
      <img :src="avatarPreview" alt="Avatar Preview" class="image-preview avatar-preview" />
      <button @click="removeAvatar" class="remove-button">×</button>
    </div>
    
    <h4 class="sub-title"><strong><em>Description Images</em></strong></h4>
    <input type="file" @change="onDescriptionImagesUpload" accept="image/*" multiple class="file-input" />
    <div class="image-grid">
      <div v-for="(image, index) in descriptionImages" :key="index" class="image-container">
        <img :src="image" alt="Description Image" class="description-image" />
        <button @click="removeImage(index)" class="remove-button">×</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const clubName = ref('');
const description = ref('');
const avatarPreview = ref(null);
const descriptionImages = ref([]);
const avatarInput = ref(null);

const onAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeAvatar = () => {
  avatarPreview.value = null;
  if (avatarInput.value) {
    avatarInput.value.value = '';
  }
};

const onDescriptionImagesUpload = (event) => {
  const files = event.target.files;
  if (files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        descriptionImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
};

const removeImage = (index) => {
  descriptionImages.value.splice(index, 1);
};
</script>

<style scoped>
.general-form {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-weight: bold;
  margin-bottom: 20px;
}

.sub-title {
  font-weight: bold;
  font-style: italic;
  margin-top: 20px;
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 15px;
}

.description-input {
  min-height: 100px;
}

.file-input {
  margin-bottom: 10px;
}

.image-container {
  position: relative;
  margin-bottom: 15px;
}

.avatar-container {
  width: 200px;
  height: 200px;
}

.image-preview, .description-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  width: 20px;
  height: 20px;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-button:hover {
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-container {
  width: 150px;
  height: 150px;
}
</style>