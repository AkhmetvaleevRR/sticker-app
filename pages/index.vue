<template>
  <div class="home-page">
    <div class="container">
      <h1>Главная страница</h1>
      <p>Добро пожаловать на главную страницу приложения</p>
      <NuxtLink to="/sticker" class="link">
        Перейти к странице со стикером →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Главная страница'
})
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;

  .container {
    max-width: 600px;
    padding: 2rem;
    cursor: default;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
}
</style>