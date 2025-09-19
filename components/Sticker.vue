<template>
  <div 
    class="sticker"
    :class="{ 'sticker--expanded': isExpanded }"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <div class="sticker__handle">
      <span class="sticker__icon">🐱</span>
      <span class="sticker__title">Милые котики</span>
    </div>
    
    <div class="sticker__content">
      <div class="sticker__images">
        <img 
          v-for="cat in displayedCats" 
          :key="cat.id" 
          :src="cat.url" 
          :alt="'Cat ' + cat.id"
          class="sticker__image"
        />
      </div>
      
      <div class="sticker__footer">
        <button class="sticker__button" @click="refreshCats">
          <span class="sticker__button-icon">↻</span>
          Обновить котиков
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CatImage {
  url: string
  id: string
}

interface Props {
  cats: CatImage[]
}

const props = defineProps<Props>()

const isExpanded = ref(false)
const displayedCats = computed(() => props.cats.slice(0, 3))

const refreshCats = () => {
  window.location.reload()
}
</script>

<style scoped lang="scss">
.sticker {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  width: 60px;
  height: 60px;

  &--expanded {
    width: 300px;
    height: auto;
    max-height: 400px;

    .sticker__handle {
      background: #667eea;
      cursor: pointer;
      
      .sticker__title {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .sticker__content {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
  }

  &__handle {
    display: flex;
    align-items: center;
    padding: 12px;
    background: #764ba2;
    cursor: pointer;
    transition: background 0.3s ease;
    position: relative;
    z-index: 2;

    &:hover {
      background: #667eea;
    }
  }

  &__icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  &__title {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  &__content {
    padding: 1rem;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease 0.1s;
    pointer-events: none;
  }

  &__images {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__image {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.8rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      background: linear-gradient(135deg, #5a67d8 0%, #667eea 100%);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);

      .sticker__button-icon {
        animation: rotate 0.6s ease-in-out infinite;
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__button-icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .sticker {
    right: 10px;
    bottom: 20px;
    top: auto;
    transform: none;

    &--expanded {
      width: calc(100vw - 40px);
      max-width: 300px;
      right: 20px;
      bottom: 20px;
    }
  }
}
</style>