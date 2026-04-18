<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">Wobbly API</div>
      <div class="subtitle">v1 · Mobile &amp; Admin</div>

      <nav class="tab-nav" aria-label="Documentation tabs">
        <button
          v-for="tab in allTabs"
          :key="tab.id"
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="setTab(tab.id)"
        >
          <span class="tab-icon" aria-hidden="true">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </nav>

      <template v-if="currentPage">
        <div class="sidebar-divider"></div>
        <nav class="sidebar-nav" aria-label="Page sections">
          <a
            v-for="section in currentPage.sections"
            :key="section.id"
            :href="`#${section.id}`"
            :class="{ active: activeSection === section.id }"
          >
            {{ section.title }}
          </a>
        </nav>
      </template>
    </aside>

    <main class="content">
      <template v-if="currentPage">
        <section class="hero">
          <div class="hero-eyebrow">{{ currentPageMeta?.label }}</div>
          <h1>{{ currentPageMeta?.headline }}</h1>
          <p class="muted">{{ currentPageMeta?.desc }}</p>
          <div v-if="activeTab === 'overview'" class="links">
            <a href="/api/swagger">Swagger UI</a>
            <a href="https://wobbly.site">Main site</a>
          </div>
        </section>

        <section
          v-for="section in currentPage.sections"
          :id="section.id"
          :key="section.id"
        >
          <h2>{{ section.title }}</h2>
          <div v-if="section.quickGrid" class="quick-grid">
            <article
              v-for="item in section.quickGrid"
              :key="item.title"
              class="quick-box"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.body }}</p>
            </article>
          </div>
          <article
            v-for="card in section.cards"
            :key="`${section.id}-${card.path ?? card.response}`"
            class="card"
          >
            <div v-if="card.method" class="method">
              <span class="badge" :class="card.badgeClass">{{
                card.method
              }}</span>
              <code>{{ card.path }}</code>
            </div>
            <p v-for="paragraph in card.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
            <div v-if="card.headers">
              <h3>Headers</h3>
              <pre>{{ card.headers }}</pre>
            </div>
            <div v-if="card.request">
              <h3>Request</h3>
              <pre>{{ card.request }}</pre>
            </div>
            <div v-if="card.response">
              <h3>Response</h3>
              <pre>{{ card.response }}</pre>
            </div>
            <ul v-if="card.list">
              <li v-for="item in card.list" :key="item">{{ item }}</li>
            </ul>
            <p v-if="card.muted" class="muted">{{ card.muted }}</p>
          </article>
        </section>
      </template>

      <ArchitectureDiagram v-else-if="activeTab === 'architecture'" />

      <DesignSystemDoc v-else-if="activeTab === 'design'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import ArchitectureDiagram from "@/features/docs/ArchitectureDiagram.vue";
import DesignSystemDoc from "@/features/docs/DesignSystemDoc.vue";
import { type DocsPage, docsPages } from "@/features/docs/content";
import "@/shared/styles/api-docs.css";

const route = useRoute();
const router = useRouter();

interface TabMeta {
  id: string;
  label: string;
  icon: string;
  headline: string;
  desc: string;
}

const pageMetas: TabMeta[] = [
  {
    id: "overview",
    label: "Overview",
    icon: "◎",
    headline: "API docs",
    desc: "Источник правды для человекочитаемой документации. Если меняется API-контракт, обновлять эту страницу нужно в том же изменении.",
  },
  {
    id: "auth",
    label: "Auth",
    icon: "🔐",
    headline: "Authentication",
    desc: "Anonymous, Google, Apple, Yandex — все методы аутентификации и управления провайдерами.",
  },
  {
    id: "user",
    label: "User API",
    icon: "👤",
    headline: "User API",
    desc: "Профиль пользователя, рейтинг, аватар, счёт и удаление аккаунта.",
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: "🏆",
    headline: "Leaderboard",
    desc: "Топ и антирейтинг пользователей по счёту.",
  },
  {
    id: "service",
    label: "Service",
    icon: "⚙️",
    headline: "Service & Admin",
    desc: "Health checks и обзор Admin API.",
  },
];

const specialTabs = [
  { id: "architecture", label: "Architecture", icon: "🏗" },
  { id: "design", label: "Design System", icon: "🎨" },
];

const allTabs = [
  ...pageMetas.map((m) => ({ id: m.id, label: m.label, icon: m.icon })),
  ...specialTabs,
];

const activeTab = ref<string>((route.query.tab as string) ?? "overview");
const activeSection = ref<string>("");

const currentPage = computed<DocsPage | null>(
  () => docsPages.find((p) => p.id === activeTab.value) ?? null,
);

const currentPageMeta = computed<TabMeta | null>(
  () => pageMetas.find((m) => m.id === activeTab.value) ?? null,
);

function setTab(id: string) {
  activeTab.value = id;
  activeSection.value = "";
  router.replace({ query: { tab: id } });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

watch(
  () => route.query.tab,
  (tab) => {
    if (tab && tab !== activeTab.value) {
      activeTab.value = tab as string;
      activeSection.value = "";
    }
  },
);

let observer: IntersectionObserver | null = null;

function setupObserver() {
  observer?.disconnect();
  if (!currentPage.value) return;
  activeSection.value = currentPage.value.sections[0]?.id ?? "";
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      }
    },
    { rootMargin: "-20% 0px -70% 0px" },
  );
  for (const section of currentPage.value.sections) {
    const el = document.getElementById(section.id);
    if (el) observer.observe(el);
  }
}

watch(activeTab, () => {
  setTimeout(setupObserver, 50);
});

onMounted(() => {
  document.title = "Wobbly API docs";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", "Human-readable API docs for Wobbly.");
  setupObserver();
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>
