<!-- ~/pages/index.vue -->
<template>
  <div
    class="horizontal-scroll"
    ref="scrollContainer"
    @wheel="handleWheel"
    @scroll="handleScroll"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <SectionsHome />
    <SectionsArtists />
    <SectionsReleases />
    <SectionsMerch />
  </div>
</template>

<script setup>
  const emit = defineEmits();

  const widthPerWheel = 0.5; // Scroll percentact of viewport width per wheel event
  const scrollContainer = ref(null)
  const scrollStart = ref(0);
  const startX = ref(0);
  const velocity = ref(0);
  let lastTouchX = 0;
  let isScrolling = false // Prevents multiple scrolls at once

  // Variables to track scroll percentage and active section
  const scrollPercent = ref(0)
  const activeSection = ref('Home')

  // Handle the mouse wheel event to scroll horizontally
  const handleWheel = (event) => {
    if (!scrollContainer.value || isScrolling) return

    const scrollAmount = event.deltaY > 0 ? 1 : -1
    const scrollStep = window.innerWidth * widthPerWheel;

    isScrolling = true

    // Determine the new scroll position
    const newScrollPosition = scrollContainer.value.scrollLeft + (scrollStep * scrollAmount)

    // Smooth scrolling using requestAnimationFrame
    smoothScrollTo(newScrollPosition)

    // Prevent the default vertical scroll behavior
    event.preventDefault()
  }

  // Smooth scrolling function using requestAnimationFrame
  const smoothScrollTo = (targetPosition) => {
    const currentPosition = scrollContainer.value.scrollLeft
    const distance = targetPosition - currentPosition
    const duration = 300 // Scroll duration in milliseconds
    const startTime = performance.now()

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1) // Ease the progress to 1 (finish)

      scrollContainer.value.scrollLeft = currentPosition + distance * progress

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll) // Continue animation
      } else {
        isScrolling = false // Finished scrolling
      }
    }

    requestAnimationFrame(animateScroll)
  }

  const handleTouchStart = (event) => {
    if (!scrollContainer.value) return;

    startX.value = event.touches[0].clientX;
    scrollStart.value = scrollContainer.value.scrollLeft;
    isScrolling = true;
    lastTouchX = startX.value;
    velocity.value = 0;
  };

  const handleTouchMove = (event) => {
    if (!isScrolling || !scrollContainer.value) return;

    const currentX = event.touches[0].clientX;
    const distance = startX.value - currentX;
    velocity.value = lastTouchX - currentX; // Capture the swipe speed
    lastTouchX = currentX;

    scrollContainer.value.scrollLeft = scrollStart.value + distance;
  };

  const handleTouchEnd = () => {
    isScrolling = false;

    // Inertia scrolling
    const inertiaScroll = () => {
      if (Math.abs(velocity.value) > 1) {
        scrollContainer.value.scrollLeft += velocity.value;
        velocity.value *= 0.95; // Slow down over time
        requestAnimationFrame(inertiaScroll);
      }
    };

    inertiaScroll();
  };

  const handleScroll = () => {
    if (!scrollContainer.value) return

    const totalWidth = scrollContainer.value.scrollWidth - window.innerWidth
    const currentScroll = scrollContainer.value.scrollLeft
    const percentageScrolled = Math.round((currentScroll / totalWidth) * 100)

    // Update the scroll percentage
    scrollPercent.value = percentageScrolled

    // Determine which section is currently in view
    const sections = ['Home', 'Artists', 'Releases', 'Merch']
    const sectionWidth = window.innerWidth
    const currentSectionIndex = Math.floor((currentScroll / sectionWidth) + 0.5)

    // Update the active section
    activeSection.value = sections[currentSectionIndex] || 'Home';

    // Emit the handleScroll event with scrollPercent and activeSection
    emit('handleScroll', {
      scrollPercent: scrollPercent.value,
      activeSection: activeSection.value
    })

    // Update background gradient based on scroll position
    const startColor = "rgba(106, 54, 3, 0.5)"
    const midColor = "rgba(36, 28, 17, 0.5)"
    const endColor = "rgba(0, 0, 0, 0.7m)"

    // Calculate gradient stops based on percentageScrolled
    const newGradient = `radial-gradient(circle, ${startColor} 0%, ${midColor} ${Math.min(percentageScrolled * 0.2 + 8, 50)}%, ${endColor} 100%)`

    // Apply new gradient to the container's background
    scrollContainer.value.style.background = newGradient
  }
</script>