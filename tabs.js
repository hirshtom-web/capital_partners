<div class="uni-section-shell">
  <div class="uni-content-tile">
    <h3 class="uni-heading-xl">
      Perfect for investors<br> Excellent for home buyers
    </h3>
    <p class="uni-subtitle">Good things come to those who wait</p>

    <div class="uni-toggle-wrapper">
      <button class="uni-toggle-btn active" data-tab="investors">Investors</button>
      <button class="uni-toggle-btn" data-tab="homebuyers">Homebuyers</button>
      <button class="uni-toggle-btn" data-tab="developers">Developers</button>
    </div>

    <!-- Panels -->
    <div class="uni-panel active" id="investors">
      <div class="uni-panel-inner">
        <div class="uni-panel-text">
          <h3>Why Capital Partners Real Estate is Great for Investors</h3>
          <p>Investing with Capital Partners Real Estate opens doors to smart, profitable opportunities...</p>
          <ul class="uni-list">
            <li><img src="https://static.wixstatic.com/shapes/1799ca_ce0b06d466af4174b1e55bcdf5ffba0e.svg">High potential for strong ROI</li>
            <li><img src="https://static.wixstatic.com/shapes/1799ca_ce0b06d466af4174b1e55bcdf5ffba0e.svg">Diversified property portfolios</li>
            <li><img src="https://static.wixstatic.com/shapes/1799ca_ce0b06d466af4174b1e55bcdf5ffba0e.svg">Expert market analysis and guidance</li>
            <li><img src="https://static.wixstatic.com/shapes/1799ca_ce0b06d466af4174b1e55bcdf5ffba0e.svg">Transparent reporting and communication</li>
          </ul>
        </div>
        <div class="uni-panel-image">
          <img src="https://static.wixstatic.com/media/1799ca_5612e730c7834e63a1c15aa6098c692c~mv2.webp" alt="Investors">
        </div>
      </div>
    </div>

    <div class="uni-panel" id="homebuyers">
      <div class="uni-panel-inner">
        <div class="uni-panel-text">
          <h3>Your Dream Home Starts Here</h3>
          <p>At Capital Partners Real Estate, we help homeowners find the perfect place...</p>
        </div>
        <div class="uni-panel-image">
          <img src="https://static.wixstatic.com/media/1799ca_5612e730c7834e63a1c15aa6098c692c~mv2.webp" alt="Homebuyers">
        </div>
      </div>
    </div>

    <div class="uni-panel" id="developers">
      <div class="uni-panel-inner">
        <div class="uni-panel-text">
          <h3>For Developers</h3>
          <p>We partner with developers to bring projects to life...</p>
        </div>
        <div class="uni-panel-image">
          <img src="https://static.wixstatic.com/media/1799ca_5612e730c7834e63a1c15aa6098c692c~mv2.webp" alt="Developers">
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.uni-toggle-btn');
  const panels = document.querySelectorAll('.uni-panel');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      panels.forEach(panel => panel.classList.remove('active'));

      const target = button.dataset.tab;
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.add('active');
    });
  });
});
</script>
