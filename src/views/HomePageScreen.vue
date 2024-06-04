<template>
  <div class="container">
    <div class="logo">
      <img
        src="../../public/img/mono_blue.png"
        alt="logo_img"
        class="image_logo"
      />
    </div>

    <div class="content">
      <!-- Nội dung của trang ở đây -->
    </div>

    <div class="footer">
      <h2>Developed by Court Master team</h2>
    </div>
  </div>
</template>
  
  <script>
export default {};
</script>
  
  <style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.logo {
  position: fixed;
  top: -60px;
  left: 0;
  padding: 1rem;
}

.logo img {
  width: 228px; /* Đặt kích thước cố định cho logo */
  height: auto;
}

.content {
  flex-grow: 1;
  padding: 1rem;
}

.footer {
  margin: -6px;
  background-color: lightgray;
  padding: 1rem;
  text-align: center;
  margin-top: auto; /* Đẩy footer xuống cuối trang */
}
</style>