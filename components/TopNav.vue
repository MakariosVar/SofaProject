<template>
  <div class="nav">
    <div class="nav-container">
      <nav class="top-nav">
        <ul class="top-nav-list">
          <li class="menu-item">
            <a
              class="menu-link"
              :class="activeSection == 'Home' ? 'menu-active-link' : ''"
              @click.prevent="scrollTo('home')"
            >
              Home
            </a>
          </li>
          <li class="menu-item">
            <a
              class="menu-link"
              :class="activeSection == 'Artists' ? 'menu-active-link' : ''"
              @click.prevent="scrollTo('artists')"
            >
              Artists
            </a>
          </li>
          <li class="menu-item">
            <a
              class="menu-link"
              :class="activeSection == 'Releases' ? 'menu-active-link' : ''"
              @click.prevent="scrollTo('releases')"
            >
              Releases
            </a>
          </li>
          <li class="menu-item">
            <a
              class="menu-link"
              :class="activeSection == 'Merch' ? 'menu-active-link' : ''"
              @click.prevent="scrollTo('merch')"
            >
              Merch
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <UProgress :value="scrollPercent" :color="'orange'" />
      </div>
    </div>
  </div>
</template>

<script setup>

  const props = defineProps(['scrollPercent', 'activeSection']);

  function scrollTo(sectionId) {
  const element = document.getElementById(sectionId);
  const scrollContainer = document.querySelector('.horizontal-scroll');

  if (element && scrollContainer) {
    const targetPosition = element.offsetLeft;

    // Smooth horizontal scrolling
    scrollContainer.scrollTo({
      left: targetPosition,
      behavior: "smooth",
    });
  }
}

</script>
