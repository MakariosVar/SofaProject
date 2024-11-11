<template>
  <section class="section releases-section" id="releases">
    <div v-if="true" class="section-content">
      <h2>Latest Releases</h2>
      <ul>
        <li v-for="release in releases" :key="release.id">
          <h3>{{ release.title }}</h3>
          <p>{{ release.artist }} - {{ release.date }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const releases = [
  { id: 1, title: "Album One", artist: "Artist One", date: "2023-08-01" },
  { id: 2, title: "Album Two", artist: "Artist Two", date: "2023-10-15" },
  { id: 3, title: "EP Three", artist: "Artist Three", date: "2023-11-05" },
];
</script>

<style scoped>
  .releases-section {
    /* background: #1a109b; */
  }
</style>
