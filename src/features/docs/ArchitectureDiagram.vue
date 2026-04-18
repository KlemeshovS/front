<template>
  <div class="arch-page">
    <div class="arch-hero">
      <h1>Architecture</h1>
      <p class="arch-subtitle">
        Общая схема инфраструктуры и потоков данных Wobbly
      </p>
    </div>

    <div class="arch-diagram">
      <!-- Clients row -->
      <div class="arch-row arch-row--clients">
        <div class="arch-layer-label">Clients</div>
        <div class="arch-nodes">
          <div class="arch-node arch-node--client">
            <div class="arch-node-icon">📱</div>
            <div class="arch-node-title">iOS App</div>
            <div class="arch-node-sub">Flutter · Swift UI</div>
          </div>
          <div class="arch-node arch-node--client">
            <div class="arch-node-icon">📱</div>
            <div class="arch-node-title">Android App</div>
            <div class="arch-node-sub">Flutter</div>
          </div>
          <div class="arch-node arch-node--client">
            <div class="arch-node-icon">🌐</div>
            <div class="arch-node-title">Web Browser</div>
            <div class="arch-node-sub">wobbly.site</div>
          </div>
        </div>
      </div>

      <div class="arch-arrow">
        <div class="arch-arrow-line"></div>
        <div class="arch-arrow-label">HTTPS / TLS</div>
      </div>

      <!-- Edge row -->
      <div class="arch-row arch-row--edge">
        <div class="arch-layer-label">Edge</div>
        <div class="arch-nodes arch-nodes--full">
          <div class="arch-node arch-node--edge">
            <div class="arch-node-title">nginx</div>
            <div class="arch-node-sub">
              api.wobbly.site · wobbly.site · admin.wobbly.site
            </div>
            <div class="arch-node-tags">
              <span class="arch-tag">Reverse Proxy</span>
              <span class="arch-tag">Static Files</span>
              <span class="arch-tag">TLS Termination</span>
            </div>
          </div>
        </div>
      </div>

      <div class="arch-arrow arch-arrow--fork">
        <div class="arch-fork">
          <div class="arch-fork-left">
            <div class="arch-fork-line"></div>
            <div class="arch-arrow-label">/api/*</div>
          </div>
          <div class="arch-fork-right">
            <div class="arch-fork-line"></div>
            <div class="arch-arrow-label">static</div>
          </div>
        </div>
      </div>

      <!-- App row -->
      <div class="arch-row arch-row--app">
        <div class="arch-layer-label">App</div>
        <div class="arch-nodes">
          <div class="arch-node arch-node--backend">
            <div class="arch-node-title">FastAPI Backend</div>
            <div class="arch-node-sub">/opt/rating-service</div>
            <div class="arch-node-tags">
              <span class="arch-tag arch-tag--accent">Python 3.13</span>
              <span class="arch-tag">FastAPI 0.116</span>
              <span class="arch-tag">PyJWT</span>
              <span class="arch-tag">SQLAlchemy</span>
            </div>
          </div>
          <div class="arch-node arch-node--frontend">
            <div class="arch-node-title">Vue 3 SPA</div>
            <div class="arch-node-sub">/opt/wobbly-front-*/current</div>
            <div class="arch-node-tags">
              <span class="arch-tag arch-tag--teal">Vue 3</span>
              <span class="arch-tag">TypeScript</span>
              <span class="arch-tag">Vite</span>
            </div>
          </div>
        </div>
      </div>

      <div class="arch-arrow arch-arrow--left">
        <div class="arch-arrow-line"></div>
        <div class="arch-arrow-label">SQL / TCP</div>
      </div>

      <!-- DB row -->
      <div class="arch-row arch-row--db">
        <div class="arch-layer-label">Data</div>
        <div class="arch-nodes arch-nodes--left">
          <div class="arch-node arch-node--db">
            <div class="arch-node-title">PostgreSQL 17</div>
            <div class="arch-node-sub">
              Automated backups · Alembic migrations
            </div>
            <div class="arch-node-tags">
              <span class="arch-tag arch-tag--teal">Primary store</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- External providers -->
    <div class="arch-section">
      <h2 class="arch-section-title">External Identity Providers</h2>
      <div class="arch-providers">
        <div class="arch-provider">
          <div class="arch-provider-logo arch-provider-logo--google">G</div>
          <div class="arch-provider-info">
            <div class="arch-provider-name">Google OAuth 2.0</div>
            <div class="arch-provider-detail">
              ID Token (JWT) → POST /api/v1/auth/google
            </div>
          </div>
        </div>
        <div class="arch-provider">
          <div class="arch-provider-logo arch-provider-logo--apple">⌘</div>
          <div class="arch-provider-info">
            <div class="arch-provider-name">Apple Sign In</div>
            <div class="arch-provider-detail">
              Identity Token → POST /api/v1/auth/apple
            </div>
          </div>
        </div>
        <div class="arch-provider">
          <div class="arch-provider-logo arch-provider-logo--yandex">Я</div>
          <div class="arch-provider-info">
            <div class="arch-provider-name">Yandex OAuth</div>
            <div class="arch-provider-detail">
              OAuth Token → POST /api/v1/auth/yandex
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Infrastructure -->
    <div class="arch-section">
      <h2 class="arch-section-title">Infrastructure & Ops</h2>
      <div class="arch-infra-grid">
        <div class="arch-infra-card">
          <div class="arch-infra-title">CI / CD</div>
          <ul class="arch-infra-list">
            <li>GitHub Actions</li>
            <li>Backend: pip cache · ruff · pytest</li>
            <li>
              Frontend: npm cache · vue-tsc · eslint · vitest · vite build
            </li>
            <li>Artifact reuse между verify и deploy jobs</li>
          </ul>
        </div>
        <div class="arch-infra-card">
          <div class="arch-infra-title">Server</div>
          <ul class="arch-infra-list">
            <li>VPS · api.wobbly.site</li>
            <li>systemd service: rating-service.service</li>
            <li>nginx: production + staging конфиги</li>
            <li>SSH: ~/.ssh/id_ed25519</li>
          </ul>
        </div>
        <div class="arch-infra-card">
          <div class="arch-infra-title">Monitoring</div>
          <ul class="arch-infra-list">
            <li>Uptime Kuma — uptime / readiness</li>
            <li>GET /health — liveness probe</li>
            <li>GET /ready — readiness (DB ping)</li>
            <li>Admin audit log — все действия</li>
          </ul>
        </div>
        <div class="arch-infra-card">
          <div class="arch-infra-title">Deployments</div>
          <ul class="arch-infra-list">
            <li>Production: push to main → deploy action</li>
            <li>Staging: staging branch → staging deploy</li>
            <li>Backend + Frontend деплоятся независимо</li>
            <li>Rollback через GitHub Actions</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
