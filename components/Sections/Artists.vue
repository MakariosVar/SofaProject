<template>
  <section class="section artists-section" id="artists">
    <div v-if="true" class="section-content">
      <h2>Our Artists</h2>
      <ul>
        <li v-for="artist in artists" :key="artist.id">
          <h3>{{ artist.name }}</h3>
          <p>{{ artist.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const artists = [
  {
    id: 1,
    name: "Artist One",
    description: "A rising star with a unique style.",
  },
  {
    id: 2,
    name: "Artist Two",
    description: "An experienced musician with numerous hits.",
  },
  {
    id: 3,
    name: "Artist Three",
    description: "Known for blending genres seamlessly.",
  },
];
</script>

<style scoped>
    .artists-section {
        /* background: #0a9b66; */
    }
</style>
