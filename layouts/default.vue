<template>
    <div class="app-container">
        <TopNav :activeSection="activeSection" :scrollPercent="scrollPercent" />
        <NuxtPage @handleScroll="handleScroll" />
    </div>
</template>

<script setup>
  const activeSection = ref('Home');
  const scrollPercent = ref(0);

  const handleScroll = (e) => {
    if (e.activeSection) {
        activeSection.value = e.activeSection;
    }

    if (e.scrollPercent) {
        scrollPercent.value = e.scrollPercent;
    }
  }
</script>