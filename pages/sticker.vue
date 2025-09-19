<template>
  <div class="sticker-page">
    <div class="header">
      <h1>Страница со стикером</h1>
      <NuxtLink to="/" class="link">
        Вернуться на главную
      </NuxtLink>
    </div>
    <div class="content">
      
      <section class="section" v-for="(section, index) in sections" :key="index">
        <h2>{{ section.title }}</h2>
        <p>{{ section.content }}</p>
        <div class="image-grid">
          <img 
            v-for="(cat, catIndex) in cats.slice(index * 3, (index + 1) * 3)" 
            :key="catIndex" 
            :src="cat.url" 
            :alt="'Cat ' + (catIndex + 1)"
            class="cat-image"
            @load="handleImageLoad"
          />
        </div>
      </section>
    </div>

    <Sticker :cats="cats" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CatImage {
  url: string
  id: string
}

const sections = ref([
  {
    title: 'Раздел 1: Кошки в природе',
    content: 'Кошки - удивительные создания, которые прекрасно адаптируются к различным условиям обитания.'
  },
  {
    title: 'Раздел 2: Поведение кошек',
    content: 'Кошки обладают уникальным характером и поведением, которое делает их особенными.'
  },
  {
    title: 'Раздел 3: Уход за кошками',
    content: 'Правильный уход за кошками включает в себя множество аспектов, от питания до ветеринарного обслуживания.'
  },
  {
    title: 'Раздел 4: Породы кошек',
    content: 'Существует множество пород кошек, каждая со своими уникальными особенностями.'
  }
])

const cats = ref<CatImage[]>([])
const loadedImages = ref(0)

const fetchCats = async () => {
  try {
    const requests = Array.from({ length: 12 }, (_, i) => 
      fetch(`https://cataas.com/cat?width=300&height=200&${i}`)
        .then(response => response.blob())
        .then(blob => ({
          url: URL.createObjectURL(blob),
          id: `cat-${i}`
        }))
    )
    
    const results = await Promise.all(requests)
    cats.value = results
  } catch (error) {
    console.error('Error fetching cats:', error)
    cats.value = Array.from({ length: 12 }, (_, i) => ({
      url: `https://placekitten.com/300/200?image=${i + 1}`,
      id: `cat-${i}`
    }))
  }
}

const handleImageLoad = () => {
  loadedImages.value++
}

onMounted(() => {
  fetchCats()
})
</script>

<style scoped lang="scss">
.sticker-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  cursor: default;

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }

  .header {
    margin: 0 auto;
    display: flex;
    align-items: baseline;
    justify-content: space-evenly
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    color: #2c3e50;
    font-weight: 700;
  }

  .section {
    margin-bottom: 4rem;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 15px;
    border-left: 5px solid #667eea;

    h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }

    p {
      color: #6c757d;
      line-height: 1.6;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    .cat-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 12px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

.link {
  color: inherit;
}

@media (max-width: 768px) {
  .sticker-page {
    padding: 1rem;

    .content {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .section {
      padding: 1rem;
    }

    .image-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>