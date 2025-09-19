import { ref } from 'vue'

export interface CatImage {
  url: string
  id: string
}

export const useCats = () => {
  const cats = ref<CatImage[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCats = async (count: number = 12) => {
    loading.value = true
    error.value = null
    
    try {
      const requests = Array.from({ length: count }, (_, i) => 
        fetch(`https://cataas.com/cat?width=300&height=200&${Date.now()}-${i}`)
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch cat image')
            return response.blob()
          })
          .then(blob => ({
            url: URL.createObjectURL(blob),
            id: `cat-${Date.now()}-${i}`
          }))
      )
      
      const results = await Promise.all(requests)
      cats.value = results
    } catch (err) {
      error.value = 'Failed to load cat images'
      console.error('Error fetching cats:', err)
      cats.value = Array.from({ length: count }, (_, i) => ({
        url: `https://placekitten.com/300/200?image=${i + 1}`,
        id: `cat-fallback-${i}`
      }))
    } finally {
      loading.value = false
    }
  }

  return {
    cats,
    loading,
    error,
    fetchCats
  }
}