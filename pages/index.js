/* SICK HOMEPAGE UPGRADE */

.home-hero-premium {
  box-shadow:
    inset 0 0 50px rgba(0, 255, 255, 0.04),
    0 0 60px rgba(0, 255, 255, 0.06);
}

.hero-trust-row {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-trust-row span {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(87, 227, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  color: #bfeef4;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.hero-bottle-stack {
  min-height: 460px;
  position: relative;
}

.hero-bottle-main {
  width: 240px;
}

.hero-bottle-side {
  position: absolute;
  width: 140px;
  opacity: 0.92;
  filter: drop-shadow(0 0 18px rgba(0, 255, 255, 0.08));
}

.hero-bottle-left {
  left: 18px;
  bottom: 10px;
  transform: rotate(-10deg);
}

.hero-bottle-right {
  right: 18px;
  bottom: 12px;
  transform: rotate(10deg);
}

.home-strip-section {
  padding-top: 28px;
}

.home-strip-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.home-strip-card {
  padding: 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 24px rgba(0, 255, 255, 0.04);
}

.home-strip-card h3 {
  margin: 0 0 8px;
  font-size: 20px;
}

.home-strip-card p {
  margin: 0;
  color: #b8c1c9;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .home-strip-grid {
    grid-template-columns: 1fr;
  }

  .hero-bottle-main {
    width: 190px;
  }

  .hero-bottle-side {
    width: 110px;
  }

  .hero-bottle-left {
    left: 10px;
  }

  .hero-bottle-right {
    right: 10px;
  }
}

@media (max-width: 640px) {
  .hero-trust-row {
    justify-content: center;
  }

  .hero-bottle-stack {
    min-height: 340px;
  }

  .hero-bottle-main {
    width: 160px;
  }

  .hero-bottle-side {
    width: 88px;
  }
  }
