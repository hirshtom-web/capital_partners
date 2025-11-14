Promise.allSettled(allLoads).finally(() => {
  const elapsed = performance.now() - startTime;
  const remaining = Math.max(0, MIN_TIME - elapsed);

  setTimeout(() => {
    if (!preloader) return;

    preloader.classList.add("fade-out");
    
    // Ensure it's removed even if transition fails
    setTimeout(() => preloader.remove(), 700);
  }, remaining);
});
